import React from "react";
import {BrowserRouter as Router,Routes,Route,Navigate, useNavigate,} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Conjunto/Header";
import Navbar from "./components/Conjunto/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Catalogos from "./components/Catalogo/crearCatalogos";
import GestionUsuarios from "./components/Administrador/GestionUsuarios";
import GestionAlmacen from "./components/Almacen/GestionAlmacen";
import CrearAlmacen from "./components/Almacen/CrearAlmacen";
import ModificarAlmacen from "./components/Almacen/ModificarAlmacen";
import DatosAlmacen from "./components/Almacen/DatosAlmacen";

import GestionarPedidos from "./components/Pedido/GestionarPedidos";

import DetallesPedido from "./components/Pedido/DetallesPedido";
import ModificarPerfil from "./components/Conjunto/ModificarPerfil";


import CrearPedidoRebastecimiento from "./components/Pedido/CrearPedidoRebastecimiento";

import MostrarFacturas from "./components/Factura/MostrarFacturas";
import MostrarFactura from "./components/Factura/MostrarFactura";

import Perfil from "./components/Conjunto/MostrarPerfil";
import VerCatalogoCliente from "./components/Catalogo/VerCatalogoCliente";
import VerArticulosCliente from "./components/Catalogo/VerArticulosCliente";
import Stock from './components/stock/Stock';
import CarritoCatalogo from "./components/Catalogo/CarritoCatalogo";
import ModificarUsuario from "./components/Administrador/ModificarUsuario";
import CrearUsuario from "./components/Administrador/CrearUsuario";
const AppContent = () => {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Navbar usuario={role} />

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Routes>

            <Route path="/perfil" element={<Perfil />} />
            <Route path="/modificar-perfil" element={<ModificarPerfil />} />
            {role === "admin" && (
              <>
                <Route path="/usuarios" element={<GestionUsuarios />} />
                <Route path="/crear-catalogo" element={<Catalogos />} />
                
                <Route path="/crear-admin" element={<CrearUsuario tipo="admin" />} />
                <Route path="/crear-comercial" element={<CrearUsuario tipo="comercial" />} />
                <Route path="/crear-cliente" element={<CrearUsuario tipo="cliente" />} />
                <Route path="/crear-encargado" element={<CrearUsuario tipo="encargado" />} />
                <Route path="/crear-clientevip" element={<CrearUsuario tipo="clienteVip" />} />
                <Route path="/modificar-admin/:id" element={<ModificarUsuario tipo="admin" />} />
                <Route path="/modificar-cliente/:id" element={<ModificarUsuario tipo="cliente" />} />
                <Route path="/modificar-clientevip/:id" element={<ModificarUsuario tipo="clienteVip" />} />
                <Route path="/modificar-comercial/:id" element={<ModificarUsuario tipo="comercial" />} />
                <Route path="/modificar-encargado/:id" element={<ModificarUsuario tipo="encargado" />} />
                <Route path="/tarifas" element={<div>Página de Tarifas</div>}/>
                <Route path="/estadisticas" element={<div>Estadísticas</div>}/>
              </>
            )}

            {["admin", "encargadoalmacen"].includes(role) && (
              <>
                <Route path="/GestionAlmacen" element={<GestionAlmacen />} />
                <Route path="/CrearAlmacen" element={<CrearAlmacen />} />
                <Route path="/ModificarAlmacen/:id" element={<ModificarAlmacen />} />
                <Route path="/DatosAlmacen/:id" element={<DatosAlmacen />} />
                <Route path="/crear-pedido-reabastecimiento" element={<CrearPedidoRebastecimiento />} />
                {role === "encargadoalmacen" && (
                  <>
                    <Route path="/stock" element={<Stock />} />
                  </>
                )}
              </>
            )}

            {["comercial", "clientevip", "cliente", "admin", 'encargadoalmacen'].includes(role) && (
              <>                
                <Route path="/facturas" element={<MostrarFacturas />} />
                <Route path="/factura/:id" element={<MostrarFactura />} />
                <Route path="/pedidos" element={<GestionarPedidos />} />
                <Route path="/DetallesPedido/:id" element={<DetallesPedido />} />


                
                {role === "cliente" &&  (
                  <>
                    <Route path="/VerCatalogoCliente" element={<VerCatalogoCliente/>}/>
                    <Route path="/VerArticulosCliente/:id_catalogo" element={<VerArticulosCliente/>}/>
                    <Route path="/CarritoCatalogo" element={<CarritoCatalogo/>}/>
                  </>
                )}

                {["comercial", "clientevip"].includes(role) && (
                  <>
                    <Route path="/realizar-pedido" element={<div>Por hacer</div>} />
                    <Route path="/solicitar-bajas-altas" element={<div>Bajas y Altas</div>} />
                  </>
                )}
                {role === "comercial" && (
                  <Route path="/aplicar-descuento" element={<div>Descuentos</div>} />
                )}

              </>
            )}
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    role === "admin" ? "/usuarios" :
                    role === "encargadoalmacen" ? "/pedidos" :
                    role === "cliente" ? "/pedidos":
                    role === "clientevip" ? "/pedidos":
                    role === "comercial" ? "/pedidos":

                    "/login"
                  }
                  replace
                />
              }
            />
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <h1 className="text-3xl font-bold text-gray-800">Acceso restringido</h1>
                  <p className="text-gray-500 mt-2">Tu perfil [{role}] no tiene permiso aquí.</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-[#bc002d] text-white px-6 py-2 rounded-full shadow-lg"
                  >
                    Volver al Inicio
                  </button>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;