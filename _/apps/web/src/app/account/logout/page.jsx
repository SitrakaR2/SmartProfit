import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E40AF]">SmartProfit</h1>
          <p className="text-gray-600 mt-2">Investissez aujourd'hui, gagnez chaque jour</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Déconnexion
          </h2>
          
          <p className="text-gray-600 mb-8">
            Êtes-vous sûr de vouloir vous déconnecter de votre compte SmartProfit ?
          </p>

          <button
            onClick={handleSignOut}
            className="w-full bg-[#1E40AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 transition-colors"
          >
            Se déconnecter
          </button>
          
          <a
            href="/dashboard"
            className="block mt-4 text-sm text-gray-600 hover:text-[#1E40AF]"
          >
            Retour au tableau de bord
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;