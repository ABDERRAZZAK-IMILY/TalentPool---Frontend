import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MesCandidatures() {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidatures = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/candidatures', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const candidaturesList = Array.isArray(response.data) ? response.data : 
                                      response.data.data ? response.data.data : [];
                setCandidatures(candidaturesList);
                console.log('API Response:', response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching candidatures:', err);
                const errorMessage = err.response?.data?.message || 'Erreur lors de la récupération des candidatures';
                setError(errorMessage);
                toast.error(errorMessage);
                setLoading(false);
                console.error(err);
            }
        };

        fetchCandidatures();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case 'en_attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'acceptée':
                return 'bg-green-100 text-green-800';
            case 'refusée':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <ToastContainer position="top-right" autoClose={5000} />
            <h1 className="text-2xl font-bold mb-6">Mes Candidatures</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Erreur!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            ) : candidatures.length === 0 ? (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                    <p>Vous n'avez pas encore de candidatures.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de candidature</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {candidatures.map((candidature) => (
                                <tr key={candidature.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {candidature.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(candidature.statut)}`}>
                                            {(candidature.statut)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {(candidature.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <a 
                                                href={`http://${candidature.cv}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                CV
                                            </a>
                                            <a 
                                                href={`http://${candidature.lettre_motivation}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Lettre
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link 
                                            to={`/candidat/candidatures/${candidature.id}`} 
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Détails
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}