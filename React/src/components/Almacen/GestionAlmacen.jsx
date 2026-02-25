import React, { useState, useEffect } from "react";
import iconoDesplegable from "/src/assets/desplegable.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../utils/api";
import Paginacion from "../Conjunto/Paginacion";

const GestionAlmacen = () => {
  const { user } = useAuth();
  const [abrirMenu, setAbrirMenu] = useState(null);
  const [almacenes, setAlmacenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  console.log(user)
  const isAdmin = user?.role === "admin";

  const cargarAlmacenes = async () => {
    try {
      const response = await apiFetch("http://localhost/api/almacenes");
      const data = await response.json();
      console.log(data.almacen)
      setAlmacenes(data.almacen);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  useEffect(() => {
    cargarAlmacenes();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este almacén?")) return;
    
    try {
      const response = await apiFetch(
        `http://localhost/api/almacenes/borrar/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setAbrirMenu(null);
        alert("Almacén eliminado");
        cargarAlmacenes();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const almacenesFiltrados = isAdmin
    ? almacenes
    : almacenes.filter((almacen) => almacen.id_encargado === user?.id_encargado);

  const ultimoIndex = paginaActual * registrosPorPagina;
  const primerIndex = ultimoIndex - registrosPorPagina;
  const almacenesPaginados = almacenesFiltrados.slice(primerIndex, ultimoIndex);
  const totalPaginas = Math.ceil(almacenesFiltrados.length / registrosPorPagina);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900 tracking-tight">
              {isAdmin ? "Almacenes" : "Mis Almacenes"}
            </h2>
            <span 
              className={`px-3 py-1 rounded-full text-xs font-bold mt-2 inline-block ${
                isAdmin ? "bg-gray-200 text-gray-700" : "bg-[#757575] text-white"
              }`}
            >
              {isAdmin ? "Total: " : "Asignados: "} {almacenesFiltrados.length}
            </span>
          </div>

          {isAdmin && (
            <Link
              to="/CrearAlmacen"
              className="w-full sm:w-auto bg-[#bd0026] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex items-center justify-center gap-2"
            >
              <span className="text-xl leading-none pb-1">+</span> Nuevo
            </Link>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
          {almacenesPaginados.length > 0 ? (
            almacenesPaginados.map((almacen) => (
              <div
                key={almacen.id_almacen}
                className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">

                  {!isAdmin && <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>}
                  <span className="text-base sm:text-lg font-bold text-gray-800 truncate pr-4">
                    {almacen.direccion}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setAbrirMenu(
                        abrirMenu === almacen.id_almacen ? null : almacen.id_almacen
                      )
                    }
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-md font-bold text-gray-700 transition-all cursor-pointer"
                  >
                    Opciones
                    <img 
                      src={iconoDesplegable} 
                      className={`w-4 h-4 transition-transform duration-300 ${abrirMenu === almacen.id_almacen ? 'rotate-180' : ''}`}
                      alt="Flecha"
                    />
                  </button>

                  {abrirMenu === almacen.id_almacen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
                      <div className="flex flex-col text-md">
                        {isAdmin ? (
                          <>
                            <Link
                              to={`/ModificarAlmacen/${almacen.id_almacen}`}
                              className="px-4 py-2 hover:bg-gray-100"
                            >
                              Modificar
                            </Link>
                            <button
                              onClick={() => handleEliminar(almacen.id_almacen)}
                              className="px-4 py-2 hover:bg-gray-100 text-left text-red-600 font-medium"
                            >
                              Eliminar
                            </button>
                            <Link
                              to={`/DatosAlmacen/${almacen.id_almacen}`}
                              className="px-4 py-2 hover:bg-gray-100"
                            >
                              Ver datos
                            </Link>
                          </>
                        ) : (
                          <Link
                            to={`/DatosAlmacen/${almacen.id_almacen}`}
                            className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 border-l-4 border-transparent hover:border-red-600 transition-all"
                          >
                            Ver detalles
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              {isAdmin ? (
                "No se encontraron almacenes."
              ) : (
                <span className="italic text-lg">No tienes almacenes asignados actualmente.</span>
              )}
            </div>
          )}
        </div>

        {totalPaginas > 1 && (
           <div className="mt-6 flex justify-center">
             <Paginacion 
               paginaActual={paginaActual} 
               totalPaginas={totalPaginas} 
               cambiarPagina={setPaginaActual} 
             />
           </div>
        )}

      </div>
    </div>
  );
};

export default GestionAlmacen;