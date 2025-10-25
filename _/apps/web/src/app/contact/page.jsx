"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Accueil
              </a>
              <h1 className="text-2xl font-bold text-[#1E40AF]">SmartProfit</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/account/signin" className="text-[#1E40AF] hover:text-[#1E3A8A] font-medium">
                Connexion
              </a>
              <a href="/account/signup" className="bg-[#1E40AF] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors">
                Commencer
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider. Contactez-nous pour toute question 
            concernant vos investissements ou notre plateforme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informations de Contact
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#1E40AF] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@smartprofit.com</p>
                  <p className="text-sm text-gray-500">Réponse sous 2 heures</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#1E40AF] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Téléphone</h3>
                  <p className="text-gray-600">+261 20 XX XXX XX</p>
                  <p className="text-sm text-gray-500">Disponible 24h/24</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#1E40AF] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Heures de Support</h3>
                  <p className="text-gray-600">24 heures sur 24, 7 jours sur 7</p>
                  <p className="text-sm text-gray-500">Support client disponible en permanence</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#1E40AF] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Localisation</h3>
                  <p className="text-gray-600">Madagascar</p>
                  <p className="text-sm text-gray-500">Service pour tout Madagascar</p>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Aide Rapide</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Problème de connexion :</strong> Vérifiez votre email et mot de passe</li>
                <li>• <strong>Dépôt en attente :</strong> Les dépôts sont approuvés sous 24h</li>
                <li>• <strong>Profits quotidiens :</strong> Calculés automatiquement à minuit</li>
                <li>• <strong>Retrait :</strong> Traité sous 24-48h après approbation</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envoyez-nous un Message
            </h2>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  ✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="depot">Problème de dépôt</option>
                  <option value="retrait">Problème de retrait</option>
                  <option value="profits">Question sur les profits</option>
                  <option value="compte">Problème de compte</option>
                  <option value="technique">Support technique</option>
                  <option value="autre">Autre question</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all resize-vertical"
                  placeholder="Décrivez votre question ou problème en détail..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E40AF] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Envoi en cours..." : "Envoyer le Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Autres Moyens de Nous Joindre
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="bg-[#1E40AF] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Direct</h3>
              <p className="text-sm text-gray-600 mb-3">
                Pour les questions urgentes
              </p>
              <a
                href="mailto:support@smartprofit.com"
                className="text-[#1E40AF] font-medium hover:text-[#1E3A8A]"
              >
                support@smartprofit.com
              </a>
            </div>

            <div className="text-center p-6 bg-white rounded-lg">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Assistance Téléphonique</h3>
              <p className="text-sm text-gray-600 mb-3">
                Support vocal 24/7
              </p>
              <a
                href="tel:+2612XXXXXXX"
                className="text-green-600 font-medium hover:text-green-700"
              >
                +261 20 XX XXX XX
              </a>
            </div>

            <div className="text-center p-6 bg-white rounded-lg">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Réponse Rapide</h3>
              <p className="text-sm text-gray-600 mb-3">
                Temps de réponse moyen
              </p>
              <span className="text-purple-600 font-medium">
                Moins de 2 heures
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SmartProfit</h3>
              <p className="text-gray-400">
                Investissez aujourd'hui, gagnez chaque jour. 
                11% de profit quotidien garanti.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="/account/signup" className="text-gray-400 hover:text-white">S'inscrire</a></li>
                <li><a href="/account/signin" className="text-gray-400 hover:text-white">Se connecter</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@smartprofit.com</li>
                <li>+261 20 XX XXX XX</li>
                <li>24h/24, 7j/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 SmartProfit. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}