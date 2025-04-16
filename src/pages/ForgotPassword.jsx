import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../api/axios.js";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setError('Veuillez saisir votre adresse email.');
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await axiosClient.post('/forgot-password', { email });
            setSuccess(true);
            toast.success('Un email de réinitialisation a été envoyé à votre adresse email.');
        } catch (err) {
            console.error('Error:', err);
            const errorMessage = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Entrez votre adresse email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                {success ? (
                    <div className="text-center">
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                            <p>Un email de réinitialisation a été envoyé à votre adresse email.</p>
                            <p className="mt-2">Veuillez vérifier votre boîte de réception et suivre les instructions.</p>
                        </div>
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                            Retour à la page de connexion
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 text-red-700 bg-red-100 rounded-md" role="alert">
                                {error}
                            </div>
                        )}
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="votre@email.com"
                            />
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
                                        Envoi en cours...
                                    </>
                                ) : 'Envoyer le lien de réinitialisation'}
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