import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// --- IMPORTACIONES DE TUS COMPONENTES ---
import Header from "./components/Conjunto/Header";
import Navbar from "./components/Conjunto/Navbar";
import Login from "./components/Auth/Login";
import Catalogos from "./components/Catalogo/Catalogos";
import GestionUsuarios from "./components/Administrador/GestionUsuarios";
import Users from "./components/Administrador/Users";
import GestionAlmacen from "./components/Almacen/GestionAlmacen.jsx";
import CrearAlmacen from "./components/Almacen/CrearAlmacen.jsx";
import ModificarAlmacen from "./components/Almacen/ModificarAlmacen.jsx";
import DatosAlmacen from "./components/Almacen/DatosAlmacen.jsx";
import ModificarAdministrador from "./components/Administrador/ModificarAdministrador";
import GestionarPedidos from "./components/Pedido/GestionarPedidos.jsx";
import ModificarCliente from "./components/Administrador/ModificarCliente.jsx";
import ModificarClienteVip from "./components/Administrador/ModificarClienteVip.jsx";
import ModificarComercial from "./components/Administrador/ModificarComercial.jsx";
import ModificarEncargado from "./components/Administrador/ModificarEncargado.jsx";
import DetallesPedido from "./components/Pedido/DetallesPedido.jsx";
import CrearAdmin from "./components/Administrador/CrearAdmin.jsx";
import CrearCliente from "./components/Administrador/CrearCliente.jsx";
import CrearClienteVip from "./components/Administrador/CrearClienteVip.jsx";
import CrearPedidoRebastecimiento from "./components/Pedido/CrearPedidoRebastecimiento.jsx";
import CrearEncargado from "./components/Administrador/CrearEncargado.jsx";
import CrearComercial from "./components/Administrador/CrearComercial.jsx";
import ListadoAdministrador from "./components/Administrador/ListadoAdministrador.jsx";
import ListadoCliente from "./components/Administrador/ListadoCliente.jsx";
import ListadoClienteVip from "./components/Administrador/ListadoClienteVip.jsx";
import ListadoEncargado from "./components/Administrador/ListadoEncargado.jsx";
import ListadoComerciales from "./components/Administrador/ListadoComercial.jsx";

const AppContent = () => {
    const { token, role } = useAuth();

    // 1. Si NO hay token, forzamos la vista de Login
    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    // 2. Si HAY token, mostramos la estructura protegida
    return (
        <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Navbar usuario={role} />

                <main className="flex-1 overflow-auto p-6 bg-gray-50">
                    <Routes>
                        {/* --- RUTAS COMUNES / CATÁLOGO --- */}
                        <Route path="/catalogos" element={<Catalogos />} />
                        <Route path="/pedidos" element={<GestionarPedidos />} />
                        <Route path="/DetallesPedido/:id" element={<DetallesPedido />} />

                        {/* --- RUTAS EXCLUSIVAS DE ADMINISTRADOR --- */}
                        {role === 'administrador' && (
                            <>
                                <Route path="/usuarios" element={<GestionUsuarios />} />
                                <Route path="/listado-comerciales" element={<ListadoComerciales />} />
                                <Route path="/listado-encargados" element={<ListadoEncargado />} />
                                <Route path="/listado-clientes-vip" element={<ListadoClienteVip />} />
                                <Route path="/listado-clientes" element={<ListadoCliente />} />
                                <Route path="/listado-administradores" element={<ListadoAdministrador />} />
                                
                                <Route path="/crear-comercial" element={<CrearComercial />} />
                                <Route path="/crear-admin" element={<CrearAdmin />} />
                                <Route path="/crear-cliente" element={<CrearCliente />} />
                                <Route path="/crear-encargado" element={<CrearEncargado />} />
                                <Route path="/crear-clientevip" element={<CrearClienteVip />} />

                                <Route path="/modificar-comercial/:id" element={<ModificarComercial />} />
                                <Route path="/modificar-encargado/:id" element={<ModificarEncargado />} />
                                <Route path="/modificar-clientevip/:id" element={<ModificarClienteVip />} />
                                <Route path="/modificar-cliente/:id" element={<ModificarCliente />} />
                                <Route path="/modificar-admin/:id" element={<ModificarAdministrador />} />
                            </>
                        )}

                        {/* --- RUTAS DE ALMACÉN (Admin y Encargado) --- */}
                        {['administrador', 'encargadoalmacen'].includes(role) && (
                            <>
                                <Route path="/GestionAlmacen" element={<GestionAlmacen />} />
                                <Route path="/CrearAlmacen" element={<CrearAlmacen />} />
                                <Route path="/ModificarAlmacen/:id" element={<ModificarAlmacen />} />
                                <Route path="/DatosAlmacen/:id" element={<DatosAlmacen />} />
                                <Route path="/crear-pedido" element={<CrearPedidoRebastecimiento />} />
                            </>
                        )}

                        {/* --- REDIRECCIÓN INICIAL SEGÚN ROL --- */}
                        <Route path="/" element={
                            <Navigate to={role === 'encargadoalmacen' ? "/GestionAlmacen" : "/catalogos"} />
                        } />

                        {/* RUTA 404 / NO AUTORIZADO */}
                        <Route path="*" element={<div className="p-10 text-center"><h1>Acceso denegado o página no encontrada</h1></div>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

// COMPONENTE PRINCIPAL
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;