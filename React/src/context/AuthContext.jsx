import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Intentamos recuperar la sesión del almacenamiento del navegador
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // Cada vez que el token cambie, configuramos Axios para que lo envíe siempre
    // Dentro de AuthProvider en AuthContext.jsx
    useEffect(() => {
        if (token) {
            // Esto añade el token a TODAS las peticiones de Axios automáticamente
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.clear();
        }
    }, [token, role]);

    const login = (data) => {
        setToken(data.token);
        setRole(data.role);
        setUser(data.user);
        localStorage.setItem('role', data.role);
        localStorage.setItem('user', JSON.stringify(data.user));
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);