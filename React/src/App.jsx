import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"

import Users from "./components/Conjunto/Users";
import GestionAlmacen from "./components/Almacen/GestionAlmacen.jsx";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
 const rolActual = "encargado_almacen";

    return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      
      {/* 1. Header (Ocupa todo el ancho arriba) */}
      <Header />

      {/* 2. Contenedor inferior (Ocupa el resto del espacio y es horizontal) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Navbar a la izquierda */}
        <Navbar usuario={rolActual} />

        {/* Contenido principal a la derecha */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/catalogos" element={<Catalogos />} />
            <Route path="/pedidos" element={<Users />} />
            <Route path="/" element={<Navigate to="/catalogos" />} />

            <Route path="/GestionAlmacen" element={<GestionAlmacen />} />

            <Route path="/" element={<Navigate to={rolActual === 'encargado_almacen' ? "/almacen" : "/catalogos"} />} 
            />
          </Routes>
        </main>

      </div>
    </div>
  );
>>>>>>> Stashed changes
}
export default App
