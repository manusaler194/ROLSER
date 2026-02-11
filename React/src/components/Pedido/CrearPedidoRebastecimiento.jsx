import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const CrearPedidoRebastecimiento = () => {
    const { user, role } = useAuth(); 
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        const cargarArticulos = async () => {
                    console.log(user)
        
            try {
                const response = await apiFetch('http://localhost/api/articulo');
                const data = await response.json();
                console.log(data);
                const articulosConCantidad = data.almacen.map(a => ({ ...a, cantidad: 0 }));
                setArticulos(articulosConCantidad);
                console.log(user);
            } catch (error) {
                console.error("Error al cargar artículos:", error);
            }
        };
        cargarArticulos();
    }, []);

    const handleCantidad = (id, nuevaCantidad) => {
        const valor = parseInt(nuevaCantidad) || 0;
        setArticulos(prevArticulo =>
            prevArticulo.map(articulo => 
                articulo.id_articulo === id ? { ...articulo, cantidad: valor } : articulo
            )
        );
    };

    const añadirProducto = async () => {
        const productos = articulos.filter(articulo => articulo.cantidad > 0);

        if (productos.length === 0) {
            alert("Selecciona al menos un producto");
            return;
        }


        try {
            const totalPrecio = productos.reduce((acc, art) => acc + (art.cantidad * art.precio), 0);
            const totalCantidad = productos.reduce((acc, art) => acc + art.cantidad, 0);

            const resFactura = await apiFetch('http://localhost/api/facturas/guardar', {
                method: 'POST',
                body: JSON.stringify({
                    cantidad: totalCantidad,
                    fecha: new Date().toISOString().split('T')[0],
                    precio: totalPrecio,
                    id_administrador: role === 'admin' ? user.id : null,
                })
            });

            if (!resFactura.ok) throw new Error("Error al generar la factura.");
            const dataFactura = await resFactura.json();
            const facturaId = dataFactura.factura.id_factura;

            const resPedido = await apiFetch('http://localhost/api/pedidos/guardar', {
                method: 'POST',
                body: JSON.stringify({
                    fecha_pedido: new Date().toISOString().split('T')[0],
                    estado: 'En preparación',
                    id_factura: facturaId,
                    id_encargado: role === 'encargado_almacen' ? user?.id : null
                })
            });

            if (!resPedido.ok) throw new Error("Error al generar el pedido.");
            const dataPedido = await resPedido.json();
            const pedidoId = dataPedido.pedidos?.id_pedido;

            const promesasLineas = productos.map(articulo => 
                apiFetch('http://localhost/api/lineasPedido/guardar', {
                    method: 'POST',
                    body: JSON.stringify({
                        precio: articulo.precio,
                        cantidad: articulo.cantidad,
                        id_pedido: pedidoId,
                        id_articulo: articulo.id_articulo
                    })
                }).then(res => {
                    if (!res.ok) throw new Error(`Error en el producto: ${articulo.nombre}`);
                    return res.json();
                })
            );

            await Promise.all(promesasLineas);

            alert(" Pedido de reabastecimiento registrado con éxito.");
            
            setArticulos(prev => prev.map(art => ({ ...art, cantidad: 0 })));

        } catch (error) {
            console.error("Error completo:", error);
            alert(`Error: ${error.message}`);
        } 
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Reabastecimiento de Inventario</h1>
                    </div>
                    <button onClick={añadirProducto} className={'font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 text-white bg-red-700 hover:bg-red-800'}>Confirmar Pedido</button>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="px-6 py-4 font-semibold">Producto</th>
                                <th className="px-6 py-4 font-semibold text-center">Stock Actual</th>
                                <th className="px-6 py-4 font-semibold">Precio</th>
                                <th className="px-6 py-4 font-semibold">Cantidad a Pedir</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {articulos.map((articulo) => (
                                <tr key={articulo.id_articulo} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{articulo.nombre}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${articulo.stock_actual < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{articulo.stock_actual} unidades</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{articulo.precio}€</td>
                                    <td className="px-6 py-4">
                                        <input type="number" min="0" value={articulo.cantidad}className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#bc002d] outline-none" onChange={(e) => handleCantidad(articulo.id_articulo, e.target.value)} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-[#bc002d]">{((articulo.cantidad || 0) * articulo.precio).toFixed(2)}€</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                       <span className="text-gray-600 mr-4">Total Estimado:</span>
                       <span className="text-2xl font-bold text-gray-800"> 
                            {articulos.reduce((acc, art) => acc + ((art.cantidad || 0) * art.precio), 0).toFixed(2)}€
                       </span>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default CrearPedidoRebastecimiento;