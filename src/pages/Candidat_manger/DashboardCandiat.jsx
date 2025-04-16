import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';

export default function DashboardCandidat() {
    
   let  candidature = "imily";
   let annonce = "imily";

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Total Candidatures</h2>
                            <p className="text-2xl font-semibold text-gray-800">0</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">En attente</h2>
                            <p className="text-2xl font-semibold text-gray-800">1</p>
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
                            <h2 className="text-gray-600 text-sm">Acceptées</h2>
                            <p className="text-2xl font-semibold text-gray-800">3</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-100 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Refusées</h2>
                            <p className="text-2xl font-semibold text-gray-800">4</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Candidatures récentes</h2>
                        <div className="space-y-4">
                                <Link
                                    key={candidature.id}
                                    to={`/candidat/candidatures/${candidature.id}`}
                                    className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">S</h3>
                                            <p className="text-sm text-gray-500">Q</p>
                                        </div>
                                    V
                                    </div>
                                </Link>
                          
                        </div>
                        <div className="mt-4">
                            <Link
                                to="/candidat/mes-candidatures"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Voir toutes mes candidatures →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Job Postings */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Offres récentes</h2>
                        <div className="space-y-4">
                                <Link
                                    key={annonce.id}
                                    to={`/candidat/annonces/${annonce.id}`}
                                    className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <h3 className="text-sm font-medium text-gray-900">S</h3>
                                    <p className="text-sm text-gray-500">S</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                    </p>
                                </Link>
                          
                        </div>
                        <div className="mt-4">
                            <Link
                                to="/candidat/annonces"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Voir toutes les offres →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}