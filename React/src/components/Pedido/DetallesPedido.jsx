import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallesPedido = () => {
  const [pedido, setPedido] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        const response = await fetch(`http://localhost/api/pedidos/${id}`);
        const data = await response.json();
        if (data.pedido && data.pedido.length > 0) {
          setPedido(data.pedido[0]);
        }
      } catch (error) {
        console.error("Error al cargar el pedido:", error);
      }
    };
    cargarPedido();
  }, [id]);

  if (!pedido) {
    return <div className="text-center py-20">Cargando pedido #{id}...</div>;
  }

  const inputClasses = "w-full px-5 py-3 mb-4 border border-gray-400 rounded-full bg-gray-50 text-gray-700 cursor-default";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-3xl p-10 bg-white border border-gray-200 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Detalles del Pedido #{id}</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Fecha</label>
            <input type="text" value={pedido.fecha_pedido || ''} className={inputClasses} readOnly />
          </div>
          <div>
            <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Estado Actual</label>
            <input type="text" value={pedido.estado || ""} className={inputClasses} readOnly />
          </div>
        </div>


        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4 ml-2">Artículos en este pedido</h3>
          <div className="overflow-hidden border border-gray-200 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold text-gray-600">Artículo</th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-600 text-center">Cantidad</th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-600 text-right">Precio Unit.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pedido.linea_pedidos && pedido.linea_pedidos.map((linea) => (
                  <tr key={linea.id_linea} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {linea.articulo?.nombre || "Artículo no disponible"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-center">
                      {linea.cantidad}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-right">
                      {linea.precio} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div 
          onClick={() => navigate('/pedidos')} 
          className="w-full py-4 bg-[#bc002d] text-white font-bold rounded-full text-center shadow-md hover:bg-red-800 transition-colors cursor-pointer"
        >
          Volver al listado
        </div>
      </div>
    </div>
  );
};

export default DetallesPedido;