import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !name) {
      setError("Veuillez remplir tous les champs obligatoires");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: "Impossible de démarrer l'inscription. Veuillez réessayer.",
        OAuthCallback: "Échec de l'inscription après redirection. Veuillez réessayer.",
        OAuthCreateAccount: "Impossible de créer un compte avec cette méthode.",
        EmailCreateAccount: "Cet email ne peut pas être utilisé. Il est peut-être déjà enregistré.",
        Callback: "Une erreur s'est produite lors de l'inscription.",
        OAuthAccountNotLinked: "Ce compte est lié à une méthode différente.",
        CredentialsSignin: "Email ou mot de passe invalide. Si vous avez déjà un compte, essayez de vous connecter.",
        AccessDenied: "Vous n'avez pas l'autorisation de vous inscrire.",
        Configuration: "L'inscription ne fonctionne pas actuellement.",
        Verification: "Votre lien d'inscription a expiré.",
      };

      setError(
        errorMessages[err.message] || "Une erreur s'est produite. Veuillez réessayer.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E40AF]">SmartProfit</h1>
          <p className="text-gray-600 mt-2">Investissez aujourd'hui, gagnez chaque jour</p>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Créer un compte
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nom complet *
              </label>
              <input
                required
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom complet"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Adresse email *
              </label>
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe *
              </label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Au moins 6 caractères"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe *
              </label>
              <input
                required
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer votre mot de passe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
              En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
              Profit quotidien de 11% garanti sur tous vos investissements.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E40AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <a
                href={`/account/signin${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-[#1E40AF] hover:text-[#1E3A8A] font-medium"
              >
                Se connecter
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;