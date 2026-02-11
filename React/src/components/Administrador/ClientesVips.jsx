import React from 'react';

const VipsTable = ({ usuario, onVolver }) => {
  
  // Verificación de seguridad
  if (!usuario) return <p className="text-center p-4">No hay datos del cliente VIP.</p>;

  // -----------------------------------------------------------------------
  // 1. NORMALIZACIÓN DE DATOS
  // -----------------------------------------------------------------------
  const datos = usuario;

  // CORRECCIÓN 1: Email (El JSON trae "correo")
  const emailReal = datos.email || "";

  // CORRECCIÓN 2: Acceder al objeto 'administrador'
  const nombreAdmin = datos.administrador 
    ? `${datos.administrador.nombre} ${datos.administrador.apellidos}` 
    : "Sin asignar";

  // CORRECCIÓN 3: Acceder al objeto 'comercial'
  const nombreComercial = datos.comercial 
    ? datos.comercial.nombre 
    : "Sin asignar";

  // CORRECCIÓN 4: Acceder al objeto 'catalogo'
  const nombreCatalogo = datos.catalogo 
    ? datos.catalogo.nombre_catalogo 
    : "Sin catálogo";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Ficha Cliente VIP</h2>
      
      {/* Padding adaptativo para móvil (p-6) y PC (sm:p-8) */}
      <div className="bg-white p-6 sm:p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        {/* Espaciado adaptativo entre campos */}
        <div className="space-y-4 sm:space-y-5">
          
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Nombre
            </label>
            <input 
              type="text" 
              readOnly
              value={datos.nombre}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Email
            </label>
            <input 
              type="text" 
              readOnly
              value={emailReal} 
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Teléfono
            </label>
            <input 
              type="text" 
              readOnly
              value={datos.telefono}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Dirección */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Dirección
            </label>
            <input 
              type="text" 
              readOnly
              value={datos.direccion || ""}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default text-sm sm:text-base"
            />
          </div>

          <hr className="border-gray-300 my-4" />

          {/* CATALOGO */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0 leading-tight">
              Catálogo
            </label>
            <div className="relative w-full sm:w-2/3">
              <input 
                type="text"
                readOnly
                value={nombreCatalogo}
                // Añadido py-2 sm:py-1 para consistencia
                className="w-full border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-yellow-50 text-yellow-800 font-semibold cursor-default"
              />
            </div>
          </div>

          {/* ADMIN RESPONSABLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0 leading-tight">
              Admin. Responsable
            </label>
            <div className="relative w-full sm:w-2/3">
              <input 
                type="text"
                readOnly
                value={nombreAdmin} 
                className="w-full border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-white cursor-default text-gray-700"
              />
            </div>
          </div>

          {/* COMERCIAL ASIGNADO */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0 leading-tight">
              Comercial
            </label>
            <div className="relative w-full sm:w-2/3">
              <input 
                type="text"
                readOnly
                value={nombreComercial} 
                className="w-full border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-white cursor-default text-gray-700"
              />
            </div>
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center pt-4 sm:pt-6">
            <button 
                onClick={onVolver}
                // Ancho 100% en móvil, adaptativo en escritorio
                className="bg-[#bd0026] text-white font-medium py-3 sm:py-2 px-14 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform"
            >
              Volver
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VipsTable;