import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const DatosAlmacen = () =>{
  const [almacen,setAlmacen] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
    const cargarAlmacen = async () =>{
      const response = await fetch(`http://localhost/api/almacenes/${id}`);
      const data = await response.json();
      setAlmacen(data.almacen[0]);
    }
    cargarAlmacen();
  },[id])


const inputClasses = "w-full px-5 py-3 mb-10 border border-gray-400 rounded-full focus:outline-none bg-gray-50 text-gray-700 cursor-default appearance-none";

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      {/* Cambié h-150 por min-h-fit y pb-10 para que crezca según el contenido */}
      <div className="w-full max-w-2xl min-h-fit p-10 bg-white border border-gray-200 rounded-2rem shadow-lg relative">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Datos del Almacén</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          
          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Dirección</label>
          <input type="text" value={almacen.direccion || ''} className={inputClasses} readOnly />

          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Capacidad Total</label>
          <input type="text" value={`${almacen.capacidad || 0} unidades`} className={inputClasses} readOnly />

          <label className="block ml-4 mb-1 text-sm font-bold text-gray-600">Encargado</label>
          <div className="relative mb-6">
            <input type="text" value={almacen.encargado_almacen?.nombre || "Sin encargado asignado"} className={inputClasses} readOnly />
          </div>
          
          <div onClick={() => navigate('/GestionAlmacen')} className="w-full py-4 bg-[#bc002d] text-white font-bold rounded-full text-center shadow-md hover:bg-red-800 transition-colors cursor-pointer" > Volver</div>
        </form>
      </div>

      <div className="absolute bottom-10 right-10 lg:bottom-20 lg:right-20">
        <button onClick={() => navigate(`/ModificarAlmacen/${id}`)} className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer">Modificar </button>
      </div>
    </div>
);

}
export default DatosAlmacen;