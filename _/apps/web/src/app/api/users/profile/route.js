import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    
    // Get user with profile data
    const userRows = await sql`
      SELECT 
        u.id, u.name, u.email, u.role,
        p.balance, p.total_invested, p.total_profit, p.phone_number
      FROM auth_users u
      LEFT JOIN user_profiles p ON u.id = p.user_id
      WHERE u.id = ${userId}
    `;

    const user = userRows[0];
    if (!user) {
      return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // If no profile exists, create one
    if (!user.balance && !user.total_invested) {
      await sql`
        INSERT INTO user_profiles (user_id, balance, total_invested, total_profit)
        VALUES (${userId}, 0.00, 0.00, 0.00)
        ON CONFLICT (user_id) DO NOTHING
      `;
      user.balance = "0.00";
      user.total_invested = "0.00";
      user.total_profit = "0.00";
    }

    return Response.json({ user });
  } catch (err) {
    console.error("GET /api/users/profile error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { phone_number } = body || {};

    // Update user profile
    await sql`
      INSERT INTO user_profiles (user_id, phone_number)
      VALUES (${userId}, ${phone_number})
      ON CONFLICT (user_id) 
      DO UPDATE SET phone_number = ${phone_number}, updated_at = CURRENT_TIMESTAMP
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("PUT /api/users/profile error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}