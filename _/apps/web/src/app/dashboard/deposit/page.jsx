"use client";

import { useState } from "react";
import useUser from "@/utils/useUser";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";

export default function DepositPage() {
  const { data: user, loading: userLoading } = useUser();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('orange_money');
  const [transactionRef, setTransactionRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/transactions/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          payment_method: paymentMethod,
          transaction_reference: transactionRef,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setAmount('');
        setTransactionRef('');
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Vous devez vous connecter pour effectuer un dépôt.</p>
          <a 
            href="/account/signin" 
            className="bg-[#1E40AF] text-white px-6 py-2 rounded-lg hover:bg-[#1E3A8A]"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <a 
              href="/dashboard" 
              className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </a>
            <h1 className="text-2xl font-bold text-[#1E40AF]">SmartProfit</h1>
            <span className="ml-4 text-sm text-gray-500">Effectuer un Dépôt</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Effectuer un Dépôt
          </h2>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
              <li>Choisissez votre méthode de paiement (Orange Money ou Telma)</li>
              <li>Saisissez le montant à déposer (minimum 1,000 Ar)</li>
              <li>Effectuez le transfert vers le numéro correspondant</li>
              <li>Saisissez la référence de transaction reçue</li>
              <li>Soumettez votre demande pour approbation</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Méthode de Paiement
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'orange_money' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="orange_money"
                    checked={paymentMethod === 'orange_money'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Smartphone className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <div className="font-medium">Orange Money</div>
                    <div className="text-sm text-gray-500">+261 32 XX XXX XX</div>
                  </div>
                </label>

                <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'telma_money' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="telma_money"
                    checked={paymentMethod === 'telma_money'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <CreditCard className="h-6 w-6 text-red-500 mr-3" />
                  <div>
                    <div className="font-medium">Telma Money</div>
                    <div className="text-sm text-gray-500">+261 34 XX XXX XX</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Montant à Déposer (Ar)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Minimum 1,000 Ar"
                min="1000"
                step="1"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Dépôt minimum: 1,000 Ar • Profit quotidien: 11%
              </p>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Détails du transfert pour {paymentMethod === 'orange_money' ? 'Orange Money' : 'Telma Money'}:
              </h4>
              <div className="text-sm text-gray-700">
                <p><strong>Numéro:</strong> {paymentMethod === 'orange_money' ? '+261 32 XX XXX XX' : '+261 34 XX XXX XX'}</p>
                <p><strong>Nom:</strong> SmartProfit SARL</p>
                <p><strong>Motif:</strong> Dépôt investissement</p>
              </div>
            </div>

            {/* Transaction Reference */}
            <div>
              <label htmlFor="transactionRef" className="block text-sm font-medium text-gray-700 mb-2">
                Référence de Transaction
              </label>
              <input
                type="text"
                id="transactionRef"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="Ex: OM123456789 ou TM987654321"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Saisissez la référence reçue après votre transfert
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-600">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E40AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Traitement en cours..." : "Soumettre la Demande de Dépôt"}
            </button>
          </form>

          {/* Expected Timeline */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Délai de traitement:</h4>
            <p className="text-sm text-yellow-700">
              Votre dépôt sera vérifié et approuvé sous 24h. Une fois approuvé, 
              vos profits quotidiens de 11% commenceront automatiquement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}