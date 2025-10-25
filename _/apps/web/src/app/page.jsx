import { TrendingUp, Shield, Clock, Users, ChevronRight, Star } from "lucide-react";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1E40AF]">SmartProfit</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[#1E40AF]">Fonctionnalités</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#1E40AF]">Comment ça marche</a>
              <a href="/contact" className="text-gray-600 hover:text-[#1E40AF]">Contact</a>
              <a href="/faq" className="text-gray-600 hover:text-[#1E40AF]">FAQ</a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/account/signin"
                className="text-[#1E40AF] hover:text-[#1E3A8A] font-medium"
              >
                Connexion
              </a>
              <a
                href="/account/signup"
                className="bg-[#1E40AF] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors"
              >
                Commencer
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Investissez Aujourd'hui,
              <br />
              <span className="text-[#1E40AF]">Gagnez Chaque Jour</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plateforme d'investissement en ligne offrant <strong>11% de profit quotidien</strong> 
              garantis. Déposez avec Orange Money ou Telma Mobile Money et regardez 
              vos profits croître automatiquement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/account/signup"
                className="bg-[#1E40AF] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1E3A8A] transition-colors"
              >
                Créer mon compte
              </a>
              <a
                href="#how-it-works"
                className="border border-[#1E40AF] text-[#1E40AF] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1E40AF] hover:text-white transition-colors"
              >
                Comment ça marche
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E40AF] mb-2">11%</div>
              <div className="text-lg font-semibold text-gray-900">Profit Quotidien</div>
              <div className="text-gray-600">Garanti sur tous vos dépôts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E40AF] mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-900">Disponibilité</div>
              <div className="text-gray-600">Accès à votre tableau de bord</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E40AF] mb-2">2</div>
              <div className="text-lg font-semibold text-gray-900">Moyens de Paiement</div>
              <div className="text-gray-600">Orange Money & Telma</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir SmartProfit ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre plateforme vous offre tous les outils nécessaires pour faire fructifier 
              vos investissements de manière sûre et rentable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <TrendingUp className="h-12 w-12 text-[#1E40AF] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Profits Garantis
              </h3>
              <p className="text-gray-600">
                11% de profit quotidien automatiquement crédité sur votre solde
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="h-12 w-12 text-[#1E40AF] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sécurité Maximale
              </h3>
              <p className="text-gray-600">
                Vos fonds et données personnelles sont protégés par le cryptage SSL
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="h-12 w-12 text-[#1E40AF] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Traitement Rapide
              </h3>
              <p className="text-gray-600">
                Dépôts et retraits traités rapidement avec Orange Money et Telma
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-[#1E40AF] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Support 24/7
              </h3>
              <p className="text-gray-600">
                Notre équipe est disponible pour vous aider à tout moment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment Ça Marche ?
            </h2>
            <p className="text-lg text-gray-600">
              Commencez à investir en seulement 3 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#1E40AF] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Créez votre compte
              </h3>
              <p className="text-gray-600">
                Inscription gratuite en quelques minutes avec votre email
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#1E40AF] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Effectuez un dépôt
              </h3>
              <p className="text-gray-600">
                Déposez avec Orange Money ou Telma Mobile Money
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#1E40AF] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gagnez chaque jour
              </h3>
              <p className="text-gray-600">
                Recevez automatiquement 11% de profit quotidien
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ce Que Disent Nos Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "SmartProfit a complètement changé ma situation financière. Les profits quotidiens sont vraiment au rendez-vous !"
              </p>
              <div className="font-semibold text-gray-900">Marie Rakoto</div>
              <div className="text-sm text-gray-500">Antananarivo</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Interface très simple et les retraits avec Orange Money sont rapides. Je recommande vivement !"
              </p>
              <div className="font-semibold text-gray-900">Jean Andry</div>
              <div className="text-sm text-gray-500">Fianarantsoa</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Excellente plateforme ! Le service client répond rapidement et les profits sont garantis."
              </p>
              <div className="font-semibold text-gray-900">Hery Rasolofo</div>
              <div className="text-sm text-gray-500">Mahajanga</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1E40AF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à Commencer Votre Investissement ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'investisseurs qui gagnent 11% chaque jour
          </p>
          <a
            href="/account/signup"
            className="bg-white text-[#1E40AF] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Créer mon compte maintenant
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <li><a href="/account/signup" className="text-gray-400 hover:text-white">Créer un compte</a></li>
                <li><a href="/account/signin" className="text-gray-400 hover:text-white">Se connecter</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@smartprofit.com" className="text-gray-400 hover:text-white">support@smartprofit.com</a></li>
                <li><span className="text-gray-400">+261 20 XX XXX XX</span></li>
                <li><span className="text-gray-400">Lun-Dim 24h/24</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Méthodes de Paiement</h4>
              <div className="flex space-x-4">
                <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Orange Money</div>
                <div className="bg-red-500 text-white px-3 py-1 rounded text-sm">Telma</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 SmartProfit. Tous droits réservés. | 
              <a href="/legal" className="hover:text-white"> Mentions légales</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}