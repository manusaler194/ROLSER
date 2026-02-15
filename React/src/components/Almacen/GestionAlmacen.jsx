import React, { useState, useEffect } from 'react';
import iconoDesplegable from '/src/assets/desplegable.svg';
import { Link } from 'react-router-dom';
import axios from "axios";
import { apiFetch } from "../../utils/api"; 
import Paginacion from '../Conjunto/Paginacion';
const GestionAlmacen = () => {
  const [abrirMenu, setAbrirMenu] = useState(null);
  const [almacenes, setAlmacenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10; 

  const cargarAlmacenes = async () => {
    try {
      const response = await apiFetch('http://localhost/api/almacenes');
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
    if(!window.confirm("¿Seguro que quieres eliminar este almacén?")) return;
    try {
      const response = await apiFetch(`http://localhost/api/almacenes/borrar/${id}`, {
        method: 'DELETE',
      });
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
    <div className="p-10 flex flex-col h-full relative">
      <div className="flex flex-col gap-6 w-72">
        {almacenesPaginados.map((almacen) => (
          <div key={almacen.id_almacen} className="relative flex items-center w-100 h-20">
            <button 
              onClick={() => setAbrirMenu(abrirMenu === almacen.id_almacen ? null : almacen.id_almacen)}
              className="flex items-center justify-between w-full bg-[#757575] text-white px-5 py-3 rounded-2xl hover:bg-gray-600 cursor-pointer">
              <span className="text-xl font-medium truncate pr-2">{almacen.direccion}</span>
              <img 
                src={iconoDesplegable} 
                className={`w-6 h-6 transition-transform duration-500 invert ${abrirMenu === almacen.id_almacen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
            
            {abrirMenu === almacen.id_almacen && (
              <div className="absolute left-full ml-10 bg-white border-2 border-gray-400 z-50 shadow-xl">
                <div className="flex flex-col text-xl">
                  <Link to={`/ModificarAlmacen/${almacen.id_almacen}`} className="px-6 py-2 border-b-2 border-gray-400 hover:bg-gray-100 text-left">Modificar</Link>
                  <button onClick={() => handleEliminar(almacen.id_almacen)} className="px-6 py-2 border-b-2 border-gray-400 hover:bg-gray-100 text-left cursor-pointer">Eliminar</button>
                  <Link to={`/DatosAlmacen/${almacen.id_almacen}`} className="px-6 py-2 hover:bg-gray-100 text-left">Ver datos</Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-72"> 
        <Paginacion 
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={(n) => {
            setPaginaActual(n);
            setAbrirMenu(null);
          }}
        />
      </div>
      <div className="absolute bottom-20 right-20">
        <Link to='/CrearAlmacen' className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95">Crear</Link>
      </div>
    </div>
  );
};

export default GestionAlmacen;