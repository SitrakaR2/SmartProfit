"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { ArrowLeft, CreditCard, Smartphone, AlertCircle } from "lucide-react";

export default function WithdrawalPage() {
  const { data: user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('orange_money');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/users/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/transactions/withdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          payment_method: paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setAmount('');
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const balance = profile?.balance ? parseFloat(profile.balance) : 0;
  const maxWithdrawal = Math.floor(balance);

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
          <p className="text-gray-600 mb-4">Vous devez vous connecter pour effectuer un retrait.</p>
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
            <span className="ml-4 text-sm text-gray-500">Demander un Retrait</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Demander un Retrait
          </h2>

          {/* Balance Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800">Votre Solde Disponible</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {balance.toLocaleString()} Ar
                </p>
              </div>
              <div className="text-right text-sm text-blue-700">
                <p>Retrait minimum: 500 Ar</p>
                <p>Retrait maximum: {maxWithdrawal.toLocaleString()} Ar</p>
              </div>
            </div>
          </div>

          {balance < 500 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800">Solde insuffisant</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Votre solde actuel est inférieur au montant minimum de retrait (500 Ar). 
                  Effectuez un dépôt ou attendez vos prochains profits quotidiens.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Méthode de Retrait
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
                    <div className="text-sm text-gray-500">Retrait mobile</div>
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
                    <div className="text-sm text-gray-500">Retrait mobile</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Montant à Retirer (Ar)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Minimum 500 Ar"
                min="500"
                max={maxWithdrawal}
                step="1"
                required
                disabled={balance < 500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Retrait minimum: 500 Ar</span>
                <button
                  type="button"
                  onClick={() => setAmount(maxWithdrawal.toString())}
                  className="text-[#1E40AF] hover:text-[#1E3A8A] font-medium"
                  disabled={balance < 500}
                >
                  Tout retirer
                </button>
              </div>
            </div>

            {/* Processing Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Informations de traitement:
              </h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• Votre demande sera examinée par notre équipe</p>
                <p>• Délai de traitement: 24-48h ouvrables</p>
                <p>• Vous recevrez une notification par email</p>
                <p>• Les fonds seront transférés sur votre {paymentMethod === 'orange_money' ? 'Orange Money' : 'Telma Money'}</p>
              </div>
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
              disabled={loading || balance < 500}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Traitement en cours..." : "Soumettre la Demande de Retrait"}
            </button>
          </form>

          {/* Warning */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">⚠️ Important:</h4>
            <p className="text-sm text-red-700">
              Une fois votre demande de retrait approuvée, le montant sera déduit de votre solde 
              et ne générera plus de profits quotidiens. Assurez-vous de ne retirer que ce dont vous avez besoin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}