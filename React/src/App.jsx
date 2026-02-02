import GestionUsuarios from "./components/Conjunto/GestionUsuarios";
import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"

import Users from "./components/Conjunto/Users";

import React, { useState, useEffect } from 'react';
const App = () => {
 

    return(
        <div>
            <Header></Header>

        <Navbar usuario = "admin"></Navbar>
          <h1>Lista de Administradores</h1>
          <GestionUsuarios></GestionUsuarios>
        </div>
        
    )
}
export default App
