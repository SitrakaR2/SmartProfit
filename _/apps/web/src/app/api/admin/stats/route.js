import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
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

    // Get platform statistics
    const [
      totalUsers,
      totalInvested,
      totalProfitPaid,
      totalBalance,
      pendingDeposits,
      pendingWithdrawals,
      recentTransactions
    ] = await sql.transaction([
      sql`SELECT COUNT(*) as count FROM auth_users WHERE role = 'user'`,
      
      sql`SELECT COALESCE(SUM(total_invested), 0) as total FROM user_profiles`,
      
      sql`SELECT COALESCE(SUM(total_profit), 0) as total FROM user_profiles`,
      
      sql`SELECT COALESCE(SUM(balance), 0) as total FROM user_profiles`,
      
      sql`
        SELECT COUNT(*) as count, COALESCE(SUM(amount), 0) as amount 
        FROM transactions 
        WHERE transaction_type = 'deposit' AND status = 'pending'
      `,
      
      sql`
        SELECT COUNT(*) as count, COALESCE(SUM(amount), 0) as amount 
        FROM transactions 
        WHERE transaction_type = 'withdrawal' AND status = 'pending'
      `,
      
      sql`
        SELECT 
          t.transaction_type, 
          COUNT(*) as count,
          COALESCE(SUM(amount), 0) as total_amount
        FROM transactions t
        WHERE t.created_at >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY t.transaction_type
      `
    ]);

    // Calculate profit metrics
    const totalPlatformRevenue = parseFloat(totalInvested[0].total) - parseFloat(totalBalance[0].total) - parseFloat(totalProfitPaid[0].total);

    return Response.json({
      totalUsers: parseInt(totalUsers[0].count),
      totalInvested: parseFloat(totalInvested[0].total),
      totalProfitPaid: parseFloat(totalProfitPaid[0].total),
      totalBalance: parseFloat(totalBalance[0].total),
      platformRevenue: Math.max(0, totalPlatformRevenue),
      pendingDeposits: {
        count: parseInt(pendingDeposits[0].count),
        amount: parseFloat(pendingDeposits[0].amount)
      },
      pendingWithdrawals: {
        count: parseInt(pendingWithdrawals[0].count),
        amount: parseFloat(pendingWithdrawals[0].amount)
      },
      recentTransactions: recentTransactions.map(tx => ({
        type: tx.transaction_type,
        count: parseInt(tx.count),
        amount: parseFloat(tx.total_amount)
      }))
    });
  } catch (err) {
    console.error("GET /api/admin/stats error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}