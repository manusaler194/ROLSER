import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const GestionarPedidos = () => {
    const { user, role } = useAuth(); // Extraemos user y role del contexto
    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [busquedaEncargado, setBusquedaEncargado] = useState('');
    const [abrirMenuCambioEstado, setAbrirMenuCambioEstado] = useState(null);

    // --- NORMALIZACIÓN DE ROLES (Basado en tus rutas de App.js) ---
    const isAdmin = role === 'admin';
    const isEncargado = role === 'encargadoalmacen'; 
    const isComercial = role === 'comercial';
    const isVIP = role === 'clientevip';
    const isClienteNormal = role === 'cliente';
    const isClienteAny = isVIP || isClienteNormal;

    const obtenerPedidos = async () => {
        try {
            const response = await apiFetch('http://localhost/api/pedidos');
            const data = await response.json();
            let lista = data.pedidos || [];

            // --- FILTRADO DE SEGURIDAD SEGÚN ROL ---
            if (isClienteAny) {
                // Filtramos por el ID del cliente o cliente VIP que está logueado
                lista = lista.filter(p => 
                    (p.id_cliente && Number(p.id_cliente) === Number(user?.id_cliente)) || 
                    (p.id_clientevip && Number(p.id_clientevip) === Number(user?.id_clientevip))
                );
            } else if (isComercial) {
                // Filtramos por el ID del comercial logueado
                lista = lista.filter(p => Number(p.id_comercial) === Number(user?.id_comercial));
            } else if (isEncargado) {
                // Filtramos por el ID del encargado logueado
                lista = lista.filter(p => Number(p.id_encargado) === Number(user?.id_encargado));
            }
            // El admin no filtra, lo ve todo.

            setPedidos(lista);
        } catch (err) {
            console.error("Error al cargar pedidos:", err);
        }
    };

    useEffect(() => { 
        if (user && role) {
            obtenerPedidos(); 
        }
    }, [user, role]);

    // --- LÓGICA DE BÚSQUEDA EN LA TABLA ---
    const pedidosFiltrados = pedidos.filter(pedido => {
        const coincideEstado = filtro === "Todos" || pedido.estado === filtro;
        
        const nombreCliente = (pedido.cliente?.nombre || pedido.cliente_vip?.nombre || "").toLowerCase();
        const coincideCliente = nombreCliente.includes(busquedaCliente.toLowerCase());

        const nombreEncargado = (pedido.encargado_almacen?.nombre || "").toLowerCase();
        const coincideEncargado = nombreEncargado.includes(busquedaEncargado.toLowerCase());

        return coincideEstado && coincideCliente && coincideEncargado;
    });

    const modificarEstado = async (pedido, nuevoEstado) => {
        try {
            const response = await apiFetch(`http://localhost/api/pedidos/actualizar/${pedido.id_pedido}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    ...pedido, 
                    estado: nuevoEstado 
                }),
            });
            if(response.ok) {
                setAbrirMenuCambioEstado(null);
                obtenerPedidos();
            }
        } catch (error) {
            console.error("Error al modificar estado:", error);
        }
    };

    return (
        <div className="p-4 sm:p-8 flex flex-col gap-6 max-w-6xl mx-auto min-h-screen bg-gray-50">
            
            {/* CABECERA Y FILTROS */}
            <div className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-4xl shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-5 bg-[#bc002d] rounded-full"></span>
                        Gestión de Pedidos
                    </h2>
                    {isVIP && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-black uppercase tracking-widest">Panel VIP</span>}
                </div>
                
                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-1 w-full sm:w-44">
                        <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Estado</label>
                        <select 
                            value={filtro} 
                            onChange={(e) => setFiltro(e.target.value)} 
                            className="w-full p-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-red-800"
                        >
                            <option value="Todos">Todos los estados</option>
                            <option value="En preparación">En preparación</option>
                            <option value="En proceso de entrega">En proceso de entrega</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                    </div>

                    {!isClienteAny && (
                        <div className="flex flex-col gap-1 w-full sm:w-56">
                            <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Buscar Cliente</label>
                            <input 
                                type="text" 
                                placeholder="Nombre del cliente..." 
                                value={busquedaCliente} 
                                onChange={(e) => setBusquedaCliente(e.target.value)} 
                                className="w-full p-2.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-red-800 outline-none" 
                            />
                        </div>
                    )}

                    {isAdmin && (
                        <div className="flex flex-col gap-1 w-full sm:w-56">
                            <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Buscar Encargado</label>
                            <input 
                                type="text" 
                                placeholder="Nombre del encargado..." 
                                value={busquedaEncargado} 
                                onChange={(e) => setBusquedaEncargado(e.target.value)} 
                                className="w-full p-2.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-red-800 outline-none" 
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* TABLA DE PEDIDOS */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-widest border-b border-gray-200">
                            <th className="px-6 py-4 font-black">ID Pedido</th>
                            {!isClienteAny && <th className="px-6 py-4 font-black">Cliente</th>}
                            <th className="px-6 py-4 font-black">Estado Actual</th>
                            {isAdmin && <th className="px-6 py-4 font-black">Encargado Asignado</th>}
                            <th className="px-6 py-4 text-right font-black">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {pedidosFiltrados.length > 0 ? (
                            pedidosFiltrados.map((pedido) => (
                                <tr key={pedido.id_pedido} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        #{pedido.id_pedido}
                                    </td>
                                    {!isClienteAny && (
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{pedido.cliente?.nombre || pedido.cliente_vip?.nombre}</span>
                                                {pedido.cliente_vip && <span className="text-[8px] bg-yellow-400 text-white px-1.5 py-0.5 rounded font-black uppercase">VIP</span>}
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        {(isAdmin || isEncargado) ? (
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setAbrirMenuCambioEstado(abrirMenuCambioEstado === pedido.id_pedido ? null : pedido.id_pedido)}
                                                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border transition-all ${
                                                        pedido.estado === 'Entregado' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                        pedido.estado === 'En preparación' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                                                    }`}
                                                >
                                                    {pedido.estado} <span className="ml-1 opacity-50">▼</span>
                                                </button>
                                                {abrirMenuCambioEstado === pedido.id_pedido && (
                                                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 z-50 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1">
                                                        {["En preparación", "En proceso de entrega", "Entregado"].map(est => (
                                                            <button 
                                                                key={est} 
                                                                onClick={() => modificarEstado(pedido, est)} 
                                                                className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-red-50 hover:text-[#bc002d] border-b last:border-0"
                                                            >
                                                                {est}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                                                {pedido.estado}
                                            </span>
                                        )}
                                    </td>
                                    {isAdmin && <td className="px-6 py-4 text-gray-600">{pedido.encargado_almacen?.nombre || "No asignado"}</td>}
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            to={`/DetallesPedido/${pedido.id_pedido}`} 
                                            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all shadow-sm ${
                                                isVIP ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-[#bc002d] hover:bg-red-800 text-white'
                                            }`}
                                        >
                                            Ver Detalles
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isAdmin ? "5" : "4"} className="text-center py-16 text-gray-400 italic bg-white">
                                    No se encontraron pedidos que coincidan con los filtros.
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