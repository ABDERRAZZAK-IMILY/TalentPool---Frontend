import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';

export default function DeleteAnnonce() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState(null);
    const [annonce, setAnnonce] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchAnnonceData = async () => {
            try {
                setFetchLoading(true);
                setTimeout(() => {
                    setAnnonce({
                        id: id,
                        title: 'Développeur Frontend React',
                        company: 'TechCorp',
                        location: 'Paris, France',
                        type: 'full-time',
                        created_at: '2023-05-15'
                    });
                    setFetchLoading(false);
                }, 1000);
            } catch (err) {
                setError('Erreur lors du chargement de l\'annonce');
                setFetchLoading(false);
                console.error(err);
            }
        };

        fetchAnnonceData();
    }, [id]);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        
        try {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            navigate('/reciter/annonces');
        } catch (err) {
            setError('Erreur lors de la suppression de l\'annonce. Veuillez réessayer.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Supprimer l'annonce</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Erreur!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            
            {annonce && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    {!showConfirmation ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{annonce.title}</h2>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {annonce.company}
                                    </span>
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {annonce.location}
                                    </span>
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Créée le {annonce.created_at}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/reciter/annonces')}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmation(true)}
                                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Confirmation de suppression</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Vous êtes sur le point de supprimer définitivement l'annonce "{annonce.title}". Cette action ne peut pas être annulée.
                            </p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Suppression en cours...' : 'Confirmer la suppression'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}