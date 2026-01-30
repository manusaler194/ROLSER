import iconoUsuario from '../assets/Navbar/usuario.svg'
import iconoAlmacen from '../assets/Navbar/almacen.svg'
import iconoCarrito from '../assets/Navbar/carrito.svg'
import iconoCatalogo from '../assets/Navbar/catalogo.svg'
import iconoDatos from '../assets/Navbar/datos.svg'
import iconoDescuento from '../assets/Navbar/descuento.svg'
import iconoEstadistica from '../assets/Navbar/estadistica.svg'
import iconoInforme from '../assets/Navbar/informe.svg'
import iconoPedido from '../assets/Navbar/pedido.svg'

const Navbar = ({usuario}) =>{
    const MENU_ITEMS = [
  { label: 'Gestionar usuarios', icon: iconoUsuario , rol: ['admin'] },
  { label: 'Crear catálogos', icon: iconoCatalogo , rol: ['admin'] },
  { label: 'Definir tarifas', icon: iconoInforme, rol: ['admin'] },
  { label: 'Gestionar pedidos', icon: iconoPedido , rol: ['admin', 'cliente', 'clientevip'] },
  { label: 'Gestionar almacén', icon: iconoAlmacen, rol: ['admin'] },
  { label: 'Estadísticas', icon: iconoEstadistica, rol: ['admin'] },
  { label: 'Ver facturas', icon: iconoInforme, rol: ['admin', 'cliente', 'clientevip'] },
];

const visibleItems = MENU_ITEMS.filter(item => item.rol.includes(usuario));
    return(
        <div className="w-55 bg-[#454545] min-h-screen flex flex-col border-gray-600">
      
            <nav className="flex flex-col">
                {visibleItems.map((item, index) => (
                <button key={index} className="flex items-center gap-4 p-5  text-gray-200 hover:bg-[#575757] border-b border-gray-600 cursor-pointer">
                    
                    <div className="w-6 h-6 flex items-center justify-center">
                        <img  src={item.icon} alt={item.label}  className="w-full h-full brightness-0 invert opacity-80 group-hover:opacity-100" />
                    </div>
                    <span className="text-sm font-light tracking-wide"> {item.label} </span>
                </button>
                ))}
            </nav>
    </div>
    )
}

export default Navbar;