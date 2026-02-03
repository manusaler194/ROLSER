import iconoUsuario from "/src/assets/Navbar/usuario.svg";
import iconoAlmacen from "/src/assets/Navbar/almacen.svg";
import iconoCarrito from "/src/assets/Navbar/carrito.svg";
import iconoCatalogo from "/src/assets/Navbar/catalogo.svg";
import iconoDatos from "/src/assets/Navbar/datos.svg";
import iconoDescuento from "/src/assets/Navbar/descuento.svg";
import iconoEstadistica from "/src/assets/Navbar/estadistica.svg";
import iconoInforme from "/src/assets/Navbar/informe.svg";
import iconoPedido from "/src/assets/Navbar/pedido.svg";
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({usuario}) => {
    const menu = [
        { label: 'Gestionar usuarios', icon: iconoUsuario , rol: ['admin'], path: '/usuarios' },
        { label: 'Crear catálogos', icon: iconoCatalogo , rol: ['admin'], path: '/catalogos' },
        { label: 'Definir tarifas', icon: iconoInforme, rol: ['admin'], path: '/tarifas' },
        { label: 'Gestionar pedidos', icon: iconoPedido , rol: ['admin', 'cliente', 'clientevip', 'comercial','encargado_almacen'], path: '/pedidos' },
        { label: 'Gestionar almacén', icon: iconoAlmacen, rol: ['admin','encargado_almacen'], path: '/GestionAlmacen' },
        { label: 'Estadísticas', icon: iconoEstadistica, rol: ['admin'], path: '/estadisticas' },
        { label: 'Ver facturas', icon: iconoInforme, rol: ['admin', 'cliente', 'clientevip'], path: '/facturas' },
        { label: 'Ver catálogo', icon: iconoCatalogo, rol: ['clientevip', 'comercial'], path: '/catalogo' },
        { label: 'Realizar pedido', icon: iconoCarrito, rol: ['clientevip', 'comercial'], path: '/realizar-pedido' },
        { label: 'Aplicar descuento', icon: iconoDescuento, rol: ['comercial'], path: '/aplicar-descuento' },
        { label: 'Solicitar bajas,altas..', icon: iconoDatos, rol: ['clientevip', 'comercial'], path: '/solicitar-bajas-altas' },
        { label: 'Stock', icon: iconoCarrito, rol: ['encargado_almacen'], path: '/stock' },
        { label: 'Crear pedido', icon: iconoPedido, rol: ['encargado_almacen'], path: '/crear-pedido' },
    ];

const individual = menu.filter(item => item.rol.includes(usuario));
    return (
    <div className="w-64 bg-[#454545] min-h-screen border-gray-600">
      <nav>
        {individual.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 p-5 text-gray-200 hover:bg-[#575757] border-b border-gray-600"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img 
                src={item.icon}  
                className="w-full h-full brightness-0 invert opacity-80" 
              />
            </div>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;