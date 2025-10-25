"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { 
  Users, DollarSign, TrendingUp, Clock, 
  CheckCircle, XCircle, AlertCircle, LogOut 
} from "lucide-react";

export default function AdminDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    if (user) {
      checkAdminAccess();
    }
  }, [user]);

  const checkAdminAccess = async () => {
    try {
      // Try to fetch admin stats to verify access
      const response = await fetch('/api/admin/stats');
      if (response.status === 403) {
        window.location.href = '/dashboard';
        return;
      }
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des droits admin:', error);
      window.location.href = '/dashboard';
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch admin statistics
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch transactions based on filter
      const txnRes = await fetch(`/api/admin/transactions?status=${filter}&limit=20`);
      if (txnRes.ok) {
        const txnData = await txnRes.json();
        setTransactions(txnData.transactions);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && stats) {
      fetchTransactions();
    }
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/admin/transactions?status=${filter}&limit=20`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des transactions:', error);
    }
  };

  const handleTransactionAction = async (transactionId, status, notes = '') => {
    setProcessing(prev => ({ ...prev, [transactionId]: true }));
    
    try {
      const response = await fetch('/api/admin/transactions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_id: transactionId,
          status,
          admin_notes: notes
        }),
      });

      if (response.ok) {
        // Refresh data
        fetchData();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Erreur lors du traitement de la transaction:', error);
      alert('Erreur de connexion');
    } finally {
      setProcessing(prev => ({ ...prev, [transactionId]: false }));
    }
  };

  const calculateDailyProfits = async () => {
    if (!confirm('Êtes-vous sûr de vouloir calculer les profits quotidiens pour tous les utilisateurs ?')) {
      return;
    }

    try {
      const response = await fetch('/api/profits/daily', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`Succès: ${data.message}`);
        fetchData(); // Refresh stats
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur lors du calcul des profits:', error);
      alert('Erreur de connexion');
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
          <p className="text-gray-600 mb-4">Accès non autorisé.</p>
          <a href="/account/signin" className="bg-[#1E40AF] text-white px-6 py-2 rounded-lg">
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
              <span className="ml-4 text-sm text-red-600 font-semibold">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin: {user.name}</span>
              <a href="/account/logout" className="flex items-center text-gray-500 hover:text-gray-700">
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Utilisateurs Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Investi</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalInvested.toLocaleString()} Ar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profits Payés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalProfitPaid.toLocaleString()} Ar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Solde Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalBalance.toLocaleString()} Ar
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Actions */}
        {stats && (stats.pendingDeposits.count > 0 || stats.pendingWithdrawals.count > 0) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-yellow-800 mb-2">Actions en attente:</h3>
            <div className="flex space-x-6 text-sm text-yellow-700">
              {stats.pendingDeposits.count > 0 && (
                <span>
                  <strong>{stats.pendingDeposits.count}</strong> dépôts en attente 
                  ({stats.pendingDeposits.amount.toLocaleString()} Ar)
                </span>
              )}
              {stats.pendingWithdrawals.count > 0 && (
                <span>
                  <strong>{stats.pendingWithdrawals.count}</strong> retraits en attente 
                  ({stats.pendingWithdrawals.amount.toLocaleString()} Ar)
                </span>
              )}
            </div>
          </div>
        )}

        {/* Daily Profits Button */}
        <div className="mb-6">
          <button
            onClick={calculateDailyProfits}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Calculer les Profits Quotidiens (11%)
          </button>
        </div>

        {/* Transactions Management */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Gestion des Transactions
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filter === 'pending' 
                      ? 'bg-[#1E40AF] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  En attente
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filter === 'completed' 
                      ? 'bg-[#1E40AF] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Terminées
                </button>
                <button
                  onClick={() => setFilter('')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filter === '' 
                      ? 'bg-[#1E40AF] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Toutes
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Méthode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {txn.user_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {txn.user_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        txn.transaction_type === 'deposit' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {txn.transaction_type === 'deposit' ? 'Dépôt' : 'Retrait'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseFloat(txn.amount).toLocaleString()} Ar
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {txn.payment_method === 'orange_money' ? 'Orange Money' : 'Telma Money'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                        txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {txn.status === 'completed' && 'Terminé'}
                        {txn.status === 'pending' && 'En attente'}
                        {txn.status === 'rejected' && 'Rejeté'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(txn.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {txn.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTransactionAction(txn.id, 'completed')}
                            disabled={processing[txn.id]}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTransactionAction(txn.id, 'rejected', 'Rejeté par admin')}
                            disabled={processing[txn.id]}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}