import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const CrearPedidoRebastecimiento = () => {
    const { user, role } = useAuth(); 
    const [articulos, setArticulos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [idProveedor, setIdProveedor] = useState(""); 

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const responseArt = await apiFetch('http://localhost/api/articulo');
                const dataArt = await responseArt.json();
                console.log(dataArt);
                setArticulos(dataArt.almacen.map(a => ({ ...a, cantidad: 0 })));

                const responseProv = await apiFetch('http://localhost/api/proveedor');
                const dataProv = await responseProv.json();
                console.log(dataProv);
                setProveedores(dataProv.proveedor); 
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };
        cargarDatos();
    }, []);

    const handleCantidad = (id, nuevaCantidad) => {
        const valor = parseInt(nuevaCantidad) || 0;
        setArticulos(prevArticulo =>
            prevArticulo.map(articulo => 
                articulo.id_articulo === id ? { ...articulo, cantidad: valor } : articulo
            )
        );
    };

    const totalPedido = articulos.reduce((acc, art) => acc + ((art.cantidad || 0) * (art.precio || 0)), 0);

    const crearReabastecimiento = async () => {
        if (!idProveedor) {
            alert("Por favor, selecciona un proveedor.");
            return;
        }
        if (articulos.filter(a => a.cantidad > 0).length === 0) {
            alert("Selecciona al menos un producto.");
            return;
        }
        try {
            const datosParaLaravel = {
                fecha_pedido: new Date().toISOString().split('T')[0],
                estado: 'En preparación',
                id_proveedor: idProveedor, 
                id_administrador: role === 'admin' ? user.id : null,
                id_encargado: role === 'encargado_almacen' ? user.id : null
            };

            const response = await apiFetch('http://localhost/api/pedido-reabastecimiento/guardar', {
                method: 'POST',
                body: JSON.stringify(datosParaLaravel)
            });
            alert("Pedido de reposición creado con éxito.");
            setArticulos(prev => prev.map(art => ({ ...art, cantidad: 0 })));
            setIdProveedor("");
        } catch (error) {
            alert("Error al crear el pedido");
        } 
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Crear Pedido Reposición</h1>
                        <p className="text-gray-500">Gestiona la entrada de stock</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Proveedor:</label>
                            <select value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-red-600 outline-none">
                                <option value="">Seleccione un proveedor...</option>
                                {proveedores.map(prov => (
                                    <option key={prov.id_proveedor} value={prov.id_proveedor}>
                                        {prov.nombre_empresa}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={crearReabastecimiento} className={`mt-auto font-semibold py-2 px-6 rounded-lg text-white shadow-md transition bg-red-700 hover:bg-red-800`}>Confirmar Pedido</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Producto</th>
                                <th className="px-6 py-4 text-center font-semibold text-gray-700">Stock Actual</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Precio Unit.</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Cantidad</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {articulos.map((articulo) => (
                                <tr key={articulo.id_articulo} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{articulo.nombre}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${articulo.stock_actual < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{articulo.stock_actual}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{articulo.precio ? `${articulo.precio}€` : "0.00€"}</td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="number" min="0"value={articulo.cantidad}onChange={(e) => handleCantidad(articulo.id_articulo, e.target.value)}className="w-24 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 outline-none text-center"/>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-red-700">{((articulo.cantidad || 0) * (articulo.precio || 0)).toFixed(2)}€</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total del Pedido</span>
                            <span className="text-1xl font-black text-red-700">{totalPedido.toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearPedidoRebastecimiento;