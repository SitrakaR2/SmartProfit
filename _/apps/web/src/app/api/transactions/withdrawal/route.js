import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { amount, payment_method } = body;

    // Validation
    if (!amount || amount <= 0) {
      return Response.json({ error: "Montant invalide" }, { status: 400 });
    }

    if (!payment_method || !['orange_money', 'telma_money'].includes(payment_method)) {
      return Response.json({ error: "Méthode de paiement invalide" }, { status: 400 });
    }

    // Get user profile to check balance
    const profileRows = await sql`
      SELECT balance FROM user_profiles WHERE user_id = ${userId}
    `;

    if (profileRows.length === 0) {
      return Response.json({ error: "Profil utilisateur non trouvé" }, { status: 404 });
    }

    const balance = parseFloat(profileRows[0].balance);
    if (balance < amount) {
      return Response.json({ 
        error: `Solde insuffisant. Votre solde actuel est de ${balance} Ar` 
      }, { status: 400 });
    }

    const minimumWithdrawal = 500;
    if (amount < minimumWithdrawal) {
      return Response.json({ 
        error: `Le retrait minimum est de ${minimumWithdrawal} Ar` 
      }, { status: 400 });
    }

    // Create withdrawal transaction
    const transaction = await sql`
      INSERT INTO transactions (
        user_id, transaction_type, amount, payment_method, status
      )
      VALUES (
        ${userId}, 'withdrawal', ${amount}, ${payment_method}, 'pending'
      )
      RETURNING id, amount, payment_method, status, created_at
    `;

    return Response.json({ 
      transaction: transaction[0],
      message: "Demande de retrait soumise avec succès. En attente d'approbation." 
    });
  } catch (err) {
    console.error("POST /api/transactions/withdrawal error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}