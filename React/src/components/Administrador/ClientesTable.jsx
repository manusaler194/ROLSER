import React from 'react';

const ClientesTable = ({ usuario, onVolver }) => {
  
  // Verificación de seguridad
  if (!usuario) return <p className="text-center p-4">No hay datos de clientes.</p>;

  // -----------------------------------------------------------------------
  // 1. NORMALIZACIÓN DE DATOS (Para evitar errores si cambia la estructura)
  // -----------------------------------------------------------------------
  // A veces el dato viene directo en 'usuario' y otras dentro de 'usuario.original'
  // dependiendo de cómo lo pasaste desde el listado.
  const datos = usuario.original || usuario;

  // CORRECCIÓN 1: El JSON trae "correo", no "email"
  const emailReal = datos.email || "";

  // CORRECCIÓN 2: Acceder al objeto anidado 'comercial'
  const nombreComercial = datos.comercial 
    ? datos.comercial.nombre 
    : "Sin asignar";

  // CORRECCIÓN 3: Acceder al objeto anidado 'administrador'
  const nombreAdmin = datos.administrador 
    ? `${datos.administrador.nombre} ${datos.administrador.apellidos}` 
    : "Sin asignar";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Ficha del Cliente</h2>
      
      <div className="bg-white p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        <div className="space-y-6">
          
          {/* Nombre */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Nombre</label>
            <input 
              type="text" 
              readOnly
              value={datos.nombre}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Email (Corregido) */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Email</label>
            <input 
              type="text" 
              readOnly
              value={emailReal} // Usamos la variable corregida
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Teléfono */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Teléfono</label>
            <input 
              type="text" 
              readOnly
              value={datos.telefono}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default"
            />
          </div>

          {/* Dirección (Dato extra útil) */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4">Dirección</label>
            <input 
              type="text" 
              readOnly
              value={datos.direccion || ""}
              className="w-2/3 border border-gray-600 rounded-full py-1 px-4 text-center focus:outline-none bg-white cursor-default text-sm"
            />
          </div>

          <hr className="border-gray-300 my-4" />

          {/* ADMINISTRADOR (Nuevo campo añadido) */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4 leading-tight">Admin. Responsable</label>
            <div className="relative w-2/3">
              <input 
                type="text"
                readOnly
                value={nombreAdmin} // Usamos el nombre compuesto
                className="w-full border border-gray-600 rounded-full py-1 px-4 text-center bg-white cursor-default font-semibold text-gray-700"
              />
            </div>
          </div>

          {/* COMERCIAL (Corregido para mostrar nombre) */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-normal text-black w-1/3 text-right pr-4 leading-tight">Comercial Asignado</label>
            <div className="relative w-2/3">
              <input 
                type="text"
                readOnly
                value={nombreComercial} // Usamos el nombre del comercial
                className="w-full border border-gray-600 rounded-full py-1 px-4 text-center bg-white cursor-default font-semibold text-gray-700"
              />
            </div>
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center pt-6">
            <button 
                onClick={onVolver}
                className="bg-[#bd0026] text-white font-medium py-3 px-14 rounded-full hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform"
            >
              Volver
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientesTable;