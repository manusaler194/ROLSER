import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const menu = [
      { label: 'Gestionar usuarios', icon: iconoUsuario , rol: ['admin'], path: '/usuarios' },
      { label: 'Crear catálogos', icon: iconoCatalogo , rol: ['admin'], path: '/crear-catalogo' },
      { label: 'Definir tarifas', icon: iconoInforme, rol: ['admin'], path: '/tarifas' },
      { label: 'Gestionar pedidos', icon: iconoPedido , rol: ['admin'], path: '/pedidos' },
      { label: 'Gestionar pedidos', icon: iconoPedido , rol: ['encargado_almacen'], path: '/pedidos/encargado' },      
      { label: 'Gestionar pedidos realizados', icon: iconoPedido , rol: ['cliente', 'clientevip', 'comercial'], path: '/pedidosRealizados' },
      { label: 'Gestionar almacén', icon: iconoAlmacen, rol: ['encargado_almacen'], path: '/GestionAlmacenEncargado'},
      { label: 'Gestionar almacén', icon: iconoAlmacen, rol: ['admin'], path: '/GestionAlmacen' },
      { label: 'Estadísticas', icon: iconoEstadistica, rol: ['admin'], path: '/estadisticas' },
      { label: 'Ver facturas', icon: iconoInforme, rol: ['admin', 'cliente', 'clientevip','admin'], path: '/facturas' },
      { label: 'Ver catálogo', icon: iconoCatalogo, rol: ['clientevip', 'comercial'], path: '/catalogo' },
      { label: 'Ver catálogos', icon: iconoCatalogo, rol: ['admin'], path: '/catalogos' },
      { label: 'Realizar pedido', icon: iconoCarrito, rol: ['clientevip', 'comercial'], path: '/realizar-pedido' },
      { label: 'Aplicar descuento', icon: iconoDescuento, rol: ['comercial'], path: '/aplicar-descuento' },
      { label: 'Solicitar bajas,altas..', icon: iconoDatos, rol: ['clientevip', 'comercial'], path: '/solicitar-bajas-altas' },
      { label: 'Stock', icon: iconoCarrito, rol: ['encargado_almacen'], path: '/stock' },
      { label: 'Crear pedido reabastecimiento', icon: iconoPedido, rol: ['encargado_almacen', 'admin'], path: '/crear-pedido-reabastecimiento' },
  ];

  const individual = menu.filter(item => item.rol.includes(usuario));

  return (
    <>
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

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#454545] transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        ${menuAbierto ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:min-h-screen border-r border-gray-600
      `}>
        <nav className="h-full overflow-y-auto pt-8 pb-24 md:pt-0 md:pb-0">
          {individual.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMenuAbierto(false)} 
              className="flex items-center gap-4 p-4 md:p-5 text-gray-200 hover:bg-[#575757] border-b border-gray-600 transition-colors w-full"
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <img 
                  src={item.icon}  
                  alt={item.label}
                  className="w-full h-full brightness-0 invert opacity-80" 
                />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* FONDO OSCURO (Solo móvil): Si el menú está abierto, oscurece el fondo para centrar la atención en el menú */}
      {menuAbierto && (
        <div 
          className="md:hidden fixed inset-0 bg-opacity-50 z-30 transition-opacity"
          onClick={() => setMenuAbierto(false)} // Cierra el menú si el usuario toca fuera de él
        ></div>
      )}
    </>
  );
}

export default Navbar;