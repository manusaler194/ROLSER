import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [user, setUser] = useState(() => {
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
    }, [token, role, user]); 

    const login = (userData, userToken) => {
        if (!userData || !userData.role) {
            console.error("El usuario no tiene un rol asignado");
            return;
        }

        const roleNormalizado = userData.role.toLowerCase().trim(); 

        setToken(userToken);
        setRole(roleNormalizado);
        setUser(userData);

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