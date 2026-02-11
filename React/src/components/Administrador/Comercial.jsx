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
      
      {/* Padding adaptativo (p-6 en móvil, p-8 en PC) */}
      <div className="bg-white p-6 sm:p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        {/* Espaciado entre elementos adaptativo */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Nombre
            </label>
            <input 
              type="text" 
              readOnly
              value={datos.nombre} // En comerciales el nombre suele venir completo o solo nombre
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Email
            </label>
            <input 
              type="email" 
              readOnly
              value={datos.email}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Teléfono (Corregido: usa 'contacto') */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Teléfono
            </label>
            <input 
              type="text" 
              readOnly
              value={telefonoReal} 
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Rol - Estático */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Rol
            </label>
            <div className="relative w-full sm:w-2/3">
              <input 
                type="text"
                readOnly
                value="Comercial"
                // Añadido py-2 sm:py-1 para mantener la consistencia en el tamaño
                className="w-full border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-gray-100 text-gray-500 cursor-default font-bold"
              />
            </div>
          </div>

          {/* Administrador asignado */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0 leading-tight">
              Admin. responsable
            </label>
            <div className="relative w-full sm:w-2/3">
               <input 
                type="text"
                readOnly
                value={nombreAdmin}
                // Añadido py-2 sm:py-1
                className="w-full border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-white cursor-default text-gray-700"
              />
            </div>
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center pt-4 sm:pt-6">
            <button 
                onClick={onVolver}
                // Adaptación del botón: ancho total en móvil y auto en PC
                className="bg-[#bd0026] text-white font-medium py-3 sm:py-2 px-14 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-sm"
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