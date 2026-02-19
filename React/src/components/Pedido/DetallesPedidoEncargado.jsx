import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../../utils/api"; 

const DetallesPedidoEncargado = () => {
  const [pedido, setPedido] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        const response = await apiFetch(`http://localhost/api/pedidos/${id}`);
        const data = await response.json();
        console.log(data.pedido);

        setPedido(data.pedido[0]);
      } catch (error) {
        console.error("Error al cargar el pedido:", error);
      }
    };
    cargarPedido();
  }, [id]);

  if (!pedido) {
    return <div className="text-center py-20">Cargando pedido #{id}...</div>;
  }

const inputClasses = "w-full px-5 py-3 mb-4 border border-gray-400 rounded-full bg-gray-50 text-gray-700 cursor-default focus:outline-none";

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:py-10">
    <div className="w-full max-w-3xl p-6 sm:p-10 bg-white border border-gray-200 rounded-4xl shadow-lg">
      
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Detalles del Pedido #{id}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-8">
        <div>
          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Fecha</label>
          <input type="text" value={pedido.fecha_pedido || ''} className={inputClasses} readOnly />
        </div>
        <div>
          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Estado Actual</label>
          <input 
            type="text" 
            value={pedido.estado || ""} 
            className={`${inputClasses} font-semibold ${pedido.estado === 'Entregado' ? 'text-green-600' : 'text-amber-600'}`} 
            readOnly 
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4 ml-2">Artículos en este pedido</h3>
        
        <div className="hidden sm:block overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-gray-600">Artículo</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 text-center">Cant.</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 text-right">Precio</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pedido.linea_pedidos && pedido.linea_pedidos.map((linea) => (
                <tr key={linea.id_linea} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-medium">{linea.articulo.nombre}</td>
                  <td className="px-6 py-4 text-gray-700 text-center">{linea.cantidad}</td>
                  <td className="px-6 py-4 text-gray-700 text-right">{linea.precio} €</td>
                  <td className="px-6 py-4 text-[#bc002d] font-bold text-right">
                    {(linea.precio * linea.cantidad).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden space-y-4">
          {pedido.linea_pedidos && pedido.linea_pedidos.map((linea) => (
            <div key={linea.id_linea} className="p-4 border border-gray-200 rounded-2xl bg-gray-50 shadow-sm">
              <div className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">
                {linea.articulo.nombre}
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-500 font-medium">Cantidad:</span>
                <span className="text-gray-800 font-bold">{linea.cantidad}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-500 font-medium">Precio Unit:</span>
                <span className="text-gray-800">{linea.precio} €</span>
              </div>
              <div className="flex justify-between text-base py-1 mt-1 border-t border-dotted border-gray-300">
                <span className="text-gray-600 font-bold">Subtotal:</span>
                <span className="text-[#bc002d] font-black">
                  {(linea.precio * linea.cantidad).toFixed(2)} €
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link 
        to='/pedidos/encargado' 
        className="block w-full py-4 bg-[#bc002d] text-white font-bold rounded-full text-center shadow-md hover:bg-red-800 transition-all active:scale-[0.98] cursor-pointer"
      >
        Volver al listado
      </Link>
    </div>
  </div>
);
};

export default DetallesPedidoEncargado;