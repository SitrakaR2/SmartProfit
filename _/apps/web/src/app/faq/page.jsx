import { ChevronDown, ArrowLeft } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment fonctionne SmartProfit ?",
      answer: "SmartProfit est une plateforme d'investissement qui vous offre 11% de profit quotidien garanti. Vous déposez de l'argent via Orange Money ou Telma, et chaque jour, nous ajoutons automatiquement 11% de votre solde à votre compte."
    },
    {
      question: "Quel est le dépôt minimum ?",
      answer: "Le dépôt minimum est de 1,000 Ar. Il n'y a pas de limite maximale, vous pouvez investir autant que vous le souhaitez."
    },
    {
      question: "Comment puis-je déposer de l'argent ?",
      answer: "Nous acceptons uniquement Orange Money et Telma Mobile Money. Après avoir créé votre compte, allez dans 'Effectuer un Dépôt', choisissez votre méthode de paiement, effectuez le transfert et soumettez la référence de transaction."
    },
    {
      question: "Combien de temps faut-il pour approuver mon dépôt ?",
      answer: "Les dépôts sont généralement approuvés sous 24 heures. Une fois approuvé, vos profits quotidiens de 11% commencent immédiatement."
    },
    {
      question: "Comment sont calculés les profits quotidiens ?",
      answer: "Chaque jour à minuit, nous ajoutons automatiquement 11% de votre solde actuel à votre compte. Par exemple, si vous avez 10,000 Ar, vous recevrez 1,100 Ar de profit le lendemain."
    },
    {
      question: "Puis-je retirer mon argent à tout moment ?",
      answer: "Oui, vous pouvez demander un retrait à tout moment. Le retrait minimum est de 500 Ar. Les demandes de retrait sont traitées sous 24-48h ouvrables après approbation."
    },
    {
      question: "Y a-t-il des frais ?",
      answer: "Il n'y a aucun frais caché. Vous gardez 100% de vos profits. Les seuls frais peuvent être ceux appliqués par Orange Money ou Telma pour les transferts."
    },
    {
      question: "Mes investissements sont-ils sécurisés ?",
      answer: "Oui, tous vos fonds sont sécurisés. Nous utilisons un cryptage SSL et des mesures de sécurité avancées pour protéger votre argent et vos données personnelles."
    },
    {
      question: "Puis-je avoir plusieurs comptes ?",
      answer: "Non, chaque personne ne peut avoir qu'un seul compte SmartProfit. Les comptes multiples peuvent entraîner la suspension de tous les comptes."
    },
    {
      question: "Comment puis-je suivre mes profits ?",
      answer: "Connectez-vous à votre tableau de bord pour voir votre solde actuel, l'historique de vos profits quotidiens et toutes vos transactions en temps réel."
    },
    {
      question: "Que se passe-t-il si j'oublie mon mot de passe ?",
      answer: "Utilisez l'option 'Mot de passe oublié' sur la page de connexion. Nous vous enverrons un lien de réinitialisation par email."
    },
    {
      question: "Puis-je parrainer d'autres personnes ?",
      answer: "Actuellement, nous ne proposons pas de programme de parrainage, mais cela pourrait être ajouté dans le futur. Concentrez-vous sur la croissance de vos propres investissements."
    }
  ];

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Questions Fréquemment Posées
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur SmartProfit. 
            Si vous ne trouvez pas ce que vous cherchez, contactez notre support.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-gray-50 rounded-lg group">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                <span className="text-lg">{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-[#1E40AF] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-blue-100 mb-6">
            Notre équipe de support est disponible 24/7 pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#1E40AF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Nous Contacter
            </a>
            <a
              href="/account/signup"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1E40AF] transition-colors"
            >
              Créer un Compte
            </a>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p><strong>Email:</strong> support@smartprofit.com</p>
              <p><strong>Téléphone:</strong> +261 20 XX XXX XX</p>
            </div>
            <div>
              <p><strong>Heures:</strong> 24h/24, 7j/7</p>
              <p><strong>Temps de réponse:</strong> Moins de 2 heures</p>
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
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
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