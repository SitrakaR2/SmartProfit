import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Check if user is admin
    const userRows = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;
    
    if (!userRows[0] || userRows[0].role !== 'admin') {
      return Response.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'pending', 'completed', etc.
    const type = searchParams.get('type'); // 'deposit', 'withdrawal'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereClause = 'WHERE 1=1';
    let params = [];

    if (status) {
      whereClause += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    if (type && ['deposit', 'withdrawal'].includes(type)) {
      whereClause += ` AND transaction_type = $${params.length + 1}`;
      params.push(type);
    }

    const query = `
      SELECT 
        t.id, t.user_id, t.transaction_type, t.amount, t.payment_method,
        t.transaction_reference, t.status, t.admin_notes, t.created_at,
        t.updated_at, t.processed_at, t.processed_by,
        u.name as user_name, u.email as user_email
      FROM transactions t
      JOIN auth_users u ON t.user_id = u.id
      ${whereClause}
      ORDER BY t.created_at DESC 
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);

    const transactions = await sql(query, params);

    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) as total FROM transactions t ${whereClause}`;
    const countResult = await sql(countQuery, params.slice(0, -2)); // Remove limit and offset
    const total = parseInt(countResult[0].total);

    return Response.json({ 
      transactions,
      total,
      limit,
      offset 
    });
  } catch (err) {
    console.error("GET /api/admin/transactions error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Check if user is admin
    const userRows = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;
    
    if (!userRows[0] || userRows[0].role !== 'admin') {
      return Response.json({ error: "Accès interdit" }, { status: 403 });
    }

    const body = await request.json();
    const { transaction_id, status, admin_notes } = body;

    if (!transaction_id || !status) {
      return Response.json({ error: "ID de transaction et statut requis" }, { status: 400 });
    }

    if (!['pending', 'confirmed', 'completed', 'rejected'].includes(status)) {
      return Response.json({ error: "Statut invalide" }, { status: 400 });
    }

    // Get transaction details
    const transactionRows = await sql`
      SELECT * FROM transactions WHERE id = ${transaction_id}
    `;

    if (transactionRows.length === 0) {
      return Response.json({ error: "Transaction non trouvée" }, { status: 404 });
    }

    const transaction = transactionRows[0];

    // Use transaction to ensure consistency
    const result = await sql.transaction([
      // Update transaction status
      sql`
        UPDATE transactions 
        SET status = ${status}, 
            admin_notes = ${admin_notes || null},
            processed_by = ${session.user.id},
            processed_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${transaction_id}
      `,
      
      // If approving a deposit, update user balance and total invested
      ...(transaction.transaction_type === 'deposit' && status === 'completed' ? [
        sql`
          INSERT INTO user_profiles (user_id, balance, total_invested, total_profit)
          VALUES (${transaction.user_id}, ${transaction.amount}, ${transaction.amount}, 0.00)
          ON CONFLICT (user_id) 
          DO UPDATE SET 
            balance = user_profiles.balance + ${transaction.amount},
            total_invested = user_profiles.total_invested + ${transaction.amount},
            updated_at = CURRENT_TIMESTAMP
        `
      ] : []),
      
      // If approving a withdrawal, deduct from user balance
      ...(transaction.transaction_type === 'withdrawal' && status === 'completed' ? [
        sql`
          UPDATE user_profiles 
          SET balance = balance - ${transaction.amount},
              updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ${transaction.user_id}
        `
      ] : [])
    ]);

    return Response.json({ 
      success: true,
      message: `Transaction ${status === 'completed' ? 'approuvée' : status} avec succès`
    });
  } catch (err) {
    console.error("PUT /api/admin/transactions error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}