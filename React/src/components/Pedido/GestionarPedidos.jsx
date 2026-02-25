import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";
import Paginacion from "../Conjunto/Paginacion";

const GestionarPedido = () => {
    const { user, role } = useAuth();

    const [listaPedidos, setListaPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [menuCambioEstadoAbierto, setMenuCambioEstadoAbierto] = useState(null);
    
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 10;

    const esAdmin = role === 'admin';
    const esEncargado = role === 'encargadoalmacen'; 
    const esComercial = role === 'comercial';
    const esClienteVIP = role === 'clientevip';
    const esClienteNormal = role === 'cliente';

    const esCliente = esClienteVIP || esClienteNormal;
    const esPrivilegiado = esAdmin || esEncargado;

    const obtenerPedidos = async () => {
        try {
            const response = await apiFetch('http://localhost/api/pedidos');
            const data = await response.json();
            let pedidos = data.pedidos;

            if (esCliente) {
                pedidos = pedidos.filter(p => 
                    (p.id_cliente && p.id_cliente == user?.id_cliente) || (p.id_clientevip && p.id_clientevip == user?.id_clientevip));
            } 
            else if (esComercial) {
                pedidos = pedidos.filter(p => 
                    p.id_comercial === user?.id_comercial
                );
            } 
            else if (esEncargado) {
                pedidos = pedidos.filter(p => 
                    p.id_encargado === user?.id_encargado
                );
            }

            setListaPedidos(pedidos);
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
        }
    };

    useEffect(() => { 
        if (user && role) {
            obtenerPedidos(); 
        }
    }, [user, role]);

    const pedidosFiltrados = listaPedidos.filter(pedido => {
        const coincideEstado = filtroEstado === "Todos" || pedido.estado === filtroEstado;
        const nombreCliente = (pedido.cliente?.nombre || pedido.cliente_vip?.nombre || "").toLowerCase();
        const coincideCliente = nombreCliente.includes(busquedaCliente.toLowerCase());
        return coincideEstado && coincideCliente;
    });

    const ultimoIndex = paginaActual * registrosPorPagina;
    const primerIndex = ultimoIndex - registrosPorPagina;
    const pedidosPaginados = pedidosFiltrados.slice(primerIndex, ultimoIndex);
    const totalPaginas = Math.ceil(pedidosFiltrados.length / registrosPorPagina);

    useEffect(() => {
        setPaginaActual(1);
    }, [filtroEstado, busquedaCliente]);

    const modificarEstadoPedido = async (pedido, nuevoEstado) => {
        try {
            const respuesta = await apiFetch(
                `http://localhost/api/pedidos/actualizar/${pedido.id_pedido}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...pedido, estado: nuevoEstado }),
                }
            );

            if (respuesta.ok) {
                setMenuCambioEstadoAbierto(null);
                obtenerPedidos();
            }
        } catch (error) {
            console.error("Error al modificar estado:", error);
        }
    };

   return (
    <div className="p-4 md:p-8 flex flex-col gap-6 max-w-6xl mx-auto min-h-screen bg-gray-50">

        <div className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h2>
                {esClienteVIP && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-black uppercase">Panel VIP</span>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-48">
                    <label className="text-sm font-black text-gray-400 uppercase ml-2 tracking-wider">Estado</label>
                    <select 
                        value={filtroEstado} 
                        onChange={(e) => setFiltroEstado(e.target.value)} 
                        className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                        <option value="Todos">Todos</option>
                        <option value="En preparación">En preparación</option>
                        <option value="En proceso de entrega">En proceso de entrega</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>

                {!esCliente && (
                    <div className="flex flex-col gap-1 w-full sm:flex-1">
                        <label className="text-sm font-black text-gray-400 uppercase ml-2 tracking-wider">Buscar Cliente</label>
                        <input 
                            type="text" 
                            value={busquedaCliente} 
                            onChange={(e) => setBusquedaCliente(e.target.value)} 
                            placeholder="Nombre del cliente..."
                            className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                )}
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="hidden md:table-header-group bg-gray-50 border-b border-gray-100">
                    <tr className="text-gray-500 text-md uppercase tracking-widest">
                        <th className="px-6 py-4">ID Pedido</th>
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Estado</th>
                        <th className="px-6 py-4">Encargado</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-md">

    {pedidosPaginados.map(pedido => (
        <tr key={pedido.id_pedido} className="flex flex-col md:table-row hover:bg-gray-50 transition-colors p-4 md:p-0 border-b md:border-none">
            
            <td className="px-6 py-1 md:py-4 font-bold md:table-cell flex justify-between items-center">
                <span className="md:hidden text-[10px] font-black text-gray-400 uppercase">ID Pedido</span>
                <span>#{pedido.id_pedido}</span>
            </td>

            <td className="px-6 py-1 md:py-4 md:table-cell flex justify-between items-center">
                <span className="md:hidden text-[10px] font-black text-gray-400 uppercase">Cliente</span>
                <span className="text-gray-700 text-right md:text-left">
                    {pedido.cliente?.nombre || pedido.cliente_vip?.nombre || "N/A"}
                </span>
            </td>

            <td className="px-6 py-1 md:py-4 md:table-cell flex justify-between items-center relative">
                <span className="md:hidden text-[10px] font-black text-gray-400 uppercase">Estado</span>
                {esPrivilegiado ? (
                    <div className="relative inline-block text-left">
                        <button 
                            onClick={() => setMenuCambioEstadoAbierto(menuCambioEstadoAbierto === pedido.id_pedido ? null : pedido.id_pedido)}
                            className="px-3 py-1.5 rounded-full border border-gray-300 text-xs bg-white hover:bg-gray-100 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                            {pedido.estado}
                        </button>

                        {menuCambioEstadoAbierto === pedido.id_pedido && (
                            <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 right-0 md:left-0">
                                <div className="py-1">
                                    {['En preparación', 'En proceso de entrega', 'Entregado'].map((estadoOpcion) => (
                                        <button
                                            key={estadoOpcion}
                                            onClick={() => modificarEstadoPedido(pedido, estadoOpcion)}
                                            className={`w-full text-left block px-4 py-2 text-sm ${pedido.estado === estadoOpcion ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {estadoOpcion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="px-3 py-1.5 rounded-full border text-xs bg-gray-50 text-gray-600 inline-block">{pedido.estado}</span>
                )}
            </td>

            <td className="px-6 py-1 md:py-4 md:table-cell flex justify-between items-center">
                <span className="md:hidden text-[10px] font-black text-gray-400 uppercase">Encargado</span>
                <span className="text-gray-500 text-right md:text-left">
                    {pedido.encargado_almacen?.nombre || "Sin asignar"}
                </span>
            </td>

            <td className="px-6 py-3 md:py-4 text-right md:table-cell flex justify-center border-t border-gray-50 mt-2 md:mt-0 md:border-none">
                <Link 
                    to={`/DetallesPedido/${pedido.id_pedido}`}
                    className="w-full md:w-auto text-center bg-red-50 md:bg-transparent text-red-600 hover:text-red-800 font-bold text-xs py-2 md:py-0 rounded-lg transition-colors uppercase tracking-widest"
                >
                    Ver Detalles
                </Link>
            </td>
        </tr>
    ))}
</tbody>
            </table>
        </div>

        {totalPaginas > 1 && (
           <div className="mt-2 flex justify-center">
             <Paginacion 
               paginaActual={paginaActual} 
               totalPaginas={totalPaginas} 
               cambiarPagina={setPaginaActual} 
             />
           </div>
        )}
    </div>
);
};

export default GestionarPedido;