import React, { useState, useEffect } from 'react';
import axios from "axios";

const GestionarPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerPedidos();
    }, []);

    const obtenerPedidos = () => {
        setCargando(true);
        axios
            .get('http://localhost/api/pedidos')
            .then(response => {
                // Importante: El backend devuelve 'pedidos' segun el fix anterior
                // Si tu backend devuelve 'pedido', usa response.data.pedido
                const datos = response.data.pedidos || response.data.pedido || [];
                setPedidos(datos);
                setCargando(false);
            })
            .catch(err => {
                console.error("Error al cargar:", err);
                setError("No se pudieron cargar los pedidos. Revisa la consola.");
                setCargando(false);
            });
    };

    if (cargando) return <div className="p-8">Cargando pedidos...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Filtrar por:</label>
                <select className="w-40 p-1 border border-gray-300 rounded bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Todos los Almacenes</option>
                    <option>Almacén A</option>
                    <option>Almacén B</option>
                </select>
            </div>

            <div className="overflow-hidden border border-gray-400 rounded-sm shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800">
                            <th className="border border-gray-400 px-4 py-2 font-bold text-center">Id</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Cliente</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Estado</th>
                            <th className="border border-gray-400 px-4 py-2 font-bold">Encargado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.length > 0 ? (
                            pedidos.map((pedido) => (
                                <tr key={pedido.id_pedido} className="bg-gray-100 hover:bg-white transition-colors">
                                    <td className="border border-gray-400 px-4 py-2 text-center">{pedido.id_pedido}</td>
                                    
                                    <td className="border border-gray-400 px-4 py-2">{pedido.cliente ? pedido.cliente.nombre : 'Sin asignar'}</td>

                                    <td className="border border-gray-400 px-4 py-2"> <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            pedido.estado === 'En preparación' ? 'bg-red-200' : pedido.estado ===  'En proceso de entrega' ? 'bg-orange-200' : 'bg-green-200'}`}>
                                            {pedido.estado}
                                        </span>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {pedido.encargado_almacen ? pedido.encargado_almacen.nombre : 'N/A'}
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

            {/* Botones de Acción */}
            <div className="flex gap-4 mt-4">
                <button 
                    onClick={obtenerPedidos}
                    className="bg-[#b3002d] text-white px-6 py-2 rounded-2xl hover:bg-[#8e0024] transition-colors text-sm font-semibold shadow-md"
                >
                    Refrescar datos
                </button>
                <button className="bg-[#4a4a4a] text-white px-8 py-2 rounded-2xl hover:bg-[#333333] transition-colors text-sm font-semibold shadow-md">
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default GestionarPedidos;