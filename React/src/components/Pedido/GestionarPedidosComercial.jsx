import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const GestionarPedidosComercial = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const { user } = useAuth(); 

    const obtenerPedidos = async () => {
        try {
            const response = await apiFetch('http://localhost/api/pedidos');
            const data = await response.json();
            const misPedidos = data.pedidos.filter(p => 
                p.id_comercial === user.id_comercial
            );
            setPedidos(misPedidos);
        } catch (err) {
            console.error("Error al cargar pedidos:", err);
        }
    };

    const pedidosFiltrados = pedidos.filter(pedido => {
        const coincideEstado = filtro === 'Todos' || pedido.estado === filtro;

        return coincideEstado;
    });

    useEffect(() => {
        obtenerPedidos();
    }, []);

    return (
        <div className="p-4 sm:p-8 flex flex-col gap-6 max-w-6xl mx-auto min-h-screen bg-gray-50">
            
            <div className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-4xl shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-5 bg-[#bc002d] rounded-full"></span>
                        Mis Pedidos
                    </h2>
                   
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                            Comercial
                        </span>
                    
                </div>
                
                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-1 w-full sm:w-44">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Filtrar por Estado</label>
                        <select 
                            value={filtro} 
                            onChange={(e) => setFiltro(e.target.value)} 
                            className="w-full p-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-red-800 outline-none transition-all"
                        >
                            <option value="Todos">Todos los estados</option>
                            <option value="En preparación">En preparación</option>
                            <option value="En proceso de entrega">En proceso de entrega</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                    </div>

                    <button 
                        onClick={() => {setFiltro('Todos');}}
                        className="ml-auto text-xs text-gray-400 hover:text-[#bc002d] font-bold uppercase tracking-tighter transition-colors p-2 underline"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>

            <div className="hidden lg:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-widest">
                            <th className="px-6 py-4 font-black">Nº Pedido</th>
                            <th className="px-6 py-4 font-black">Fecha</th>
                            <th className="px-6 py-4 font-black">Estado Actual</th>
                            <th className="px-6 py-4 font-black text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pedidosFiltrados.length > 0 ? (
                            pedidosFiltrados.map((pedido) => (
                                <tr key={pedido.id_pedido} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">#{pedido.id_pedido}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{pedido.fecha_pedido}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm ${
                                            pedido.estado === 'En preparación' ? 'bg-red-50 text-red-600 border border-red-100' : 
                                            pedido.estado === 'En proceso de entrega' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                                            'bg-green-50 text-green-600 border border-green-100'
                                        }`}>
                                            {pedido.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            to={`/DetallesPedido/${pedido.id_pedido}`} 
                                            className="inline-block bg-[#bc002d] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm"
                                        >
                                            Ver Detalles
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="text-center py-10 text-gray-400 italic">No tienes pedidos que coincidan con el filtro.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-4">
                {pedidosFiltrados.map((pedido) => (
                    <div key={pedido.id_pedido} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-black text-gray-900 leading-tight">Pedido #{pedido.id_pedido}</span>
                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                                pedido.estado === 'En preparación' ? 'bg-red-50 text-red-600' : 
                                pedido.estado === 'En proceso de entrega' ? 'bg-orange-50 text-orange-600' : 
                                'bg-green-50 text-green-600'
                            }`}>
                                {pedido.estado}
                            </span>
                        </div>

                        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fecha Realizado</span>
                                <span className="text-xs font-bold text-gray-700">{pedido.fecha_pedido}</span>
                            </div>
                            <Link 
                                to={`/DetallesPedido/comercial/${pedido.id_pedido}`} 
                                className="bg-[#bc002d] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all active:scale-95"
                            >
                                Ver Todo
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GestionarPedidosComercial;