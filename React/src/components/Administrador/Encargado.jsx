import React from 'react';

const EncargadosTable = ({ usuario, onVolver }) => {
  
  if (!usuario) return <p className="text-center p-4">No hay datos del encargado.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Datos del usuario</h2>
      
      {/* Padding adaptativo (p-6 en móvil, p-8 en PC) */}
      <div className="bg-white p-6 sm:p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        {/* Espaciado adaptativo entre campos */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Nombre
            </label>
            <input 
              type="text" 
              readOnly
              value={`${usuario.nombre} ${usuario.apellidos}`}
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
              value={usuario.email}
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
              value={usuario.telefono}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Rol - Estático como Encargado */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0">
              Rol
            </label>
            <div className="relative w-full sm:w-2/3">
              <select 
                disabled
                className="w-full appearance-none border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-white opacity-100 text-black cursor-default font-bold"
              >
                <option>Encargado</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center pt-4 sm:pt-6">
            <button 
                onClick={onVolver}
                // Botón ancho completo en móvil y automático en PC
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
export default EncargadosTable;