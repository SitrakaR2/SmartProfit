import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'deposit', 'withdrawal', 'profit'
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereClause = 'WHERE user_id = $1';
    let params = [userId];

    if (type && ['deposit', 'withdrawal', 'profit'].includes(type)) {
      whereClause += ' AND transaction_type = $2';
      params.push(type);
    }

    const query = `
      SELECT 
        id, transaction_type, amount, payment_method, 
        transaction_reference, status, admin_notes,
        created_at, updated_at, processed_at
      FROM transactions 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);

    const transactions = await sql(query, params);

    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) as total FROM transactions ${whereClause}`;
    const countResult = await sql(countQuery, params.slice(0, -2)); // Remove limit and offset
    const total = parseInt(countResult[0].total);

    return Response.json({ 
      transactions,
      total,
      limit,
      offset 
    });
  } catch (err) {
    console.error("GET /api/transactions/list error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}