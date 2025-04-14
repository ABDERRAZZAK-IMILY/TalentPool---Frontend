import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function CandidatLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-blue-700 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
                <div className="p-4 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold">TALENTPOOL</h1>
                    ) : (
                        <h1 className="text-xl font-bold">TP</h1>
                    )}
                    <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                        </svg>
                    </button>
                </div>
                <nav className="mt-8">
                    <ul className="space-y-2 px-4">
                        <li>
                            <Link to="/candidat/dashboard" className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/candidat/annonces" className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                {isSidebarOpen && <span className="ml-3">Offres d'emploi</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/candidat/mes-candidatures" className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {isSidebarOpen && <span className="ml-3">Mes candidatures</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/candidat/profile" className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {isSidebarOpen && <span className="ml-3">Mon profil</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 w-full p-4">
                    <Link to="/logout" className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {isSidebarOpen && <span className="ml-3">Déconnexion</span>}
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800">Espace Candidat</h2>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto bg-gray-100 p-4">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}