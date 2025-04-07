import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios.js";






export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

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
   
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }


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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axiosClient.post('/login', formData);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrors({ ...errors, server: 'Login failed. Please try again.' });
        }
    };



    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500  py-2 rounded hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
}
