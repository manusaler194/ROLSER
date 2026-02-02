import GestionUsuarios from "./components/Conjunto/GestionUsuarios";
import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"
import Catalogos from "./components/Conjunto/Catalogos";
import Users from "./components/Conjunto/Users";

import React, { useState, useEffect } from 'react';
const App = () => {
 

    return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      
      {/* 1. Navbar (Fijo a la izquierda) */}
      <Navbar usuario={"encargado"} />

      {/* 2. Columna derecha (Header + Contenido) */}
      <div className="flex-1 flex flex-col h-screen">
        
        {/* Tu Header va aquí arriba */}
        <Header />

        {/* El contenido cambiante (Catalogos) va aquí y ocupa el resto del espacio */}
        <main className="flex-1 overflow-auto">
           <Catalogos />
        </main>
        
      </div>
    </div>
  );
}

export default App;
