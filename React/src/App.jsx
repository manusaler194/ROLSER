import GestionUsuarios from "./components/Conjunto/GestionUsuarios";
import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"
import Catalogos from "./components/Conjunto/Catalogos";
import Users from "./components/Conjunto/Users";
import GestionAlmacen from "./components/Almacen/GestionAlmacen.jsx";
import CrearAlmacen from "./components/Almacen/CrearAlmacen.jsx";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModificarAlmacen from "./components/Almacen/ModificarAlmacen.jsx";
import DatosAlmacen from "./components/Almacen/DatosAlmacen.jsx";

const App = () => {
 const rolActual = "encargado_almacen";

    return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        <Navbar usuario={rolActual} />

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/catalogos" element={<Catalogos />} />
            <Route path="/pedidos" element={<Users />} />
            <Route path="/" element={<Navigate to="/catalogos" />} />

            <Route path="/GestionAlmacen" element={<GestionAlmacen />} />
            <Route path="/CrearAlmacen" element={<CrearAlmacen />} />
            <Route path="/ModificarAlmacen/:id" element={<ModificarAlmacen />} />
            <Route path="/DatosAlmacen/:id" element={<DatosAlmacen />} />

            <Route path="/" element={<Navigate to={rolActual === 'encargado_almacen' ? "/almacen" : "/catalogos"} />} 
            />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;
