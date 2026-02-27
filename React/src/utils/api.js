
export const BASE_URL = "http://100.25.154.102/api";

//export const BASE_URL = "http://192.168.0.14:8008/api";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }
  return response;
};
// ==========================================
// LLAMADAS PARA ADMINISTRADORES
// ==========================================
export const getAdministradores = () => apiFetch(`${BASE_URL}/administradores`);
export const getAdministrador = (id) =>
  apiFetch(`${BASE_URL}/administradores/${id}`);
export const updateAdministrador = (id, data) =>
  apiFetch(`${BASE_URL}/administradores/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteAdministrador = (id) =>
  apiFetch(`${BASE_URL}/administradores/borrar/${id}`, { method: "DELETE" });

// ==========================================
// LLAMADAS PARA CLIENTES
// ==========================================
export const getClientes = () => apiFetch(`${BASE_URL}/clientes`);
export const getCliente = (id) => apiFetch(`${BASE_URL}/clientes/${id}`);
export const updateCliente = (id, data) =>
  apiFetch(`${BASE_URL}/clientes/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteCliente = (id) =>
  apiFetch(`${BASE_URL}/clientes/borrar/${id}`, { method: "DELETE" });

// ==========================================
// LLAMADAS PARA CLIENTES VIP
// ==========================================
export const getClientesVip = () => apiFetch(`${BASE_URL}/clientesVip`);
export const getClienteVip = (id) => apiFetch(`${BASE_URL}/clientesVip/${id}`);
export const updateClienteVip = (id, data) =>
  apiFetch(`${BASE_URL}/clientesVip/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteClienteVip = (id) =>
  apiFetch(`${BASE_URL}/clientesVip/borrar/${id}`, { method: "DELETE" });

// ==========================================
// LLAMADAS PARA COMERCIALES
// ==========================================
export const getComerciales = () => apiFetch(`${BASE_URL}/comerciales`);
export const getComercial = (id) => apiFetch(`${BASE_URL}/comerciales/${id}`);
export const updateComercial = (id, data) =>
  apiFetch(`${BASE_URL}/comerciales/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteComercial = (id) =>
  apiFetch(`${BASE_URL}/comerciales/borrar/${id}`, { method: "DELETE" });

// ==========================================
// LLAMADAS PARA ENCARGADOS
// ==========================================
export const getEncargados = () => apiFetch(`${BASE_URL}/encargadoAlmacen`);
export const getEncargado = (id) =>
  apiFetch(`${BASE_URL}/encargadoAlmacen/${id}`);
export const updateEncargado = (id, data) =>
  apiFetch(`${BASE_URL}/encargadoAlmacen/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteEncargado = (id) =>
  apiFetch(`${BASE_URL}/encargadoAlmacen/borrar/${id}`, { method: "DELETE" });


export const createAlmacen = (data) =>
  apiFetch(`${BASE_URL}/almacenes/guardar`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  export const getAlmacen = (id) =>
  apiFetch(`${BASE_URL}/almacenes/${id}`);

  export const getAlmacenes = () =>
  apiFetch(`${BASE_URL}/almacenes`);

export const deleteAlmacen = (id) =>
  apiFetch(`${BASE_URL}/almacenes/borrar/${id}`, {
    method: "DELETE",
  });

  export const updateAlmacen = (id, data) =>
  apiFetch(`${BASE_URL}/almacenes/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  export const loginRequest = (email, password) =>
  apiFetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  export const registerRequest = (data) =>
  apiFetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  export const getArticulos = () =>
  apiFetch(`${BASE_URL}/articulo`);

export const updateArticulo = (id, data) =>
  apiFetch(`${BASE_URL}/articulo/actualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const createPedidoReposicion = (data) =>
  apiFetch(`${BASE_URL}/pedidos/reposicion/guardar`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getProveedores = () =>
  apiFetch(`${BASE_URL}/proveedor`);
