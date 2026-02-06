import React from 'react';

const AdminsTable = ({ usuario, onVolver }) => {
  // Verificamos que llegue el usuario
  if (!usuario) return <p className="text-center p-4">No hay datos de usuario.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Datos del usuario</h2>
      
      <div className="bg-white p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        <div className="space-y-6">
          
          {/* Nombre */}
          <div className="flex items-center justify-between">
            <label className="text-xl font-normal text-black w-1/3">Nombre</label>
            <input 
              type="text" 
              readOnly
              // Usamos los datos normalizados que vienen del padre
              value={`${usuario.nombre} ${usuario.apellidos}`}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white"
            />
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <label className="text-xl font-normal text-black w-1/3">Email</label>
            <input 
              type="email" 
              readOnly
              value={usuario.email}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white"
            />
          </div>

          {/* Teléfono */}
          <div className="flex items-center justify-between">
            <label className="text-xl font-normal text-black w-1/3">Teléfono</label>
            <input 
              type="text" 
              readOnly
              value={usuario.telefono}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white"
            />
          </div>

          {/* Rol - Estático para Admins */}
          <div className="flex items-center justify-between">
            <label className="text-xl font-normal text-black w-1/3">Rol</label>
            <div className="relative w-2/3">
              <select 
                disabled
                className="w-full appearance-none border border-gray-600 rounded-full py-1 px-4 text-center bg-white opacity-100 font-bold text-gray-700"
              >
                <option>Administrador</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Comercial - Bloqueado */}
          <div className="flex items-center justify-between">
            <label className="text-xl font-normal text-black w-1/3">Comercial asignado</label>
            <div className="relative w-2/3">
              <select 
                disabled
                className="w-full appearance-none border border-gray-600 rounded-full py-1 px-4 text-center bg-gray-200 opacity-100"
              >
                <option>N/A</option>
              </select>
            </div>
          </div>

          {/* Botón Volver (Conectado a la función) */}
          <div className="flex justify-center pt-4">
            <button 
              onClick={onVolver}
              className="bg-[#bd0026] text-white font-medium py-2 px-12 rounded-full hover:bg-red-800 transition-colors shadow-md"
            >
              Volver
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminsTable;