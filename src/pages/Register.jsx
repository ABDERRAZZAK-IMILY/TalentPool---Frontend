import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios.js";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'candidat'
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Password confirmation is required';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (!formData.role) {
            newErrors.role = 'Role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        if (errors[e.target.id]) {
            setErrors({
                ...errors,
                [e.target.id]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const response = await axiosClient.post('/register', formData);
                
                if (response.status === 200 || response.status === 201) {
                    console.log('Registration successful');
                    navigate('/login');
                } else {
                    setErrors({ submit: response.data.message || 'Registration failed' });
                }
            } catch (error) {
                setErrors({ 
                    submit: error.response?.data?.message || 'An error occurred. Please try again.' 
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                            onChange={handleChange} 
                            value={formData.name} 
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                            onChange={handleChange} 
                            value={formData.email} 
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                            onChange={handleChange} 
                            value={formData.password} 
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password_confirmation">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            id="password_confirmation" 
                            className={`border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                            onChange={handleChange} 
                            value={formData.password_confirmation} 
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
                        <select 
                            id="role" 
                            className={`border ${errors.role ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                            onChange={handleChange} 
                            value={formData.role}
                        >
                            <option value="candidat">Candidat</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>
                    {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
                    <button 
                        type="submit" 
                        className="bg-blue-500  py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}