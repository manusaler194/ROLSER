import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const GestionarPedidos = () => {
    const { user, role } = useAuth();

    const [listaPedidos, setListaPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [menuCambioEstadoAbierto, setMenuCambioEstadoAbierto] = useState(null);

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
            console.log(data)
            let pedidos = data.pedidos || [];

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
        
        const nombreCliente = (pedido.cliente?.nombre || pedido.cliente_vip?.nombre).toLowerCase();
        const coincideCliente = nombreCliente.includes(busquedaCliente.toLowerCase());

        return coincideEstado && coincideCliente;
    });

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
        <div className="p-4 sm:p-8 flex flex-col gap-6 max-w-6xl mx-auto min-h-screen bg-gray-50">

            <div className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-4xl shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">
                        Gestión de Pedidos
                    </h2>

                    {esClienteVIP && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-black uppercase">Panel VIP</span>
                    )}
                </div>

                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-1 w-full sm:w-44">
                        <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Estado</label>

                        <select 
                            value={filtroEstado} 
                            onChange={(e) => setFiltroEstado(e.target.value)} 
                            className="w-full p-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <option value="Todos">Todos</option>
                            <option value="En preparación">En preparación</option>
                            <option value="En proceso de entrega">En proceso de entrega</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                    </div>

                    {!esCliente && (
                        <div className="flex flex-col gap-1 w-full sm:w-56">
                            <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Buscar Cliente</label>

                            <input 
                                type="text" 
                                value={busquedaCliente} 
                                onChange={(e) => setBusquedaCliente(e.target.value)} 
                                placeholder="Nombre del cliente..."
                                className="w-full p-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden pb-16">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-[10px] uppercase">
                            <th className="px-6 py-4">ID Pedido</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Estado</th>
                            <th>Encargado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 text-sm">
                        {pedidosFiltrados.map(pedido => (
                            <tr key={pedido.id_pedido} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold">
                                    #{pedido.id_pedido}
                                </td>
                                <td className="px-6 py-4">
                                    {pedido.cliente?.nombre || pedido.cliente_vip?.nombre}
                                </td>
                                <td className="px-6 py-4 relative">
                                    {esPrivilegiado ? (
                                        <div className="relative inline-block text-left">
                                            <button 
                                                onClick={() =>
                                                    setMenuCambioEstadoAbierto(
                                                        menuCambioEstadoAbierto === pedido.id_pedido
                                                            ? null
                                                            : pedido.id_pedido
                                                    )
                                                }
                                                className="px-3 py-1.5 rounded-full border border-gray-300 text-xs bg-white hover:bg-gray-100 flex items-center gap-2 cursor-pointer transition-colors"
                                            >
                                                {pedido.estado}
                                            </button>

                                            {menuCambioEstadoAbierto === pedido.id_pedido && (
                                                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-0">
                                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                                        {['En preparación', 'En proceso de entrega', 'Entregado'].map((estadoOpcion) => (
                                                            <button
                                                                key={estadoOpcion}
                                                                onClick={() => modificarEstadoPedido(pedido, estadoOpcion)}
                                                                className={`w-full text-left block px-4 py-2 text-sm ${pedido.estado === estadoOpcion ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                role="menuitem"
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
                                    <td className="px-6 py-4">{pedido.encargado_almacen.nombre}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link 
                                        to={`/DetallesPedido/${pedido.id_pedido}`}
                                        className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                                    >
                                        Ver Detalles
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {pedidosFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={esCliente ? 3 : 4} className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron pedidos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionarPedidos;