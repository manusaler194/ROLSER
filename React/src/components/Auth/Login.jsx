import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/api/login', { email, password });
            login(response.data); // Guarda token y rol
        } catch (error) {
            alert("Error: Credenciales inválidas");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white shadow-xl rounded-lg">
                <h2 className="text-2xl mb-5 font-bold">SGC Login</h2>
                <input type="email" placeholder="Email" className="w-full mb-4 p-2 border" 
                       onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full mb-4 p-2 border" 
                       onChange={e => setPassword(e.target.value)} />
                <button className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
            </form>
        </div>
    );
};

export default Login;