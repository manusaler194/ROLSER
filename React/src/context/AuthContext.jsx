import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [user, setUser] = useState(() => {
        // Usamos una función inicializadora para evitar errores si el JSON está mal
        const savedUser = localStorage.getItem('user');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            return null;
        }
    });

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            if (user) localStorage.setItem('user', JSON.stringify(user));
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.clear();
        }
    }, [token, role, user]); // Añadimos 'user' a las dependencias

    const login = (userData, userToken) => {
        // Verificamos que userData y role existan antes de normalizar
        if (!userData || !userData.role) {
            console.error("El usuario no tiene un rol asignado");
            return;
        }

        const roleNormalizado = userData.role.toLowerCase().trim(); 
        
        // Actualizamos el estado. React detectará estos cambios y App.jsx 
        // habilitará las rutas correspondientes inmediatamente.
        setToken(userToken);
        setRole(roleNormalizado);
        setUser(userData);

        // Guardamos explícitamente para asegurar persistencia antes de navegar
        localStorage.setItem('token', userToken);
        localStorage.setItem('role', roleNormalizado);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ token, role, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);