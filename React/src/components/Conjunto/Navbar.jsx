import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // <-- Importamos useLocation

import iconoUsuario from "/src/assets/Navbar/usuario.svg";
import iconoAlmacen from "/src/assets/Navbar/almacen.svg";
import iconoCarrito from "/src/assets/Navbar/carrito.svg";
import iconoCatalogo from "/src/assets/Navbar/catalogo.svg";
import iconoDatos from "/src/assets/Navbar/datos.svg";
import iconoDescuento from "/src/assets/Navbar/descuento.svg";
import iconoEstadistica from "/src/assets/Navbar/estadistica.svg";
import iconoInforme from "/src/assets/Navbar/informe.svg";
import iconoPedido from "/src/assets/Navbar/pedido.svg";

const Navbar = ({ usuario }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation(); // <-- Obtenemos la ruta actual

  const menu = [
      { label: 'Gestionar usuarios', icon: iconoUsuario , rol: ['admin'], path: '/usuarios' },
      { label: 'Crear catálogos', icon: iconoCatalogo , rol: ['admin'], path: '/crear-catalogo' },
      { label: 'Gestionar pedidos', icon: iconoPedido , rol: ['admin', 'encargadoalmacen', 'cliente', 'clientevip', 'comercial'], path: '/pedidos' },
      { label: 'Gestionar almacén', icon: iconoAlmacen, rol: ['admin', 'encargadoalmacen'], path: '/GestionAlmacen' },
      { label: 'Ver facturas', icon: iconoInforme, rol: ['comercial', 'cliente', 'clientevip'], path: '/facturas' },
      { label: 'Ver catálogo', icon: iconoCatalogo, rol: ['clientevip', 'comercial', 'cliente', 'admin'], path: '/catalogo' },
      { label: 'Stock', icon: iconoCarrito, rol: ['encargadoalmacen'], path: '/stock' },
      { label: 'Crear pedido reabastecimiento', icon: iconoPedido, rol: ['encargadoalmacen', 'admin'], path: '/crear-pedido-reabastecimiento' },
  ];

  const individual = menu.filter(item => item.rol.includes(usuario));

  return (
    <>
      {/* Botón flotante para móvil */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#454545] text-white p-4 rounded-full shadow-2xl focus:outline-none hover:bg-gray-700 transition-colors"
      >
        {menuAbierto ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Menú lateral */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#454545] transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        ${menuAbierto ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:min-h-screen border-r border-gray-600
      `}>
        <nav className="h-full overflow-y-auto pt-8 pb-24 md:pt-0 md:pb-0 flex flex-col">
          {individual.map((item, index) => {
            // Comprobamos si la ruta actual coincide con la ruta del botón
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMenuAbierto(false)} 
                className={`
                  flex items-center gap-5 p-5 md:px-6 md:py-6 border-b border-gray-600 transition-all w-full
                  ${isActive 
                    ? 'bg-[#bc002d] text-white border-l-4 border-l-white' // Estilos si está activo (Fondo rojo, borde blanco)
                    : 'text-gray-300 hover:bg-[#575757] hover:text-white border-l-4 border-l-transparent' // Estilos inactivos
                  }
                `}
              >
                {/* Icono más grande (w-8 h-8 en lugar de w-6 h-6) */}
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <img 
                    src={item.icon}  
                    alt={item.label}
                    className={`w-full h-full brightness-0 invert transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`} 
                  />
                </div>
                {/* Letra más grande (text-base md:text-lg) y negrita si está activo */}
                <span className={`text-base md:text-lg ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Fondo oscuro para móvil cuando el menú está abierto */}
      {menuAbierto && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;