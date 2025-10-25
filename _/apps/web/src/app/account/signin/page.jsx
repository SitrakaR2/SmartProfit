import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: "Impossible de démarrer la connexion. Veuillez réessayer.",
        OAuthCallback: "Échec de la connexion après redirection. Veuillez réessayer.",
        OAuthCreateAccount: "Impossible de créer un compte avec cette méthode.",
        EmailCreateAccount: "Cet email ne peut pas être utilisé. Il est peut-être déjà enregistré.",
        Callback: "Une erreur s'est produite lors de la connexion.",
        OAuthAccountNotLinked: "Ce compte est lié à une méthode de connexion différente.",
        CredentialsSignin: "Email ou mot de passe incorrect.",
        AccessDenied: "Vous n'avez pas l'autorisation de vous connecter.",
        Configuration: "La connexion ne fonctionne pas actuellement.",
        Verification: "Votre lien de connexion a expiré.",
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
            Connexion
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Adresse email
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
                Mot de passe
              </label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E40AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <a
                href={`/account/signup${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-[#1E40AF] hover:text-[#1E3A8A] font-medium"
              >
                Créer un compte
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;