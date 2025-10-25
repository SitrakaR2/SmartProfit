"use client";

import { useState } from "react";
import { Shield, ArrowLeft } from "lucide-react";

export default function CreateAdminPage() {
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/admin/create-first-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, secret }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail('');
        setSecret('');
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à l'accueil
          </a>
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un Administrateur</h1>
          <p className="text-gray-600 mt-2">Configuration initiale de SmartProfit</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Route de configuration initiale</strong><br/>
              Cette page doit être utilisée uniquement pour créer le premier administrateur. 
              Supprimez cette route après utilisation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email de l'utilisateur à promouvoir
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartprofit.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                L'utilisateur doit déjà avoir créé un compte sur la plateforme
              </p>
            </div>

            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-2">
                Code secret
              </label>
              <input
                type="password"
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Code secret de configuration"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Code par défaut: smartprofit-admin-2025
              </p>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Configuration..." : "Créer l'Administrateur"}
            </button>
          </form>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Instructions:</h3>
            <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
              <li>Créez d'abord un compte utilisateur normal sur SmartProfit</li>
              <li>Utilisez l'email de ce compte et le code secret ci-dessus</li>
              <li>Le compte sera automatiquement promu administrateur</li>
              <li>Connectez-vous et accédez à /admin pour le panneau d'administration</li>
              <li><strong>Supprimez cette route après utilisation pour la sécurité</strong></li>
            </ol>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>🔒 Sécurité importante:</strong> Cette route doit être supprimée après avoir créé 
              votre premier administrateur. Elle ne doit pas rester accessible en production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}