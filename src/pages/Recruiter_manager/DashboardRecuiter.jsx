import { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axios.js';

export default function DashboardRecuiter() {
    const [stats, setStats] = useState({
        totalAnnonces: 0,
        activeAnnonces: 0,
        totalCandidatures: 0,
        recentCandidatures: []
    });
    

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Total Annonces</h2>
                            <p className="text-2xl font-semibold text-gray-800">{stats.totalAnnonces}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Annonces Actives</h2>
                            <p className="text-2xl font-semibold text-gray-800">{stats.activeAnnonces}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Total Candidatures</h2>
                            <p className="text-2xl font-semibold text-gray-800">{stats.totalCandidatures}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Candidatures Récentes</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {stats.recentCandidatures.length > 0 ? (
                        stats.recentCandidatures.map((candidature) => (
                            <div key={candidature.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">{candidature.name}</h4>
                                    <p className="text-sm text-gray-500">{candidature.position}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500">{candidature.date}</span>
                                    <button className="ml-4 text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-4 text-center text-gray-500">Aucune candidature récente</div>
                    )}
                </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions Rapides</h3>
                    <div className="space-y-2">
                        <a href="/reciter/create-annonce" className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="ml-3 text-gray-700">Créer une nouvelle annonce</span>
                        </a>
                        <a href="/reciter/annonces" className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="ml-3 text-gray-700">Gérer mes annonces</span>
                        </a>
                        <a href="/reciter/candidatures" className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="ml-3 text-gray-700">Voir les candidatures</span>
                        </a>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité Récente</h3>
                    <div className="space-y-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="h-3 w-3 rounded-full bg-blue-500 mt-1"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-700">Nouvelle candidature pour <span className="font-medium">Développeur Frontend</span></p>
                                <p className="text-xs text-gray-500">Il y a 2 heures</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="h-3 w-3 rounded-full bg-green-500 mt-1"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-700">Annonce <span className="font-medium">UX Designer</span> publiée</p>
                                <p className="text-xs text-gray-500">Il y a 1 jour</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="h-3 w-3 rounded-full bg-yellow-500 mt-1"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-700">Entretien programmé avec <span className="font-medium">John Doe</span></p>
                                <p className="text-xs text-gray-500">Il y a 2 jours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}