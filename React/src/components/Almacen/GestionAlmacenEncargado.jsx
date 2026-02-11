import React, { useState, useEffect } from 'react';
import iconoDesplegable from '/src/assets/desplegable.svg';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const GestionAlmacenEncargado = () => {
  const [abrirMenu, setAbrirMenu] = useState(null);
  const [almacenes, setAlmacenes] = useState([]);
  const navigate = useNavigate();
  const { user, role } = useAuth(); 
  
  const cargarAlmacenes = async () => {
    try {
        console.log(user);

        const response = await fetch('http://localhost/api/almacenes');
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
  const handleEliminar = async (id) => {
    try {
        const response = await fetch(`http://localhost/api/almacenes/borrar/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setAbrirMenu(null);
            alert("Almacén eliminado");
            cargarAlmacenes();
        } else {
            alert("No se pudo eliminar el almacén.");
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error de red al intentar eliminar.");
    }
  };
  
  return (
    <div className="p-10 flex flex-col h-full">
      <div className="flex flex-col gap-6 w-72">
        {almacenesFiltrados.map((almacen) => (
          <div key={almacen.id_almacen} className="relative flex items-center w-100 h-20">
            <button 
              onClick={() => setAbrirMenu(abrirMenu === almacen.id_almacen ? null : almacen.id_almacen)}
              className="flex items-center justify-between w-full bg-[#757575] text-white px-5 py-3 rounded-2xl hover:bg-gray-600 cursor-pointer">
              <span className="text-xl font-medium">{almacen.direccion}</span>
              <img src={iconoDesplegable} className={`w-6 h-6 transition-transform duration-500 invert ${abrirMenu === almacen.id_almacen ? 'rotate-180' : 'rotate-0'}`}/>
            </button>
            
            {abrirMenu === almacen.id_almacen && (
              <div className="absolute left-full ml-10 bg-white border-2 border-gray-400">
                <div className="flex flex-col text-xl">
                  <button onClick={()=> navigate(`/DatosAlmacenEncargado/${almacen.id_almacen}`)} className="px-6 py-2 hover:bg-gray-100 text-left cursor-pointer">Ver datos</button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {almacenesFiltrados.length === 0 && (
          <p className="text-gray-500 italic">No tienes almacenes asignados.</p>
        )}
      </div>
    </div>
  );
};

export default GestionAlmacenEncargado;