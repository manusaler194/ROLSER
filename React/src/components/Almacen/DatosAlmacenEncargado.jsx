import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from "../../utils/api"; 

const DatosAlmacenEncargado = () =>{
  const [almacen,setAlmacen] = useState([]);
  const { id } = useParams();
  
  useEffect(()=>{
    const cargarAlmacen = async () =>{
      const response = await apiFetch(`http://localhost/api/almacenes/${id}`);
      const data = await response.json();
      setAlmacen(data.almacen[0]);
    }
    cargarAlmacen();
  },[id])

const inputClasses = "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none bg-gray-50 text-gray-700 cursor-default appearance-none";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-10">
      
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2rem shadow-lg p-6 sm:p-10 relative">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Datos del Almacén
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="block ml-4 text-sm font-bold text-gray-600">Dirección</label>
            <input type="text" value={almacen.direccion} className={inputClasses} readOnly />

            <label className="block ml-4 text-sm font-bold text-gray-600">Capacidad Total</label>
            <input type="text" value={`${almacen.capacidad} unidades`} className={inputClasses} readOnly />

            <label className="block ml-4 text-sm font-bold text-gray-600">Encargado</label>
            <div className="relative">
              <input 
                type="text" 
                value={almacen.encargado_almacen?.nombre} 
                className={inputClasses} 
                readOnly 
              />
            </div>
          </div>
          
          <Link 
            to="/GestionAlmacenEncargado" 
            className="block w-full py-4 mt-4 bg-[#bc002d] text-white font-bold rounded-full text-center shadow-md hover:bg-red-800 transition-all active:scale-[0.98] cursor-pointer"
          > 
            Volver
          </Link>   
        </form>
      </div>
    </div>
  );

}
export default DatosAlmacenEncargado;