import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { axiosClient } from "../api/axios.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Extract token from URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        const email = queryParams.get('email');
        
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            setFormData(prev => ({ ...prev, email }));
        } else {
            setErrors({ token: 'Token de réinitialisation manquant ou invalide.' });
        }
    }, [location]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'La confirmation du mot de passe est requise.';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Les mots de passe ne correspondent pas.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            const response = await axiosClient.post('/reset-password', {
                token,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation
            });
            
            setSuccess(true);
            toast.success('Votre mot de passe a été réinitialisé avec succès.');
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error('Error:', err);
            const errorMessage = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
            setErrors({ server: errorMessage });
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!token && !errors.token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Chargement...</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Réinitialisation du mot de passe</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Veuillez créer un nouveau mot de passe
                    </p>
                </div>

                {errors.token ? (
                    <div className="text-center">
                        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
                            <p>{errors.token}</p>
                        </div>
                        <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                            Demander un nouveau lien de réinitialisation
                        </Link>
                    </div>
                ) : success ? (
                    <div className="text-center">
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                            <p>Votre mot de passe a été réinitialisé avec succès.</p>
                            <p className="mt-2">Vous allez être redirigé vers la page de connexion...</p>
                        </div>
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                            Aller à la page de connexion
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {errors.server && (
                            <div className="p-4 text-red-700 bg-red-100 rounded-md" role="alert">
                                {errors.server}
                            </div>
                        )}
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nouveau mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`block w-full px-3 py-2 mt-1 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirmer le mot de passe
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className={`block w-full px-3 py-2 mt-1 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <div>
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
                                        Réinitialisation en cours...
                                    </>
                                ) : 'Réinitialiser le mot de passe'}
                            </button>
                        </div>

                        <div className="text-center">
                            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800">
                                Retour à la page de connexion
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}