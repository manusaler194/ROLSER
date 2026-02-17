import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const Stock = () => {
    const [articulos, setArticulos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const { user, role } = useAuth(); 
    const cargarArticulos = async () => {
        try {
            const response = await apiFetch('http://localhost/api/articulo');
            const data = await response.json();
            setArticulos(data.almacen);
        } catch (error) {
            console.error("Error al cargar el inventario:", error);
        }
    };

    useEffect(() => {
        cargarArticulos();
    }, []);

    const articulosFiltrados = articulos.filter(art => 
        art.nombre.toLowerCase().includes(busqueda)
    );
    const reponerAutomatico = async (articulo) => {
    const cantidad = 100
    const idProveedorDefecto = articulo.id_proveedor || 1; 

    try {
        const datosPedido = {
            fecha_pedido: new Date().toISOString().split('T')[0],
            estado: 'En proceso', 
            id_proveedor: idProveedorDefecto, 
            id_administrador: role === 'admin' ? user.id_administrador : null,
            id_encargado: role === 'encargado de almacen' ? user.id_encargado : null
        };

        const responsePedido = await apiFetch('http://localhost/api/pedidos/reposicion/guardar', {
            method: 'POST',
            body: JSON.stringify(datosPedido)
        });

        if (!responsePedido.ok) throw new Error("Error al crear");

        const responseArt = await apiFetch(`http://localhost/api/articulo/actualizar/${articulo.id_articulo}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...articulo,
                stock_actual: Number(articulo.stock_actual) + cantidad,
                id_administrador: user.id_administrador || user.id_encargado
            })
        });

        if (responseArt.ok) {
            cargarArticulos(); 
        }
    } catch (error) {
        console.error(error);
        alert("Error en la reposición rápida");
    }
};
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                            <span className="w-2 h-8 bg-[#bc002d] rounded-full"></span>
                            Inventario de Almacén
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Consulta y gestión de existencias en tiempo real</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input 
                            type="text" 
                            placeholder="Buscar producto..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="p-3 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-[#bc002d] outline-none shadow-sm text-sm px-6 w-full sm:w-64 transition-all"
                        />        
                            <Link 
                                to="/crear-pedido-reabastecimiento" 
                                className="bg-[#bc002d] hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95 text-center text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <span>+</span> Reponer Stock
                            </Link>
                    </div>
                </div>

                <div className="hidden md:block bg-white rounded-4XL shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-8 py-5 font-black text-gray-600 text-[10px] uppercase tracking-[0.2em]">Producto</th>
                                <th className="px-8 py-5 font-black text-gray-600 text-[10px] uppercase tracking-[0.2em] text-center">Referencia</th>
                                <th className="px-8 py-5 font-black text-gray-600 text-[10px] uppercase tracking-[0.2em] text-center">Estado Stock</th>
                                <th className="px-8 py-5 font-black text-gray-600 text-[10px] uppercase tracking-[0.2em] text-center">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {articulosFiltrados.map((articulo) => (
                                <tr key={articulo.id_articulo} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 text-base">{articulo.nombre}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center text-gray-500 font-mono text-xs">
                                        REF-{articulo.id_articulo}00
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        {articulo.stock_actual < 50 ? (
                                            <button 
                                                onClick={() => reponerAutomatico(articulo)}
                                                className="px-3 py-1 text-[9px] font-black rounded-full bg-red-100 text-red-600 uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                                title="Clic para reponer 100 unidades"
                                            >
                                                Crítico - Reponer Ya
                                            </button>
                                        ) : articulo.stock_actual < 100 ? (
                                            <span className="px-3 py-1 text-[9px] font-black rounded-full bg-orange-100 text-orange-600 uppercase tracking-tighter">
                                                Stock Medio
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 text-[9px] font-black rounded-full bg-green-100 text-green-600 uppercase tracking-tighter">
                                                Óptimo
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`text-lg font-black ${articulo.stock_actual < 50 ? 'text-red-700' : 'text-gray-800'}`}>
                                            {articulo.stock_actual}
                                        </span>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

<div className="md:hidden space-y-4">
                    {articulosFiltrados.map((articulo) => (
                        <div key={articulo.id_articulo} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm transition-active active:scale-[0.98]">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{articulo.nombre}</h3>
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">REF: {articulo.id_articulo}</p>
                                </div>
                                
                                {/* BADGE INTERACTIVO SI ES CRÍTICO */}
                                <div>
                                    {articulo.stock_actual < 50 ? (
                                        <button 
                                            onClick={() => reponerAutomatico(articulo)}
                                            className="px-3 py-1 text-[10px] font-black rounded-full bg-red-100 text-red-600 uppercase animate-pulse border border-red-200"
                                        >
                                            ¡Reponer Ya!
                                        </button>
                                    ) : articulo.stock_actual < 100 ? (
                                        <span className="px-3 py-1 text-[10px] font-black rounded-full bg-orange-100 text-orange-600 uppercase">
                                            Medio
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-[10px] font-black rounded-full bg-green-100 text-green-600 uppercase">
                                            Óptimo
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-black uppercase">Stock Disponible</span>
                                    <span className={`text-2xl font-black ${
                                        articulo.stock_actual < 50 ? 'text-red-600' : 
                                        articulo.stock_actual < 100 ? 'text-orange-500' : 'text-green-600'
                                    }`}>
                                        {articulo.stock_actual}
                                    </span>
                                </div>
                                
                                {/* PUNTO DE ESTADO VISUAL */}
                                <div>
                                    <div className={`w-4 h-4 rounded-full shadow-sm ${
                                        articulo.stock_actual < 50 
                                            ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]' 
                                            : articulo.stock_actual < 100 
                                                ? 'bg-orange-400' 
                                                : 'bg-green-500'
                                    }`}></div>
                                </div>
                            </div>

                            {/* BOTÓN DE ACCIÓN RÁPIDA ADICIONAL SOLO PARA CRÍTICOS */}
                            {articulo.stock_actual < 50 && (
                                <button 
                                    onClick={() => reponerAutomatico(articulo)}
                                    className="w-full mt-4 bg-red-50 text-red-700 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border border-red-100 active:bg-red-600 active:text-white transition-colors"
                                >
                                    Generar Pedido Automático
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {articulosFiltrados.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-4XL border border-dashed border-gray-300">
                        <p className="text-gray-400 font-medium">No se encontraron productos en el inventario.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stock;