import React, { useState, useEffect } from 'react';
import iconoDesplegable from '/src/assets/desplegable.svg';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../utils/api"; 

const GestionAlmacenEncargado = () => {
  const [abrirMenu, setAbrirMenu] = useState(null);
  const [almacenes, setAlmacenes] = useState([]);
  const { user } = useAuth(); 
  
  const cargarAlmacenes = async () => {
    try {
        console.log(user);
        const response = await apiFetch('http://localhost/api/almacenes');
        const data = await response.json();
        console.log(data);
        setAlmacenes(data.almacen); 
    } catch (error) {
        console.error("Error al cargar:", error);
    }
  };

  useEffect(() => {
      cargarAlmacenes();
  }, []);

  const almacenesFiltrados = almacenes.filter(almacen => almacen.id_encargado === user?.id_encargado);
  console.log(almacenesFiltrados)
  return (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
    <div className="max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900 tracking-tight">
            Mis Almacenes
          </h2>
          <span className="bg-[#757575] text-white px-3 py-1 rounded-full text-xs font-bold mt-2 inline-block">
            Asignados: {almacenesFiltrados.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {almacenesFiltrados.length > 0 ? (
          almacenesFiltrados.map((almacen) => (
            <div
              key={almacen.id_almacen}
              className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                <span className="text-base sm:text-lg font-bold text-gray-800 truncate">
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
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-700 transition-all cursor-pointer"
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
                    <div className="flex flex-col">
                      <Link
                        to={`/DatosAlmacenEncargado/${almacen.id_almacen}`}
                        className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 border-l-4 border-transparent hover:border-red-600 transition-all"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-400 italic text-lg">No tienes almacenes asignados actualmente.</p>
          </div>
        )}
      </div>

    </div>
  </div>
);
};

export default GestionAlmacenEncargado;