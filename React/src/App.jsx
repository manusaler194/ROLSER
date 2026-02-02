import Header from "./components/Conjunto/Header"
import Navbar from "./components/Conjunto/Navbar"
import React from 'react';

const App = () => {
 
    return(
        <div>
            <Header></Header>

            <Navbar usuario = "admin"></Navbar>
        </div>
        
    )
}
export default App
