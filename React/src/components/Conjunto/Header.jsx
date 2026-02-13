<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> Manu-Rubio
import { useAuth } from '../../context/AuthContext'; 
import logo from "/src/assets/Header/logo.jpg";
// Puedes mantener tu icono de signout si quieres usarlo dentro del menú
import signout from "/src/assets/Header/SignOut.svg"; 

const Header = () => {
    const { logout } = useAuth(); 

    const navigate = useNavigate();
    
    
    
    




    // Estado para controlar si el desplegable está abierto o no
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);





    const handleLogout = (e) => {
        e.preventDefault();
        logout(); 
        navigate('/login');
    };


    const handleViewProfile = () => {
        setIsDropdownOpen(false); // Cerramos el menú
        navigate('/perfil'); // Ajusta esta ruta a la que uses para el perfil
    };

    return (
        <div className="flex items-center justify-between px-4 sm:px-8 h-16 sm:h-20 w-full bg-[#454545] shadow-md z-10 relative">
            
            {/* LOGO Y TÍTULO */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover"/>
                <h1 className="text-white text-xl sm:text-3xl font-bold tracking-wider">ROLSER</h1>
            </div>

<<<<<<< HEAD
            <Link to="/login" onClick={()=> logout()}>
                <img src={signout} alt="signout" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover cursor-pointer hover:opacity-90 transition-opacity"/>
            </Link>
=======
            {/* ZONA DEL PERFIL Y DESPLEGABLE */}
            <div className="relative">
                {/* Botón/Icono del perfil */}
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    title="Opciones de usuario"
                >
                    {/* SVG de un usuario genérico. Puedes cambiarlo por una etiqueta <img> si tienes un avatar */}
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Menú desplegable */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                        
                        <button 
                            onClick={handleViewProfile}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Ver perfil
                        </button>
                        
                        {/* Divisor opcional */}
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            {/* He incluido tu icono antiguo al lado del texto para aprovecharlo */}
                            <img src={signout} alt="Logout icon" className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </button>

                    </div>
                )}
            </div>
>>>>>>> Manu-Rubio

        </div>
    );
};

export default Header;