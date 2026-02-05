import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const DatosAlmacen = () =>{
  const [almacen,setAlmacen] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
    axios
    .get(`http://localhost/api/almacenes/${id}`)
    .then(response =>{
      console.log(response.data.almacen)
      setAlmacen(response.data.almacen);
    })
  },[id])


const inputClasses = "w-full px-5 py-3 mb-10 border border-gray-400 rounded-full focus:outline-none bg-gray-50 text-gray-700 cursor-default appearance-none";

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-150 h-150 p-10 bg-white border border-gray-200 rounded-2rem shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Datos del Almacén</h2>
            
            <form> 
                <input type="text" value={almacen.direccion} className={inputClasses} readOnly />

                <input type="text" value={`${almacen.capacidad} unidades`} className={inputClasses} readOnly />

                <div className="relative mb-4">
                    <input type="text" value={almacen.encargado_almacen?.nombre || "Sin encargado"} className={inputClasses} readOnly />
                </div>

                <div onClick={() => navigate('/GestionAlmacen')} className="w-full py-4 mt-2 bg-[#bc002d] text-white font-bold rounded-full text-center shadow-inner cursor-pointer">Volver</div>
            </form>
        </div>

        <div className="absolute bottom-20 right-20">
            <button  onClick={() => navigate(`/ModificarAlmacen/${id}`)}  className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer">Modificar</button>
        </div>
    </div>
);

}
export default DatosAlmacen;