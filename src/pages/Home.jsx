export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Bienvenue sur <span className="text-blue-600">TalentPool</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Une plateforme de gestion des recrutements simple et efficace
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600  px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                            Chercher un emploi
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
                            Publier une offre
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="text-blue-600 text-2xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold mb-2">Interface Intuitive</h3>
                        <p className="text-gray-600">Postulation simplifiée pour les candidats</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="text-blue-600 text-2xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">Gestion Efficace</h3>
                        <p className="text-gray-600">Suivi complet du processus de recrutement</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="text-blue-600 text-2xl mb-4">💼</div>
                        <h3 className="text-xl font-semibold mb-2">Publication d'Offres</h3>
                        <p className="text-gray-600">Publiez et gérez vos offres d'emploi facilement</p>
                    </div>
                </div>
            </div>

            {/* Job Categories */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Catégories Populaires</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Technologie', 'Marketing', 'Design', 'Commercial', 'Finance', 'Santé', 'Éducation', 'Ingénierie'].map((category) => (
                            <div key={category} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-blue-50 cursor-pointer transition">
                                <p className="font-medium text-gray-800">{category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}