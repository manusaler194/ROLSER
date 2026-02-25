export const BASE_URL = 'http://localhost/api';
export const apiFetch = async (url, options = {}) => {
    
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    
    if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
    }
    return response;
};
// ==========================================
// LLAMADAS PARA ADMINISTRADORES
// ==========================================
export const getAdministradores = () => apiFetch(`${BASE_URL}/administradores`);
export const getAdministrador = (id) => apiFetch(`${BASE_URL}/administradores/${id}`);
export const updateAdministrador = (id, data) => apiFetch(`${BASE_URL}/administradores/actualizar/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAdministrador = (id) => apiFetch(`${BASE_URL}/administradores/borrar/${id}`, { method: 'DELETE' });

// ==========================================
// LLAMADAS PARA CLIENTES
// ==========================================
export const getClientes = () => apiFetch(`${BASE_URL}/clientes`);
export const getCliente = (id) => apiFetch(`${BASE_URL}/clientes/${id}`);
export const updateCliente = (id, data) => apiFetch(`${BASE_URL}/clientes/actualizar/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCliente = (id) => apiFetch(`${BASE_URL}/clientes/borrar/${id}`, { method: 'DELETE' });

// ==========================================
// LLAMADAS PARA CLIENTES VIP
// ==========================================
export const getClientesVip = () => apiFetch(`${BASE_URL}/clientesVip`);
export const getClienteVip = (id) => apiFetch(`${BASE_URL}/clientesVip/${id}`);
export const updateClienteVip = (id, data) => apiFetch(`${BASE_URL}/clientesVip/actualizar/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteClienteVip = (id) => apiFetch(`${BASE_URL}/clientesVip/borrar/${id}`, { method: 'DELETE' });

// ==========================================
// LLAMADAS PARA COMERCIALES
// ==========================================
export const getComerciales = () => apiFetch(`${BASE_URL}/comerciales`);
export const getComercial = (id) => apiFetch(`${BASE_URL}/comerciales/${id}`);
export const updateComercial = (id, data) => apiFetch(`${BASE_URL}/comerciales/actualizar/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteComercial = (id) => apiFetch(`${BASE_URL}/comerciales/borrar/${id}`, { method: 'DELETE' });

// ==========================================
// LLAMADAS PARA ENCARGADOS
// ==========================================
export const getEncargados = () => apiFetch(`${BASE_URL}/encargadoAlmacen`);
export const getEncargado = (id) => apiFetch(`${BASE_URL}/encargadoAlmacen/${id}`);
export const updateEncargado = (id, data) => apiFetch(`${BASE_URL}/encargadoAlmacen/actualizar/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteEncargado = (id) => apiFetch(`${BASE_URL}/encargadoAlmacen/borrar/${id}`, { method: 'DELETE' });