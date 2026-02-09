import React, { useEffect, useState } from "react";

const CrearPedidoRebastecimiento = () => {
    const [articulos, setArticulos] = useState([]);
    const [idAdministrador, setIdAdministrador] = useState(null);
    const [idComercial, setIdComercial] = useState(null);
    const [idCliente, setIdCliente] = useState(null);
    const [idEncargado, setIdEncargado] = useState(null);

    useEffect(() => {
        const cargarArticulos = async () => {
            try {
                const response = await fetch('http://localhost/api/articulo');
                const data = await response.json();
                setArticulos(data);
            } catch (error) {
                console.error("Error al cargar artículos:", error);
            }
        };
        cargarArticulos();
    }, []);

    const manejarCantidad = (id, cantidad) => {
        const valor = parseInt(cantidad) || 0;
        setArticulos(articulos.map(articulo =>
            articulo.id_articulo === id ? { ...articulo, cantidadPedir: valor } : articulo
        ));
    };

    const añadirProducto = async () => {
        const productos= articulos.filter(articulo => articulo.cantidadPedir > 0);

        if (productos.length === 0) {
            alert("Selecciona al menos un producto.");
            return;
        }

        try {
            const resFactura = await fetch('http://localhost/api/facturas/guardar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cantidad: productos.reduce((contador, articulo) => contador + articulo.cantidadPedir, 0),
                    fecha: new Date().toISOString().split('T')[0],
                    precio: productos.reduce((contador, articulo) => contador + (articulo.cantidadPedir * articulo.precio), 0),
                    id_administrador: idAdministrador,
                    id_comercial: idComercial,
                    id_cliente: idCliente,
                    id_clientevip: null 
                })
            });
            const dataFactura = await resFactura.json();
            const facturaId = dataFactura.factura.id_factura;


            const resPedido = await fetch('http://localhost/api/pedidos/guardar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fecha_pedido: new Date().toISOString().split('T')[0],
                    estado: 'Pendiente',
                    id_factura: facturaId,
                    id_comercial: idComercial,
                    id_cliente: idCliente,
                    id_encargado: idEncargado
                })
            });
            const dataPedido = await resPedido.json();
            const pedidoId = dataPedido.pedidos?.id_pedido || dataPedido.pedidos?.id;

            const promesasLineas = productos.map(articulo => {
                return fetch('http://localhost/api/lineasPedido/guardar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        precio: articulo.precio,
                        cantidad: articulo.cantidadPedir,
                        id_pedido: pedidoId,
                        id_articulo: articulo.id_articulo
                    })
                });
            });

            await Promise.all(promesasLineas);

            alert("¡Pedido, Factura y Líneas registrados correctamente!");
            setArticulos(articulos.map(articulo => ({...articulo, cantidadPedir: 0})));

        } catch (error) {
            console.error("Error en el proceso:", error);
            alert("Hubo un fallo en la creación en cadena.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Reabastecimiento de Inventario</h1>
                    <button 
                        onClick={añadirProducto} 
                        className="bg-[#bc002d] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[#9a0025] transition duration-300"
                    >
                        Confirmar Pedido
                    </button>
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
                                        <input 
                                            type="number" 
                                            min="0" 
                                            value={articulo.cantidadPedir || ""}
                                            className="w-20 p-2 border border-gray-300 rounded-md outline-none focus:border-[#bc002d]" 
                                            onChange={(e) => manejarCantidad(articulo.id_articulo, e.target.value)} 
                                            placeholder="0"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-[#bc002d]">
                                        {((articulo.cantidadPedir || 0) * articulo.precio).toFixed(2)}€
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                       <span className="text-gray-600 mr-4">Total Estimado:</span>
                       <span className="text-2xl font-bold text-gray-800"> 
                            {articulos.reduce((acc, art) => acc + ((art.cantidadPedir || 0) * art.precio), 0).toFixed(2)}€
                       </span>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default CrearPedidoRebastecimiento;