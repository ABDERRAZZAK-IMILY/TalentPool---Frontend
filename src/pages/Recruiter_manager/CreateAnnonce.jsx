import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';

export default function CreateAnnonce() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        recruteur_id: localStorage.getItem('userId'),
        titre: '',
        description: '',
    
    });

    console.log("Recruteur ID:", formData.recruteur_id);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.titre.trim()) newErrors.titre = 'Le titre est requis';
        if (!formData.description.trim()) newErrors.description = 'La description est requise';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await axiosClient.post('http://localhost/api/annonces', formData , {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
            );
            
            if (response.data) {

                alert('Annonce créée avec succès!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la création de l\'annonce. Veuillez réessayer.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Créer une nouvelle annonce</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Erreur!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                        <label htmlFor="titre" className="block text-gray-700 font-medium mb-2">Titre de l'annonce*</label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Ex: Développeur Frontend React"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
                    </div>
                    
                  
                    
                    {/* Description */}
                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description du poste*</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Décrivez le poste, les responsabilités, etc."
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
               
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/reciter/annonces')}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Création en cours...' : 'Créer l\'annonce'}
                    </button>
                </div>
            </form>
        </div>
    );
}