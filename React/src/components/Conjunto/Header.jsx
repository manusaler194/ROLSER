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
        <div className="flex items-center gap-2.5 h-30 w-full bg-[#454545]">
            <img src={logo} alt="Logo" height={50} width={50} className="m-2.5 rounded-[60%] h-17 w-17"/>
            
            <h1 className="text-white text-3xl font-bold">ROLSER</h1>

            <button onClick={handleLogout} className="ml-auto mr-7.5 hover:opacity-80 transition-opacity outline-none"title="Cerrar Sesión">
                <img src={signout} alt="Logout" className="cursor-pointer h-15 w-15"/>
            </button>
        </div>
    );
};

export default Header;