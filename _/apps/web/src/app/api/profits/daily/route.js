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
    const limit = parseInt(searchParams.get('limit') || '30');

    // Get daily profits for the user
    const profits = await sql`
      SELECT 
        investment_amount, profit_rate, profit_amount, profit_date, created_at
      FROM daily_profits 
      WHERE user_id = ${userId}
      ORDER BY profit_date DESC 
      LIMIT ${limit}
    `;

    return Response.json({ profits });
  } catch (err) {
    console.error("GET /api/profits/daily error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Admin function to calculate and distribute daily profits
export async function POST(request) {
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

    const today = new Date().toISOString().split('T')[0];
    
    // Check if profits have already been calculated for today
    const existingProfits = await sql`
      SELECT COUNT(*) as count FROM daily_profits WHERE profit_date = ${today}
    `;

    if (existingProfits[0].count > 0) {
      return Response.json({ 
        error: "Les profits d'aujourd'hui ont déjà été calculés" 
      }, { status: 400 });
    }

    // Get all users with positive balances
    const users = await sql`
      SELECT user_id, balance FROM user_profiles WHERE balance > 0
    `;

    const profitRate = 0.11; // 11% daily profit
    let totalProcessed = 0;

    // Use transaction to ensure consistency
    const results = await sql.transaction(
      users.map(user => {
        const profitAmount = parseFloat(user.balance) * profitRate;
        const newBalance = parseFloat(user.balance) + profitAmount;
        
        return [
          // Add profit record
          sql`
            INSERT INTO daily_profits (user_id, investment_amount, profit_rate, profit_amount, profit_date)
            VALUES (${user.user_id}, ${user.balance}, ${profitRate}, ${profitAmount}, ${today})
          `,
          // Update user balance and total profit
          sql`
            UPDATE user_profiles 
            SET balance = ${newBalance}, 
                total_profit = total_profit + ${profitAmount},
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ${user.user_id}
          `,
          // Create profit transaction record
          sql`
            INSERT INTO transactions (user_id, transaction_type, amount, status, created_at)
            VALUES (${user.user_id}, 'profit', ${profitAmount}, 'completed', CURRENT_TIMESTAMP)
          `
        ];
      }).flat()
    );

    totalProcessed = users.length;

    return Response.json({ 
      message: `Profits quotidiens calculés pour ${totalProcessed} utilisateurs`,
      date: today,
      profit_rate: profitRate,
      users_processed: totalProcessed
    });
  } catch (err) {
    console.error("POST /api/profits/daily error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}