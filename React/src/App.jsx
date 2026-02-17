import React from "react";
import {BrowserRouter as Router,Routes,Route,Navigate, useNavigate,} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Conjunto/Header";
import Navbar from "./components/Conjunto/Navbar";
import Login from "./components/Auth/Login";
import Catalogos from "./components/Catalogo/crearCatalogos";
import GestionUsuarios from "./components/Administrador/GestionUsuarios";
import GestionAlmacen from "./components/Almacen/GestionAlmacen";
import GestionAlmacenEncargado from "./components/Almacen/GestionAlmacenEncargado";
import CrearAlmacen from "./components/Almacen/CrearAlmacen";
import ModificarAlmacen from "./components/Almacen/ModificarAlmacen";
import DatosAlmacen from "./components/Almacen/DatosAlmacen";
import DatosAlmacenEncargado from "./components/Almacen/DatosAlmacenEncargado";
import ModificarAdministrador from "./components/Administrador/ModificarAdministrador";
import GestionarPedidos from "./components/Pedido/GestionarPedidos";
import GestionarPedidosEncargado from "./components/Pedido/GestionarPedidosEncargado";
import ModificarCliente from "./components/Administrador/ModificarCliente";
import ModificarClienteVip from "./components/Administrador/ModificarClienteVip";
import ModificarComercial from "./components/Administrador/ModificarComercial";
import ModificarEncargado from "./components/Administrador/ModificarEncargado";
import DetallesPedido from "./components/Pedido/DetallesPedido";
import DetallesPedidoEncargado from "./components/Pedido/DetallesPedidoEncargado";
import CrearAdmin from "./components/Administrador/CrearAdmin";
import CrearCliente from "./components/Administrador/CrearCliente";
import CrearClienteVip from "./components/Administrador/CrearClienteVip";
import CrearPedidoRebastecimiento from "./components/Pedido/CrearPedidoRebastecimiento";
import CrearEncargado from "./components/Administrador/CrearEncargado";
import MostrarFacturas from "./components/Factura/MostrarFacturas";
import MostrarFactura from "./components/Factura/MostrarFactura";
import CrearComercial from "./components/Administrador/CrearComercial";
import ListadoAdministrador from "./components/Administrador/ListadoAdministrador";
import ListadoCliente from "./components/Administrador/ListadoCliente";
import ListadoClienteVip from "./components/Administrador/ListadoClienteVip";
import ListadoEncargado from "./components/Administrador/ListadoEncargado";
import ListadoComerciales from "./components/Administrador/ListadoComercial";
import Perfil from "./components/Conjunto/Perfil";
import VerCatalogoCliente from "./components/Catalogo/VerCatalogoCliente";
import VerArticulosCliente from "./components/Catalogo/VerArticulosCliente";
import CarritoCatalogo from "./components/Catalogo/CarritoCatalogo";


const AppContent = () => {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
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

            {role === "admin" && (
              <>
                <Route path="/usuarios" element={<GestionUsuarios />} />
                <Route path="/crear-catalogo" element={<Catalogos />} />
                <Route path="/listado-comerciales" element={<ListadoComerciales />} />
                <Route path="/listado-encargados" element={<ListadoEncargado />} />
                <Route path="/listado-clientes-vip" element={<ListadoClienteVip />} />
                <Route path="/listado-clientes" element={<ListadoCliente />} />
                <Route path="/listado-administradores" element={<ListadoAdministrador />} />
                <Route path="/crear-admin" element={<CrearAdmin />} />
                <Route path="/crear-comercial" element={<CrearComercial />} />
                <Route path="/crear-cliente" element={<CrearCliente />} />
                <Route path="/crear-encargado" element={<CrearEncargado />} />
                <Route path="/crear-clientevip" element={<CrearClienteVip />} />
                <Route path="/modificar-admin/:id" element={<ModificarAdministrador />} />
                <Route path="/modificar-comercial/:id" element={<ModificarComercial />} />
                <Route path="/modificar-encargado/:id" element={<ModificarEncargado />} />
                <Route path="/modificar-clientevip/:id" element={<ModificarClienteVip />} />
                <Route path="/modificar-cliente/:id" element={<ModificarCliente />} />
                <Route path="/tarifas" element={<div>Página de Tarifas</div>} />
                <Route path="/estadisticas" element={<div>Estadísticas</div>} />
                <Route path="/DetallesPedido/:id" element={<DetallesPedido />} />

              </>
            )}

            {["admin", "encargado_almacen"].includes(role) && (
              <>
                <Route path="/pedidos" element={<GestionarPedidos />} />
                <Route path="/GestionAlmacen" element={<GestionAlmacen />} />
                <Route path="/CrearAlmacen" element={<CrearAlmacen />} />
                <Route path="/ModificarAlmacen/:id" element={<ModificarAlmacen />} />
                <Route path="/DatosAlmacen/:id" element={<DatosAlmacen />} />
                <Route path="/crear-pedido-reabastecimiento" element={<CrearPedidoRebastecimiento />} />
                {role === "encargado_almacen" && (
                  <>
                    <Route path="/DetallesPedido/encargado/:id" element={<DetallesPedidoEncargado />} />
                      <Route path="/Pedidos/encargado" element={<GestionarPedidosEncargado />} />

                    <Route path="/GestionAlmacenEncargado" element={<GestionAlmacenEncargado />} />
                    <Route path="/DatosAlmacenEncargado/:id" element={<DatosAlmacenEncargado />} />
                    <Route path="/stock" element={<div>Stock</div>} />
                  </>
                )}
              </>
            )}

            {["comercial", "clientevip", "cliente", "admin"].includes(role) && (
              <>
                <Route path="/pedidosRealizados" element={<div>Pedidos Realizados</div>} />
                
                <Route path="/facturas" element={<MostrarFacturas />} />
                <Route path="/factura/:id" element={<MostrarFactura />} />
                
                {role === "cliente" && (
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
                    role === "encargado_almacen" ? "/pedidos/encargado" :
                    ["comercial", "cliente", "clientevip"].includes(role) ? "/pedidosRealizados" :
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