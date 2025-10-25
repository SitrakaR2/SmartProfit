"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { 
  TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, 
  Clock, BarChart3, LogOut, User 
} from "lucide-react";

export default function Dashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const profileRes = await fetch('/api/users/profile');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData.user);
      }

      // Fetch recent transactions
      const txnRes = await fetch('/api/transactions/list?limit=10');
      if (txnRes.ok) {
        const txnData = await txnRes.json();
        setTransactions(txnData.transactions);
      }

      // Fetch daily profits
      const profitsRes = await fetch('/api/profits/daily?limit=10');
      if (profitsRes.ok) {
        const profitsData = await profitsRes.json();
        setProfits(profitsData.profits);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) {
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
          <p className="text-gray-600 mb-4">Vous devez vous connecter pour accéder au tableau de bord.</p>
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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1E40AF]">SmartProfit</h1>
              <span className="ml-4 text-sm text-gray-500">Tableau de bord</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bonjour, {user.name}</span>
              <a 
                href="/account/logout"
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-[#1E40AF]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Solde Actuel</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profile?.balance ? parseFloat(profile.balance).toLocaleString() : '0'} Ar
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Profit Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {profile?.total_profit ? parseFloat(profile.total_profit).toLocaleString() : '0'} Ar
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Investi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profile?.total_invested ? parseFloat(profile.total_invested).toLocaleString() : '0'} Ar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <a
            href="/dashboard/deposit"
            className="bg-[#1E40AF] text-white p-4 rounded-xl hover:bg-[#1E3A8A] transition-colors flex items-center justify-center"
          >
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Effectuer un Dépôt
          </a>
          <a
            href="/dashboard/withdrawal"
            className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <ArrowDownLeft className="h-5 w-5 mr-2" />
            Demander un Retrait
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Historique des Transactions
              </button>
              <button
                onClick={() => setActiveTab('profits')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profits'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profits Quotidiens
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Résumé de votre compte
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🎯 <strong>Profit quotidien:</strong> 11% garanti sur votre solde<br/>
                    💰 <strong>Gain d'aujourd'hui:</strong> {profile?.balance ? (parseFloat(profile.balance) * 0.11).toLocaleString() : '0'} Ar<br/>
                    📈 <strong>Rendement annuel:</strong> Plus de 4000% de rentabilité
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dernières Transactions
                </h3>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          {txn.transaction_type === 'deposit' && <ArrowUpRight className="h-4 w-4 text-blue-500 mr-2" />}
                          {txn.transaction_type === 'withdrawal' && <ArrowDownLeft className="h-4 w-4 text-red-500 mr-2" />}
                          {txn.transaction_type === 'profit' && <TrendingUp className="h-4 w-4 text-green-500 mr-2" />}
                          <div>
                            <p className="font-medium">
                              {txn.transaction_type === 'deposit' && 'Dépôt'}
                              {txn.transaction_type === 'withdrawal' && 'Retrait'}
                              {txn.transaction_type === 'profit' && 'Profit'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(txn.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {parseFloat(txn.amount).toLocaleString()} Ar
                          </p>
                          <p className={`text-xs ${
                            txn.status === 'completed' ? 'text-green-600' : 
                            txn.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {txn.status === 'completed' && 'Terminé'}
                            {txn.status === 'pending' && 'En attente'}
                            {txn.status === 'rejected' && 'Rejeté'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune transaction trouvée.</p>
                )}
              </div>
            )}

            {activeTab === 'profits' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Historique des Profits
                </h3>
                {profits.length > 0 ? (
                  <div className="space-y-3">
                    {profits.map((profit, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-green-500 mr-2" />
                          <div>
                            <p className="font-medium">Profit quotidien</p>
                            <p className="text-sm text-gray-500">
                              {new Date(profit.profit_date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            +{parseFloat(profit.profit_amount).toLocaleString()} Ar
                          </p>
                          <p className="text-xs text-gray-500">
                            {(parseFloat(profit.profit_rate) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucun profit encore généré. Effectuez votre premier dépôt !</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}