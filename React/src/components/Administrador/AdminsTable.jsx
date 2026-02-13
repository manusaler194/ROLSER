import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminsTable = ({ usuario, onVolver }) => {
  const navigate = useNavigate();

  // Verificamos que llegue el usuario
  if (!usuario) return <p className="text-center p-4">No hay datos de usuario.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Datos del usuario</h2>
      
      {/* Ajustamos el padding en móviles (p-6) y en desktop (sm:p-8) */}
      <div className="bg-white p-6 sm:p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        <div className="space-y-6">
          
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2 sm:pl-0">
              Nombre
            </label>
            <input 
              type="text" 
              readOnly
              // Usamos los datos normalizados que vienen del padre
              value={`${usuario.nombre} ${usuario.apellidos}`}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2 sm:pl-0">
              Email
            </label>
            <input 
              type="email" 
              readOnly
              value={usuario.email}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white"
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2 sm:pl-0">
              Teléfono
            </label>
            <input 
              type="text" 
              readOnly
              value={usuario.telefono}
              className="w-full sm:w-2/3 border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none bg-white"
            />
          </div>

          {/* Rol - Estático para Admins */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2 sm:pl-0">
              Rol
            </label>
            <div className="relative w-full sm:w-2/3">
              <select 
                disabled
                className="w-full appearance-none border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-white opacity-100 font-bold text-gray-700"
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

          {/* Botones de acción */}
          <div className="flex flex-col-reverse sm:flex-row justify-center pt-4 gap-3 sm:gap-4">
            <button 
              onClick={onVolver}
              className="bg-white border border-gray-400 text-gray-700 font-medium py-3 sm:py-2 px-10 w-full sm:w-auto rounded-full hover:bg-gray-100 transition-colors shadow-sm"
            >
              Volver
            </button>
            <button 
              onClick={() => navigate(`/modificar-admin/${usuario.id_administrador}`)}
              className="bg-[#bd0026] text-white font-medium py-3 sm:py-2 px-10 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-md"
            >
              Modificar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminsTable;