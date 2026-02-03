import React from 'react';
const VipsTable = ({ lista }) => {
  // Tomamos el primer cliente VIP de la lista proporcionada
  const vip = lista[0];

  if (!vip) return <p className="text-center p-4">No hay datos de clientes VIP.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Datos del usuario</h2>
      
      <div className="bg-white p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        <div className="space-y-6">
          
          {/* Nombre */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Nombre</label>
            <input 
              type="text" 
              readOnly
              value={vip.nombre}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Email (Campo 'correo' en el JSON VIP) */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Email</label>
            <input 
              type="email" 
              readOnly
              value={vip.correo}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Teléfono */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Teléfono</label>
            <input 
              type="text" 
              readOnly
              value={vip.telefono}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Rol - Estático como Cliente VIP */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Rol</label>
            <div className="relative w-2/3">
              <select 
                disabled
                className="w-full appearance-none border border-gray-600 rounded-full py-1 px-4 text-center bg-white opacity-100 text-black cursor-default"
              >
                <option>Cliente VIP</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Comercial asignado - En VIPs usamos el ID de catálogo o administrador según prefieras */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4 leading-tight">Catálogo asignado</label>
            <div className="relative w-2/3">
              <select 
                disabled
                className="w-full appearance-none border border-gray-600 rounded-full py-1 px-4 text-center bg-white opacity-100 text-black cursor-default"
              >
                <option>{`Catálogo #${vip.id_catalogo}`}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center pt-4">
            <button className="bg-[#bd0026] text-white font-medium py-2 px-14 rounded-full hover:bg-red-800 transition-colors shadow-sm">
              Volver
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default VipsTable;