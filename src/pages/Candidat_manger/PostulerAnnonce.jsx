import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';

export default function PostulerAnnonce() {
    const navigate = useNavigate();
    const { annonceId } = useParams();
    const [formData, setFormData] = useState({
        cv: null,
        lettre_motivation: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!annonceId) {
            setError('ID de l\'annonce invalide');
            return;
        }
    }, [annonceId]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!annonceId) {
            setError('ID de l\'annonce invalide');
            return;
        }
        
        setLoading(true);
        setError(null);
    
        const formDataToSend = new FormData();
        formDataToSend.append('cv', formData.cv);
        formDataToSend.append('lettre_motivation', formData.lettre_motivation);
        formDataToSend.append('annonce_id', annonceId);
    
        try {
            await axiosClient.post('/candidatures', formDataToSend, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
    
            navigate('/candidat/mes-candidatures');
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'envoi de votre candidature.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Postuler à l'annonce</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cv">
                        CV (PDF)
                    </label>
                    <input
                        type="file"
                        id="cv"
                        name="cv"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lettre_motivation">
                        Lettre de motivation (PDF)
                    </label>
                    <input
                        type="file"
                        id="lettre_motivation"
                        name="lettre_motivation"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Envoi en cours...
                        </>
                    ) : 'Envoyer ma candidature'}
                </button>
            </form>
        </div>
    );
}