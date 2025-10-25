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
    const { amount, payment_method, transaction_reference } = body;

    // Validation
    if (!amount || amount <= 0) {
      return Response.json({ error: "Montant invalide" }, { status: 400 });
    }

    if (!payment_method || !['orange_money', 'telma_money'].includes(payment_method)) {
      return Response.json({ error: "Méthode de paiement invalide" }, { status: 400 });
    }

    if (!transaction_reference) {
      return Response.json({ error: "Référence de transaction requise" }, { status: 400 });
    }

    const minimumDeposit = 1000;
    if (amount < minimumDeposit) {
      return Response.json({ 
        error: `Le dépôt minimum est de ${minimumDeposit} Ar` 
      }, { status: 400 });
    }

    // Check if transaction reference already exists
    const existingTxn = await sql`
      SELECT id FROM transactions 
      WHERE transaction_reference = ${transaction_reference} 
      AND transaction_type = 'deposit'
    `;

    if (existingTxn.length > 0) {
      return Response.json({ 
        error: "Cette référence de transaction a déjà été utilisée" 
      }, { status: 400 });
    }

    // Create deposit transaction
    const transaction = await sql`
      INSERT INTO transactions (
        user_id, transaction_type, amount, payment_method, 
        transaction_reference, status
      )
      VALUES (
        ${userId}, 'deposit', ${amount}, ${payment_method}, 
        ${transaction_reference}, 'pending'
      )
      RETURNING id, amount, payment_method, transaction_reference, status, created_at
    `;

    // Create user profile if doesn't exist
    await sql`
      INSERT INTO user_profiles (user_id, balance, total_invested, total_profit)
      VALUES (${userId}, 0.00, 0.00, 0.00)
      ON CONFLICT (user_id) DO NOTHING
    `;

    return Response.json({ 
      transaction: transaction[0],
      message: "Demande de dépôt soumise avec succès. En attente d'approbation." 
    });
  } catch (err) {
    console.error("POST /api/transactions/deposit error", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}