import React from 'react';
import { useNavigate } from 'react-router-dom';

const Ficha = ({ usuario, tipo, onVolver }) => {
  const navigate = useNavigate();

  // Verificamos que llegue el usuario
  if (!usuario) return <p className="text-center p-4 text-xl">No hay datos para mostrar.</p>;

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
      {/* Título más grande: de text-2xl a text-3xl/4xl */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black text-center">{titulo}</h2>
      
      {/* Contenedor principal ligeramente más ancho (max-w-2xl) para acomodar texto más grande */}
      <div className="bg-white p-6 sm:p-10 rounded-[30px] border border-gray-400 shadow-sm w-full max-w-2xl">
        <div className="space-y-5 sm:space-y-8">
          
          {/* Mapeo dinámico de los campos */}
          {campos.map((campo, index) => {
            if (campo.isDivider) {
              return <hr key={index} className="border-gray-300 my-4" />;
            }

            return (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
                {/* Etiquetas (labels) más grandes: de text-lg/xl a text-xl/2xl */}
                <label className="text-xl sm:text-2xl font-normal text-black w-full sm:w-1/3 sm:text-right sm:pr-4 pl-2 sm:pl-0 leading-tight">
                  {campo.label}
                </label>
                <div className="relative w-full sm:w-2/3">
                  
                  {/* Si el campo es de tipo 'select' (Admin o Encargado) */}
                  {campo.tipoRender === 'select' ? (
                    <>
                      <select 
                        disabled
                        /* Select con texto más grande y padding ajustado: text-lg/xl, py-3/py-2 */
                        className="w-full appearance-none border border-gray-600 rounded-full py-3 sm:py-2 px-5 text-lg sm:text-xl text-center bg-white opacity-100 font-bold text-gray-700 cursor-default"
                      >
                        <option>{campo.value}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                        <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    /* Input normal con texto más grande y padding ajustado: text-lg/xl, py-3/py-2 */
                    <input 
                      type="text" 
                      readOnly
                      value={campo.value}
                      className={`w-full border border-gray-600 rounded-full py-3 sm:py-2 px-5 text-lg sm:text-xl text-center focus:outline-none cursor-default ${
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
            <div className="flex flex-col-reverse sm:flex-row justify-center pt-6 gap-4 sm:gap-6">
              <button 
                onClick={onVolver}
                className="bg-white border border-gray-400 text-gray-700 text-lg sm:text-xl font-medium py-3 px-10 w-full sm:w-auto rounded-full hover:bg-gray-100 transition-colors shadow-sm"
              >
                Volver
              </button>
              <button 
                onClick={() => navigate(rutaModificar)}
                className="bg-[#bd0026] text-white text-lg sm:text-xl font-medium py-3 px-10 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-md"
              >
                Modificar
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-6 sm:pt-8">
              <button 
                onClick={onVolver}
                className="bg-[#bd0026] text-white text-lg sm:text-xl font-medium py-3 px-14 w-full sm:w-auto rounded-full hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform"
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