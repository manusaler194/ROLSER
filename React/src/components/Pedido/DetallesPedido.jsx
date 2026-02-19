import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const DetallesPedido = () => {
  const { user } = useAuth();
  const [pedido, setPedido] = useState(null);
  const { id } = useParams();

  const role = user?.rol;
  const isVIP = role === 'clientevip'; 
  const isClienteNormal = role === 'cliente';
  const isClienteAny = isVIP || isClienteNormal;
  const isEncargado = role === 'encargadoalmacen';
  const isComercial = role === 'comercial';
  const isAdmin = role === 'admin';

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        const response = await apiFetch(`http://localhost/api/pedidos/${id}`);
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

  if (!pedido) return <div className="text-center py-20 font-bold text-gray-400">Cargando pedido...</div>;

  const containerStyle = isVIP 
    ? "border-2 border-yellow-400 shadow-[0_20px_50px_rgba(234,179,8,0.15)] bg-white" 
    : "border border-gray-200 shadow-lg bg-white";

  const inputClasses = "w-full px-5 py-3 mb-4 border border-gray-400 rounded-full bg-gray-50 text-gray-700 cursor-default focus:outline-none";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:py-10">
      <div className={`w-full max-w-3xl p-6 sm:p-10 rounded-[2.5rem] transition-all ${containerStyle}`}>
        
        <div className="flex flex-col items-center mb-8">
          {isVIP && (
            <span className="mb-2 text-[10px] bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-black uppercase tracking-widest border border-yellow-200">
              👑 Servicio Preferente VIP
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-800">
            Pedido #{id}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-4">
          <div>
            <label className="block ml-4 mb-1 text-[10px] font-black text-gray-500 uppercase">Fecha</label>
            <input type="text" value={pedido.fecha_pedido} className={inputClasses} readOnly />
          </div>
          <div>
            <label className="block ml-4 mb-1 text-[10px] font-black text-gray-500 uppercase">Estado</label>
            <input 
              type="text" 
              value={pedido.estado} 
              className={`${inputClasses} font-bold ${pedido.estado === 'Entregado' ? 'text-green-600' : 'text-amber-600'}`} 
              readOnly 
            />
          </div>
        </div>

        
        {isClienteAny && (
          <div className={`mb-8 p-5 rounded-3xl border transition-colors ${isVIP ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-100'}`}>
            <label className={`block mb-1 text-[10px] font-black uppercase ${isVIP ? 'text-yellow-700' : 'text-red-800'}`}>
              Agente Comercial Responsable
            </label>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isVIP ? 'bg-yellow-500' : 'bg-[#bc002d]'}`}>
                {(pedido.comercial?.nombre || "O")[0]}
              </div>
              <span className="font-bold text-gray-800">
                {pedido.comercial?.nombre || "Venta Directa Online"}
              </span>
            </div>
          </div>
        )}

        {(isComercial || isAdmin || isEncargado) && (
          <div className="mb-8 p-5 bg-gray-100 rounded-3xl border border-gray-200">
            <label className="block mb-2 text-[10px] font-black text-gray-500 uppercase">
              {isComercial ? "Cliente Bajo tu Gestión" : "Detalles del Cliente"}
            </label>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">
                {pedido.cliente?.nombre || pedido.cliente_vip?.nombre}
              </span>
              {pedido.cliente_vip && (
                <span className="text-[9px] bg-yellow-400 text-white px-3 py-1 rounded-full font-black">VIP</span>
              )}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-black text-gray-800 mb-4 ml-2 flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${isVIP ? 'bg-yellow-500' : 'bg-[#bc002d]'}`}></span>
            DETALLE DE PRODUCTOS
          </h3>
          
          <div className="overflow-hidden border border-gray-200 rounded-2xl">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase">Producto</th>
                  <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase text-center">Cant.</th>
                  <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pedido.linea_pedidos?.map((linea) => (
                  <tr key={linea.id_linea} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{linea.articulo?.nombre}</td>
                    <td className="px-6 py-4 text-sm text-center font-bold text-gray-600">{linea.cantidad}</td>
                    <td className="px-6 py-4 text-sm font-black text-right text-gray-900">
                      {(linea.precio * linea.cantidad).toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Link 
          to="/pedidos" 
          className={`block w-full py-4 text-white font-black rounded-full text-center shadow-lg transition-all active:scale-95 ${
            isVIP ? 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200' : 'bg-[#bc002d] hover:bg-red-800'
          }`}
        >
          VOLVER AL LISTADO
        </Link>
      </div>
    </div>
  );
};

export default DetallesPedido;