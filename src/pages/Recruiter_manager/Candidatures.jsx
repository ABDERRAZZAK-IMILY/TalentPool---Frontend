import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Candidatures() {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCandidatures();
    }, []);

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
        } catch (err) {
            console.error('Error fetching candidatures:', err);
            const errorMessage = err.response?.data?.message || 'Erreur lors de la récupération des candidatures';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

 

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



    const filteredCandidatures = candidatures.filter(candidature => {
        if (filter !== 'all' && candidature.statut !== filter) {
            return false;
        }
        
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const candidateName = candidature.user?.name?.toLowerCase() || '';
            const candidateEmail = candidature.user?.email?.toLowerCase() || '';
            const annonceTitle = candidature.annonce?.titre?.toLowerCase() || '';
            
            return candidateName.includes(searchLower) || 
                   candidateEmail.includes(searchLower) || 
                   annonceTitle.includes(searchLower);
        }
        
        return true;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Candidatures</h1>
                <div className="flex space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="en_attente">En attente</option>
                        <option value="acceptée">Acceptées</option>
                        <option value="refusée">Refusées</option>
                    </select>
                </div>
            </div>
            
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
                    <p>Aucune candidature trouvée.</p>
                </div>
            ) : filteredCandidatures.length === 0 ? (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                    <p>Aucune candidature ne correspond à vos critères de recherche.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCandidatures.map((candidature) => (
                                <tr key={candidature.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {candidature.user?.name || 'IMILY ABDERRAZZAK'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {candidature.user?.email || 'IMILY@gmail.com'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{candidature.annonce?.titre || 'Full stack developper'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(candidature.statut)}`}>
                                            {(candidature.statut)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {(candidature.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link 
                                            to={`/recruiter/candidatures/${candidature.id}`} 
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Voir détails
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