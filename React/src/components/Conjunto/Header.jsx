import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import logo from "/src/assets/Header/logo.jpg";
import signout from "/src/assets/Header/SignOut.svg";

const Header = () => {
    const { logout } = useAuth(); 

    return (
        <div className="flex items-center justify-between px-4 sm:px-8 h-16 sm:h-20 w-full bg-[#454545] shadow-md z-10 relative">
            
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover"/>
                <h1 className="text-white text-xl sm:text-3xl font-bold tracking-wider">ROLSER</h1>
            </div>

            <Link to="/login" onClick={()=> logout()}>
                <img src={signout} alt="signout" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover cursor-pointer hover:opacity-90 transition-opacity"/>
            </Link>

        </div>
    );
};

export default Header;