import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, secret } = body;

    // Simple security check - you can set this environment variable
    const adminSecret = process.env.ADMIN_CREATION_SECRET || 'smartprofit-admin-2025';
    
    if (secret !== adminSecret) {
      return Response.json({ error: "Code secret invalide" }, { status: 403 });
    }

    if (!email) {
      return Response.json({ error: "Email requis" }, { status: 400 });
    }

    // Check if user exists
    const userRows = await sql`
      SELECT id FROM auth_users WHERE email = ${email}
    `;

    if (userRows.length === 0) {
      return Response.json({ 
        error: "Utilisateur non trouvé. Veuillez d'abord créer un compte avec cet email." 
      }, { status: 404 });
    }

    const userId = userRows[0].id;

    // Update user to admin role
    await sql`
      UPDATE auth_users 
      SET role = 'admin' 
      WHERE id = ${userId}
    `;

    return Response.json({ 
      success: true,
      message: `L'utilisateur ${email} a été promu administrateur avec succès.`
    });
  } catch (err) {
    console.error("POST /api/admin/create-first-admin error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}