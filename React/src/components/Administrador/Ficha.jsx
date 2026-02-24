import React from 'react';
import { useNavigate } from 'react-router-dom';

const Ficha = ({ usuario, tipo, onVolver }) => {
  const navigate = useNavigate();

  // Verificamos que llegue el usuario
  if (!usuario) return <p className="text-center p-4">No hay datos para mostrar.</p>;

  // Normalizamos los datos (soporta tanto usuario anidado como directo)
  const datos = usuario.original || usuario;

  // Helpers para extraer datos comunes anidados
  const getNombreAdmin = () => datos.administrador ? `${datos.administrador.nombre} ${datos.administrador.apellidos}` : "Sin asignar";
  const getNombreComercial = () => datos.comercial ? datos.comercial.nombre : "Sin asignar";
  const getNombreCompleto = () => `${datos.nombre || ""} ${datos.apellidos || ""}`.trim();

  // Variables para configurar la vista
  let titulo = "Ficha del usuario";
  let campos = [];
  let mostrarBotonModificar = false;
  let rutaModificar = "";

  // Configuramos los campos según el tipo de ficha
  switch (tipo) {
    case 'admin':
      titulo = "Datos del usuario";
      mostrarBotonModificar = true;
      rutaModificar = `/modificar-admin/${datos.id_administrador}`;
      campos = [
        { label: "Nombre", value: getNombreCompleto() },
        { label: "Email", value: datos.email || "" },
        { label: "Teléfono", value: datos.telefono || "" },
        { label: "Rol", value: "Administrador", tipoRender: "select" },
      ];
      break;

    case 'cliente':
      titulo = "Ficha del Cliente";
      campos = [
        { label: "Nombre", value: datos.nombre || "" },
        { label: "Email", value: datos.email || "" },
        { label: "Teléfono", value: datos.telefono || "" },
        { label: "Dirección", value: datos.direccion || "" },
        { isDivider: true },
        { label: "Admin. Responsable", value: getNombreAdmin(), negrita: true },
        { label: "Comercial Asignado", value: getNombreComercial(), negrita: true },
      ];
      break;

    case 'vip':
      titulo = "Ficha Cliente VIP";
      campos = [
        { label: "Nombre", value: datos.nombre || "" },
        { label: "Email", value: datos.email || "" },
        { label: "Teléfono", value: datos.telefono || "" },
        { label: "Dirección", value: datos.direccion || "" },
        { isDivider: true },
        { 
          label: "Catálogo", 
          value: datos.catalogo ? datos.catalogo.nombre_catalogo : "Sin catálogo", 
          claseExtra: "bg-yellow-50 text-yellow-800 font-semibold" 
        },
        { label: "Admin. Responsable", value: getNombreAdmin() },
        { label: "Comercial", value: getNombreComercial() },
      ];
      break;

    case 'comercial':
      titulo = "Ficha del Comercial";
      campos = [
        { label: "Nombre", value: datos.nombre || "" },
        { label: "Email", value: datos.email || "" },
        { label: "Teléfono", value: datos.contacto || datos.telefono || "" },
        { label: "Rol", value: "Comercial", claseExtra: "bg-gray-100 text-gray-500 font-bold" },
        { label: "Admin. responsable", value: getNombreAdmin() },
      ];
      break;

    case 'encargado':
      titulo = "Datos del usuario";
      campos = [
        { label: "Nombre", value: getNombreCompleto() },
        { label: "Email", value: datos.email || "" },
        { label: "Teléfono", value: datos.telefono || "" },
        { label: "Rol", value: "Encargado", tipoRender: "select" },
      ];
      break;

    default:
      campos = [
        { label: "Nombre", value: datos.nombre || "" },
        { label: "Email", value: datos.email || "" }
      ];
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">{titulo}</h2>
      
      <div className="bg-white p-6 sm:p-8 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-lg">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Mapeo dinámico de los campos */}
          {campos.map((campo, index) => {
            if (campo.isDivider) {
              return <hr key={index} className="border-gray-300 my-4" />;
            }

            return (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="text-lg sm:text-xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0 leading-tight">
                  {campo.label}
                </label>
                <div className="relative w-full sm:w-2/3">
                  
                  {/* Si el campo es de tipo 'select' (Admin o Encargado) */}
                  {campo.tipoRender === 'select' ? (
                    <>
                      <select 
                        disabled
                        className="w-full appearance-none border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center bg-white opacity-100 font-bold text-gray-700 cursor-default"
                      >
                        <option>{campo.value}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    /* Input normal (con posibilidad de clases o negritas personalizadas) */
                    <input 
                      type="text" 
                      readOnly
                      value={campo.value}
                      className={`w-full border border-gray-600 rounded-full py-2 sm:py-1 px-4 text-center focus:outline-none cursor-default ${
                        campo.claseExtra ? campo.claseExtra : 'bg-white'
                      } ${campo.negrita ? 'font-semibold text-gray-700' : ''}`}
                    />
                  )}
                  
                </div>
              </div>
            );
          })}

          {/* Botones de acción dinámicos */}
          {mostrarBotonModificar ? (
            <div className="flex flex-col-reverse sm:flex-row justify-center pt-4 gap-3 sm:gap-4">
              <button 
                onClick={onVolver}
                className="bg-white border border-gray-400 text-gray-700 font-medium py-3 sm:py-2 px-10 w-full sm:w-auto rounded-full hover:bg-gray-100 transition-colors shadow-sm"
              >
                Volver
              </button>
              <button 
                onClick={() => navigate(rutaModificar)}
                className="bg-[#bd0026] text-white font-medium py-3 sm:py-2 px-10 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-md"
              >
                Modificar
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-4 sm:pt-6">
              <button 
                onClick={onVolver}
                className="bg-[#bd0026] text-white font-medium py-3 sm:py-2 px-14 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform"
              >
                Volver
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Ficha;