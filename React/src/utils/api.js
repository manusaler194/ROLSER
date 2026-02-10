// src/utils/api.js
export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    // Combinamos las cabeceras que ya tenga con la de Autorización
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    // Si el token caduca, redirigimos al login
    if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
    }

    return response;
};