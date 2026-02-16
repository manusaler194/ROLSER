import React, { useState, useEffect } from "react";
import iconoDesplegable from "/src/assets/desplegable.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiFetch } from "../../utils/api";
import Paginacion from "../Conjunto/Paginacion";
const GestionAlmacen = () => {
  const [abrirMenu, setAbrirMenu] = useState(null);
  const [almacenes, setAlmacenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const cargarAlmacenes = async () => {
    try {
      const response = await apiFetch("http://localhost/api/almacenes");
      const data = await response.json();
      setAlmacenes(data.almacen);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };
  useEffect(() => {
    cargarAlmacenes();
  }, []);
  const ultimoIndex = paginaActual * registrosPorPagina;
  const primerIndex = ultimoIndex - registrosPorPagina;
  const almacenesPaginados = almacenes.slice(primerIndex, ultimoIndex);
  const totalPaginas = Math.ceil(almacenes.length / registrosPorPagina);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este almacén?")) return;
    try {
      const response = await apiFetch(
        `http://localhost/api/almacenes/borrar/${id}`,
        {
          method: "DELETE",
        },
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
return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
    <div className="max-w-4xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900">
            Almacenes
          </h2>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
            Total: {almacenes.length}
          </span>
        </div>

        <Link
          to="/CrearAlmacen"
          className="w-full sm:w-auto bg-[#bd0026] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex items-center justify-center gap-2"
        >
          <span className="text-xl leading-none pb-1">+</span> Nuevo
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {almacenesPaginados.length > 0 ? (
          almacenesPaginados.map((almacen) => (
            <div
              key={almacen.id_almacen}
              className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors relative"
            >
              <span className="text-base sm:text-lg font-bold text-gray-800 truncate pr-4">
                {almacen.direccion}
              </span>

              <div className="relative">
                <button
                  onClick={() =>
                    setAbrirMenu(
                      abrirMenu === almacen.id_almacen ? null : almacen.id_almacen
                    )
                  }
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full text-sm font-bold"
                >
                  Opciones
                </button>

                {abrirMenu === almacen.id_almacen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-50">
                    <div className="flex flex-col text-sm">
                      <Link
                        to={`/ModificarAlmacen/${almacen.id_almacen}`}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        Modificar
                      </Link>

                      <button
                        onClick={() => handleEliminar(almacen.id_almacen)}
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        Eliminar
                      </button>

                      <Link
                        to={`/DatosAlmacen/${almacen.id_almacen}`}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        Ver datos
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-400">
            No se encontraron almacenes.
          </div>
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="mt-6">
          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={(n) => {
              setPaginaActual(n);
              setAbrirMenu(null);
            }}
          />
        </div>
      )}
    </div>
  </div>
);

};

export default GestionAlmacen;
