import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CandidatureDetails() {
    const { candidatureId } = useParams();
    const navigate = useNavigate();
    const [candidature, setCandidature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingAction, setProcessingAction] = useState(false);

    useEffect(() => {
        fetchCandidatureDetails();
    }, [candidatureId]);

    const fetchCandidatureDetails = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`/candidatures/${candidatureId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setCandidature(response.data);
        } catch (err) {
            console.error('Error fetching candidature details:', err);
            setError('Erreur lors du chargement des détails de la candidature.');
            console.log(candidatureId);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir accepter cette candidature?')) return;
        
        try {
            setProcessingAction(true);
            await axiosClient.post(`/candidatures/${candidatureId}/accept`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            toast.success('Candidature acceptée avec succès!');
            fetchCandidatureDetails();
        } catch (err) {
            console.error('Error accepting candidature:', err);
            toast.error('Erreur lors de l\'acceptation de la candidature.');
        } finally {
            setProcessingAction(false);
        }
    };

    const handleRefuse = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir refuser cette candidature?')) return;
        
        try {
            setProcessingAction(true);
            await axiosClient.post(`/candidatures/${candidatureId}/refuse`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            toast.success('Candidature refusée avec succès!');
            fetchCandidatureDetails();
        } catch (err) {
            console.error('Error refusing candidature:', err);
            toast.error('Erreur lors du refus de la candidature.');
        } finally {
            setProcessingAction(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            en_attente: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
            acceptée: { bg: 'bg-green-100', text: 'text-green-800', label: 'Acceptée' },
            refusée: { bg: 'bg-red-100', text: 'text-red-800', label: 'Refusée' }
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
            <ToastContainer position="top-right" autoClose={5000} />
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Détails de la Candidature</h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 space-y-6">
                    {/* Informations sur le candidat */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations du candidat</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">{candidature.user?.name || 'IMILY ABDERRAZZAK'}</h3>
                            <p className="text-gray-600 mt-2">{candidature.user?.email || 'IMILY@gmail.com'}</p>
                        </div>
                    </div>

                    {/* Informations sur l'offre */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Offre d'emploi</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">{candidature.annonce?.titre || 'FULL STACK DEVELOPPEUR'}</h3>
                            <p className="text-gray-600 mt-2">{candidature.annonce?.description || 'LARAVEL , PHP , REACT'}</p>
                        </div>
                    </div>

                    {/* Statut de la candidature */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statut de la candidature</h2>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">État actuel:</span>
                            {getStatusBadge(candidature.statut)}
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
                                    href={candidature.cv_url}
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
                                    href={candidature.lettre_motivation_url}
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
                    {candidature.statut === 'en_attente' && (
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={handleRefuse}
                                disabled={processingAction}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${processingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Refuser
                            </button>
                            <button
                                onClick={handleAccept}
                                disabled={processingAction}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${processingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Accepter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}