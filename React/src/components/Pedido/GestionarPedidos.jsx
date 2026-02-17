import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Paginacion from '../Conjunto/Paginacion';
import { apiFetch } from "../../utils/api"; 

const GestionarPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const [abrirMenuAcciones, setAbrirMenuAcciones] = useState(null);
    const [abrirMenuCambioEstado, setAbrirMenuCambioEstado] = useState(null);
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [busquedaEncargado, setBusquedaEncargado] = useState('');

   const obtenerPedidos = async () => {
        try {
            const response = await apiFetch('http://localhost/api/pedidos');
            const data = await response.json();
            console.log(data);
            setPedidos(data.pedidos);
        } catch (err) {
            console.error("Error al cargar:", err);
        }
    };
    const pedidosFiltrados = pedidos.filter(pedido =>{
        const coincideEstado = filtro !== "Todos" ? pedido.estado === filtro : true;
        
        const tipoCliente = pedido.cliente_vip || pedido.cliente || pedido.comercial;
        const nombreCliente = tipoCliente.nombre.toLowerCase();
        const coincideNombre = nombreCliente.includes(busquedaCliente.toLowerCase());

        const nombreEncargado = pedido.encargado_almacen ? pedido.encargado_almacen.nombre.toLowerCase() : "";
        const coincideEncargado = nombreEncargado.includes(busquedaEncargado.toLowerCase());
        return coincideEstado && coincideNombre && coincideEncargado;
    })

    const handleEliminar = async (id) => {
        try {
            const response = await apiFetch(`http://localhost/api/pedidos/borrar/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setAbrirMenuAcciones(null);
                alert("Pedido eliminado");
                obtenerPedidos();
            } else {
                alert("No se pudo eliminar el pedido.");
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Ocurrió un error al eliminar.");
        }
    };

    const modificarEstado = async (pedido, nuevoEstado) => {
        console.log(pedido);
        try {
            const response = await apiFetch(`http://localhost/api/pedidos/actualizar/${pedido.id_pedido}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id_pedido: pedido.id_pedido,
                fecha_pedido: pedido.fecha_pedido,
                estado: nuevoEstado,
                id_comercial: pedido.id_comercial,
                id_cliente: pedido.id_cliente,
                id_clientevip: pedido.id_clientevip,
                id_encargado: pedido.id_encargado,
                id_factura: pedido.id_factura
            }),
            });
            setAbrirMenuCambioEstado(null);
            obtenerPedidos();

        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Hubo un error al modificar el pedido");
        }
    
    };
    useEffect(() => {
        obtenerPedidos();
    }, []);
  return (
    <div className="p-4 sm:p-8 flex flex-col gap-6 max-w-6xl mx-auto min-h-screen bg-gray-50">
        
        {/* Panel de Filtros Adaptable */}
        <div className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-[2rem] shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#bc002d] rounded-full"></span>
                Filtrar Pedidos
            </h2>
            
            <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-44">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Estado</label>
                    <select 
                        value={filtro} 
                        onChange={(e) => setFiltro(e.target.value)} 
                        className="w-full p-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-red-800 outline-none transition-all"
                    >
                        <option value="Todos">Todos</option>
                        <option value="En preparación">En preparación</option>
                        <option value="En proceso de entrega">En proceso de entrega</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-full sm:w-56">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Cliente</label>
                    <input 
                        type="text"
                        placeholder="Buscar cliente..."
                        value={busquedaCliente}
                        onChange={(e) => setBusquedaCliente(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-red-800 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full sm:w-56">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Encargado</label>
                    <input 
                        type="text"
                        placeholder="Buscar encargado..."
                        value={busquedaEncargado}
                        onChange={(e) => setBusquedaEncargado(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-red-800 outline-none transition-all"
                    />
                </div>

                <button 
                    onClick={() => {setFiltro('Todos'); setBusquedaCliente(''); setBusquedaEncargado('');}}
                    className="ml-auto text-xs text-gray-400 hover:text-[#bc002d] font-bold uppercase tracking-tighter transition-colors p-2"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>

        <div className="hidden lg:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-widest">
                        <th className="px-6 py-4 font-black">Cliente / Comercial</th>
                        <th className="px-6 py-4 font-black">Estado</th>
                        <th className="px-6 py-4 font-black">Encargado Almacén</th>
                        <th className="px-6 py-4 font-black text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {pedidosFiltrados.length > 0 ? (
                        pedidosFiltrados.map((pedido) => (
                            <tr key={pedido.id_pedido} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800">{pedido.cliente_vip?.nombre || pedido.cliente?.nombre}</span>
                                        {pedido.cliente_vip && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full w-fit font-black mt-1 uppercase">VIP</span>}
                                        {pedido.comercial && <span className="text-[10px] text-gray-400 mt-1">Comercial: {pedido.comercial.nombre}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 relative">
                                    <button 
                                        onClick={() => setAbrirMenuCambioEstado(abrirMenuCambioEstado === pedido.id_pedido ? null : pedido.id_pedido)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer transition-transform active:scale-95 ${
                                            pedido.estado === 'En preparación' ? 'bg-red-100 text-red-700' : 
                                            pedido.estado === 'En proceso de entrega' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                        }`}
                                    >
                                        {pedido.estado} ▼
                                    </button>
                                    {abrirMenuCambioEstado === pedido.id_pedido && (
                                        <div className="absolute left-6 mt-2 w-48 bg-white border border-gray-200 z-50 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                            {["En preparación", "En proceso de entrega", "Entregado"].map((est) => (
                                                <button 
                                                    key={est}
                                                    onClick={() => { modificarEstado(pedido, est); setAbrirMenuCambioEstado(null); }}
                                                    className="w-full px-4 py-2.5 text-xs text-left hover:bg-gray-50 text-gray-700 font-medium border-b border-gray-50 last:border-0"
                                                >
                                                    {est}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {pedido.encargado_almacen?.nombre || <span className="text-gray-400 italic">Administrador</span>}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button 
                                        onClick={() => setAbrirMenuAcciones(abrirMenuAcciones === pedido.id_pedido ? null : pedido.id_pedido)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-full font-bold transition-colors cursor-pointer"
                                    >
                                        •••
                                    </button>
                                    {abrirMenuAcciones === pedido.id_pedido && (
                                        <div className="absolute right-6 mt-2 w-40 bg-white border border-gray-200 z-50 shadow-2xl rounded-xl overflow-hidden">
                                            <Link to={`/DetallesPedido/${pedido.id_pedido}`} className="block px-4 py-3 text-xs hover:bg-gray-50 text-gray-700 font-bold border-b border-gray-50">Ver detalles</Link>
                                            <button onClick={() => handleEliminar(pedido.id_pedido)} className="w-full px-4 py-3 text-xs text-left hover:bg-red-50 text-red-600 font-bold">Eliminar</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" className="text-center py-10 text-gray-400">No hay pedidos registrados.</td></tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="lg:hidden space-y-4">
            {pedidosFiltrados.map((pedido) => (
                <div key={pedido.id_pedido} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                            <span className="font-black text-gray-900">{pedido.cliente_vip?.nombre || pedido.cliente?.nombre}</span>
                            {pedido.cliente_vip && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full w-fit font-black uppercase mt-1">VIP</span>}
                        </div>
                        <button 
                            onClick={() => setAbrirMenuAcciones(abrirMenuAcciones === pedido.id_pedido ? null : pedido.id_pedido)}
                            className="text-gray-400 p-1"
                        >
                            •••
                        </button>
                        {abrirMenuAcciones === pedido.id_pedido && (
                            <div className="absolute right-4 top-12 w-40 bg-white border border-gray-200 z-50 shadow-xl rounded-xl overflow-hidden">
                                <Link to={`/DetallesPedido/${pedido.id_pedido}`} className="block px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50">Ver detalles</Link>
                                <button onClick={() => handleEliminar(pedido.id_pedido)} className="w-full px-4 py-3 text-xs text-left font-bold text-red-600 hover:bg-red-50 border-t border-gray-50">Eliminar</button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-50">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-400 uppercase">Estado</span>
                            <button 
                                onClick={() => setAbrirMenuCambioEstado(abrirMenuCambioEstado === pedido.id_pedido ? null : pedido.id_pedido)}
                                className={`text-[10px] font-black uppercase px-2 py-1 rounded-full w-fit ${
                                    pedido.estado === 'En preparación' ? 'bg-red-100 text-red-700' : 
                                    pedido.estado === 'En proceso de entrega' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                }`}
                            >
                                {pedido.estado}
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 items-end text-right">
                            <span className="text-[10px] font-black text-gray-400 uppercase">Encargado</span>
                            <span className="text-xs font-bold text-gray-700 truncate w-full">
                                {pedido.encargado_almacen?.nombre || 'Admin'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default GestionarPedidos;