import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const GestionarPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const [abrirMenu, setAbrirMenu] = useState(null);
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [busquedaEncargado, setBusquedaEncargado] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        obtenerPedidos();
    }, []);

   const obtenerPedidos = async () => {
    try {
        const response = await fetch('http://localhost/api/pedidos');
        const data = await response.json();
        console.log(data);
        setPedidos(data.pedidos || []);
    } catch (err) {
        console.error("Error al cargar:", err);
    }
};
    const pedidosFiltrados = pedidos.filter(pedido =>{
        const coincideEstado = filtro !== "Todos" ? pedido.estado === filtro : true;
        
        const tipoCliente = pedido.cliente_vip || pedido.cliente || pedido.comercial;
        const nombreCliente = tipoCliente ? tipoCliente.nombre.toLowerCase() : "";
        const coincideNombre = nombreCliente.includes(busquedaCliente.toLowerCase());

        const nombreEncargado = pedido.encargado_almacen ? pedido.encargado_almacen.nombre.toLowerCase() : "";
        const coincideEncargado = nombreEncargado.includes(busquedaEncargado.toLowerCase());
        return coincideEstado && coincideNombre && coincideEncargado;
    })

    const handleEliminar = async (id) => {
    try {
        const response = await fetch(`http://localhost/api/pedidos/borrar/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setAbrirMenu(null);
            alert("Pedido eliminado");
            obtenerPedidos();
        } else {
            alert("No se pudo eliminar el pedido.");
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error de red al intentar eliminar.");
    }
  };
    return (
        <div className="p-8 flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-row flex-wrap items-end gap-4 bg-gray-50 p-4 border border-gray-200 rounded-lg">
            
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Estado:</label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-44 p-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-red-800 outline-none">
                    <option value="Todos">Todos</option>
                    <option value="En preparación">En preparación</option>
                    <option value="En proceso de entrega">En proceso de entrega</option>
                    <option value="Entregado">Entregado</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Cliente:</label>
                <input type="text"placeholder="Buscar cliente..."value={busquedaCliente}onChange={(e) => setBusquedaCliente(e.target.value)}className="w-56 p-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-red-800 outline-none"/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Encargado:</label>
                <input type="text"placeholder="Buscar encargado..."value={busquedaEncargado}onChange={(e) => setBusquedaEncargado(e.target.value)}className="w-56 p-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-red-800 outline-none"/>
            </div>

            <button onClick={() => {setFiltro('Todos'); setBusquedaCliente(''); setBusquedaEncargado('');}}className="ml-auto text-xs text-gray-500 hover:text-red-700 font-semibold underline">Limpiar filtros</button>
        </div>
            <div className="border border-gray-400 rounded-sm shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800">
                            <th className="border border-gray-400 px-4 py-2 font-bold text-center">Id</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Cliente</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Estado</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Encargado</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {pedidosFiltrados.length > 0 ? (
                            pedidosFiltrados.map((pedido) => (
                                <tr key={pedido.id_pedido} className="bg-gray-100 hover:bg-white transition-colors">
                                    <td className="border border-gray-400 px-4 py-2 text-center">{pedido.id_pedido}</td>
                                    
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{pedido.cliente_vip?.nombre || pedido.cliente?.nombre || pedido.comercial?.nombre || 'Sin asignar'}</span>
                                            {pedido.cliente && pedido.comercial && <span className="text-[10px] text-gray-500 uppercase">Comercial: {pedido.comercial.nombre}</span>}
                                            {pedido.cliente_vip && <span className="text-[10px] text-yellow-600 font-bold uppercase">Cliente VIP</span>}
                                        </div>
                                    </td>

                                    <td className="border border-gray-400 px-4 py-2"> 
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${pedido.estado === 'En preparación' ? 'bg-red-200' : pedido.estado ===  'En proceso de entrega' ? 'bg-orange-200' : 'bg-green-200'}`}>
                                            {pedido.estado}
                                        </span>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {pedido.encargado_almacen ? pedido.encargado_almacen.nombre : 'N/A'}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 relative">
                                    <button onClick={() => {
                                                                const idActual = pedido.id_pedido;
                                                                setAbrirMenu(prevId => (prevId == idActual ? null : idActual));
                                                            }}  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer">...</button>

                                    {abrirMenu === pedido.id_pedido && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-400 z-50 shadow-xl">
                                            <div className="flex flex-col text-sm">
                                                <button onClick={() => handleEliminar(pedido.id_pedido)} className="px-4 py-2 border-b border-gray-400 hover:bg-gray-100 text-left cursor-pointer text-red-600">Eliminar</button>
                                                <button onClick={() => navigate(`/DetallesPedido/${pedido.id_pedido}`)} className="px-4 py-2 hover:bg-gray-100 text-left cursor-pointer">Ver detalles</button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No hay pedidos registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GestionarPedidos;