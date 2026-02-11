import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // 2. Inicializar el hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/api/login', { email, password });
            console.log(response.data);
            const { user, token, role } = response.data;
            
            const userConRole = { ...user, role: role };

            login(userConRole, token); 
            
            navigate("/"); 
        } catch (error) {
            console.error(error);
            alert("Error: Credenciales inválidas");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-600">
            <form onSubmit={handleSubmit} className="p-10 bg-white shadow-xl rounded-lg w-96">
                <h2 className="text-2xl mb-5 font-bold text-center text-gray-800">SGC Login</h2>
                <div className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={e => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={e => setPassword(e.target.value)} 
                        required
                    />
                    <button className="w-full bg-[#002878] hover:bg-blue-800 text-white p-2 rounded font-semibold transition-colors">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;