import logo from "/src/assets/Header/logo.jpg";
import signout from "/src/assets/Header/SignOut.svg";
import React from 'react';
const Header = () =>{
return(
<div className="flex items-center gap-2.5 h-50 w-full bg-[#454545]">

    <img src={logo} alt="Logo" height={50} width={50} className="m-2.5 rounded-[60%] h-17 w-17"/>
    
    <h1 className="text-white text-3xl">ROLSER</h1>
    <a href="" className="ml-auto mr-7.5">
        <img src={signout} alt="Logout" className="cursor-pointer h-15 w-15"/>
    </a>
 </div>
)
}
export default Header;