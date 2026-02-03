import React, { useState, useEffect } from 'react';
// Importamos el icono
import iconoDesplegable from '/src/assets/desplegable.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GestionAlmacen = () => {
  const [abrirMenu, setAbrirMenu] = useState(null);
  const [almacenes,setAlmacenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    axios
      .get('http://localhost/api/almacenes')
      .then(response =>{
        console.log("Cargado")
        console.log(response.data)
        setAlmacenes(response.data)
      })
  },[]);

  return (
    <div className="p-10 flex flex-col h-full">
      <div className="flex flex-col gap-6 w-72">
        {almacenes.map((almacen) => (
          <div key={almacen.id_almacen} className="relative flex items-center">

            <button 
              onClick={() => setAbrirMenu(abrirMenu === almacen.id_almacen ? null : almacen.id_almacen)}
              className="flex items-center justify-between w-full bg-[#757575] text-white px-5 py-3 rounded-2xl hover:bg-gray-600 cursor-pointer">
              <span className="text-xl font-medium">{almacen.direccion}</span>
              
              <img src={iconoDesplegable} className={`w-6 h-6 transition-transform duration-500  invert ${abrirMenu === almacen.id_almacen ? 'rotate-180' : 'rotate-0'}`}/>
            </button>
            
            {abrirMenu === almacen.id_almacen && (
              <div className="absolute left-full ml-10 bg-white border-2 border-gray-400">
                <div className="flex flex-col text-xl">
                  <button className="px-6 py-2 border-b-2 border-gray-400 hover:bg-gray-100 text-left cursor-pointer">Modificar</button>
                  <button className="px-6 py-2 border-b-2 border-gray-400 hover:bg-gray-100 text-left cursor-pointer">Eliminar</button>
                  <button className="px-6 py-2 hover:bg-gray-100 text-left cursor-pointer">Ver datos</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 right-20">
        <button onClick={()=> navigate('/CrearAlmacen')} className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer">Crear</button>
      </div>
    </div>
  );
};

export default GestionAlmacen;