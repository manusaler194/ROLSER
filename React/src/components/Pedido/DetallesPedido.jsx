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
    return <div className="text-center py-20">No se encontró el pedido #{id}</div>;
  }

  const inputClasses = "w-full px-5 py-3 mb-10 border border-gray-400 rounded-full focus:outline-none bg-gray-50 text-gray-700 cursor-default appearance-none";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-2xl min-h-fit p-10 bg-white border border-gray-200 rounded-2rem shadow-lg relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Datos del Pedido #{id}</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Fecha</label>
          <input type="text" value={pedido.fecha_pedido || ''} className={inputClasses} readOnly />

          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Cliente</label>
          <input type="text" value={pedido.cliente?.nombre || "Sin cliente asignado"} className={inputClasses} readOnly />

          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Estado</label>
          <input type="text" value={pedido.estado || ""} className={inputClasses} readOnly />

          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Encargado</label>
          <input type="text" value={pedido.encargado_almacen?.nombre || "Sin encargado asignado"} className={inputClasses} readOnly />
          
          <div onClick={() => navigate('/pedidos')} className="w-full py-4 bg-[#bc002d] text-white font-bold rounded-full text-center shadow-md hover:bg-red-800 transition-colors cursor-pointer">
            Volver
          </div>
        </form>
      </div>
    </div>
  );
};



export default DetallesPedido;
