import { useState, useEffect } from 'react';
import { axiosClient } from "../../api/axios";
import { Link } from 'react-router-dom';

export default function MesAnnonces() {
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await axiosClient.get('/annonces', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const annoncesList = Array.isArray(response.data) ? response.data : 
                                   response.data.data ? response.data.data : [];
                setAnnonces(annoncesList);
                console.log('API Response:', response.data);
            } catch (err) {
                setError('Erreur lors du chargement des annonces');
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnonces();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erreur!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }


    const hundelremove = async (annonceId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) {
            return;
        }
        
        try {
            await axiosClient.delete(`/annonces/${annonceId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
    
            setAnnonces(annonces.filter(annonce => annonce.id !== annonceId));
            alert("Annonce supprimée avec succès!");
        } catch (err) {
            console.error('Error deleting annonce:', err);
            alert("Erreur lors de la suppression de l'annonce");
        }
    }
    

   



    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mes Annonces</h1>
                <Link
                    to="/reciter/create-annonce"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Créer une annonce
                </Link>
            </div>

            {annonces.length === 0 ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-gray-600">Aucune annonce trouvée.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {annonces.map((annonce) => (
                        <div key={annonce.id} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{annonce.titre}</h2>
                            <p className="text-gray-600 mb-4">{annonce.description}</p>
                            <div className="flex justify-end space-x-4">
                               <Link 
    to={`/reciter/annonces/edit/${annonce.id}`}
    className="text-blue-600 hover:text-blue-800 font-medium"
>
    Modifier
</Link>

                                <button 
    onClick={() => hundelremove(annonce.id)}
    className="text-red-600 hover:text-red-800 font-medium"
>
    Supprimer
</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}