import React from 'react';

const ComercialesTable = ({ usuario, onVolver }) => {
  
  // Verificación de seguridad
  if (!usuario) return <p className="text-center p-4">No hay datos del comercial.</p>;

  // 1. NORMALIZACIÓN DE DATOS
  const datos = usuario.original || usuario;

  // CORRECCIÓN 1: El teléfono en comerciales se llama 'contacto'
  const telefonoReal = datos.contacto || datos.telefono || "";

  // CORRECCIÓN 2: Mostrar el nombre del jefe (Administrador)
  const nombreAdmin = datos.administrador 
    ? `${datos.administrador.nombre} ${datos.administrador.apellidos}` 
    : "Sin asignar";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Ficha del Comercial</h2>
      
      <div className="bg-white p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        <div className="space-y-6">
          
          {/* Nombre */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Nombre</label>
            <input 
              type="text" 
              readOnly
              value={datos.nombre} // En comerciales el nombre suele venir completo o solo nombre
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Email */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Email</label>
            <input 
              type="email" 
              readOnly
              value={datos.email}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Teléfono (Corregido: usa 'contacto') */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Teléfono</label>
            <input 
              type="text" 
              readOnly
              value={telefonoReal} 
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Rol - Estático */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Rol</label>
            <div className="relative w-2/3">
              <input 
                type="text"
                readOnly
                value="Comercial"
                className="w-full border border-gray-600 rounded-full py-1 px-4 text-center bg-gray-100 text-gray-500 cursor-default font-bold"
              />
            </div>
          </div>

          {/* Administrador asignado (Corregido para ver el nombre) */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4 leading-tight">Admin. responsable</label>
            <div className="relative w-2/3">
               <input 
                type="text"
                readOnly
                value={nombreAdmin}
                className="w-full border border-gray-600 rounded-full py-1 px-4 text-center bg-white cursor-default text-gray-700"
              />
            </div>
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center pt-4">
            <button 
                onClick={onVolver}
                className="bg-[#bd0026] text-white font-medium py-2 px-14 rounded-full hover:bg-red-800 transition-colors shadow-sm"
            >
              Volver
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default ComercialesTable;