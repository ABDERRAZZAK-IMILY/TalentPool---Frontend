import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';

export default function CandidatureDetails() {
    const { candidatureId } = useParams();
    const navigate = useNavigate();
    const [candidature, setCandidature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [withdrawing, setWithdrawing] = useState(false);

    useEffect(() => {
        fetchCandidatureDetails();
    }, []);

    const handleWithdraw = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir retirer cette candidature?')) return;
        
        setWithdrawing(true);
        try {
            await axiosClient.delete(`/candidatures/${candidatureId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            navigate('/candidat/mes-candidatures');
        } catch (err) {
            setError('Erreur lors du retrait de la candidature.');
            console.error(err);
        } finally {
            setWithdrawing(false);
        }
    };



    const fetchCandidatureDetails = async () => {
        try {
            const response = await axiosClient.get(`/candidatures/${candidatureId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setCandidature(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des détails de la candidature.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            en_attente: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
            acceptee: { bg: 'bg-green-100', text: 'text-green-800', label: 'Acceptée' },
            refusee: { bg: 'bg-red-100', text: 'text-red-800', label: 'Refusée' }
        };

        const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };
    
    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Erreur!</strong>
            <span className="block sm:inline"> {error}</span>
        </div>
    );

    if (!candidature) return null;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Détails de la Candidature</h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 space-y-6">
                    {/* Informations sur l'offre */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Offre d'emploi</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">{candidature.annonce.titre}</h3>
                            <p className="text-gray-600 mt-2">{candidature.annonce.description}</p>
                        </div>
                    </div>

                    {/* Statut de la candidature */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statut de la candidature</h2>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">État actuel:</span>
                            {getStatusBadge(candidature.status)}
                        </div>
                        <p className="text-gray-600 mt-2">
                            Candidature soumise le {new Date(candidature.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Documents soumis */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents soumis</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-gray-700">CV</span>
                                </div>
                                <a
                                    href={formatUrl(candidature.cv_url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    <span>Voir le CV</span>
                                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-gray-700">Lettre de motivation</span>
                                </div>
                                <a
                                    href={formatUrl(candidature.lettre_motivation_url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    <span>Voir la lettre</span>
                                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {candidature.status === 'en_attente' && (
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleWithdraw}
                                disabled={withdrawing}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${withdrawing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {withdrawing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Retrait en cours...
                                    </>
                                ) : (
                                    <>
                                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Retirer ma candidature
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}