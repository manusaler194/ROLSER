import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import logo from "/src/assets/Header/logo.jpg";
import signout from "/src/assets/Header/SignOut.svg";

const Header = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout(); 
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-between px-4 sm:px-8 h-16 sm:h-20 w-full bg-[#454545] shadow-md z-10 relative">
            
            <div className="flex items-center gap-3">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover"
                />
                <h1 className="text-white text-xl sm:text-3xl font-bold tracking-wider">
                    ROLSER
                </h1>
            </div>

            <button 
                onClick={handleLogout} 
                className="hover:opacity-80 transition-opacity outline-none"
                title="Cerrar Sesión"
            >
                <img 
                    src={signout} 
                    alt="Logout" 
                    className="cursor-pointer h-8 w-8 sm:h-10 sm:w-10"
                />
            </button>

        </div>
    );
};

export default Header;