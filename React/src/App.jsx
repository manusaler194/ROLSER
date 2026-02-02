import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"
import Personas from "./components/Conjunto/Users";
import React, { useState, useEffect } from 'react';
const App = () => {
 

    return(
        <div>
            <Header></Header>

        <Navbar usuario = "admin"></Navbar>
          <h1>Lista de Administradores</h1>
          <Personas/>
        </div>
        
    )
}
export default App
