import GestionUsuarios from "./components/Administrador/GestionUsuarios";
import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"
import Catalogos from "./components/Conjunto/Catalogos";
import Users from "./components/Administrador/Users";
import GestionAlmacen from "./components/Almacen/GestionAlmacen.jsx";
import CrearAlmacen from "./components/Almacen/CrearAlmacen.jsx";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModificarAlmacen from "./components/Almacen/ModificarAlmacen.jsx";
import DatosAlmacen from "./components/Almacen/DatosAlmacen.jsx";
import ModificarAdministrador from "./components/Administrador/ModificarAdministrador";
import GestionarPedidos from "./components/Pedido/GestionarPedidos.jsx";
import ModificarCliente from "./components/Administrador/ModificarCliente.jsx";
import ModificarClienteVip from "./components/Administrador/ModificarClienteVip.jsx";
import ModificarComercial from "./components/Administrador/ModificarComercial.jsx";
import ModificarEncargado from "./components/Administrador/ModificarEncargado.jsx";
import DetallesPedido from "./components/Pedido/DetallesPedido.jsx";
import CrearPedidoRebastecimiento from "./components/Pedido/CrearPedidoRebastecimiento.jsx";
 
const App = () => {
 const rolActual = "admin";

    return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        <Navbar usuario={rolActual} />

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/modificar-encargado/:id" element={<ModificarEncargado />} />
            <Route path="/modificar-comercial/:id" element={<ModificarComercial />} />
            <Route path="/modificar-clientevip/:id" element={<ModificarClienteVip />} />
            <Route path="/modificar-cliente/:id" element={<ModificarCliente />} />
            <Route path="/modificar-admin/:id" element={<ModificarAdministrador />} />
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/catalogos" element={<Catalogos />} />
            <Route path="/" element={<Navigate to="/catalogos" />} />
            
            <Route path="/GestionAlmacen" element={<GestionAlmacen />} />
            <Route path="/CrearAlmacen" element={<CrearAlmacen />} />
            <Route path="/ModificarAlmacen/:id" element={<ModificarAlmacen />} />
            <Route path="/DatosAlmacen/:id" element={<DatosAlmacen />} />


            <Route path="/pedidos" element={<GestionarPedidos/>} />
            <Route path="/DetallesPedido/:id" element={<DetallesPedido />} />
            <Route path="/crear-pedido" element={<CrearPedidoRebastecimiento/>} />

            <Route path="/" element={<Navigate to={rolActual === 'encargado_almacen' ? "/almacen" : "/catalogos"} />} 
            />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;
