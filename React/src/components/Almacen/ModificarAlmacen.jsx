import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { apiFetch } from '../../utils/api';

const ModificarAlmacen = () =>{
      const [almacen,setAlmacen] = useState({
        direccion : '',
        capacidad : '',
        id_encargado: ''
    });
    const [encargados, setEncargados] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const handleDireccion = (e) =>{
        setAlmacen({...almacen, direccion : e.target.value})
    }
    const handleCapacidad = (e) =>{
        setAlmacen({...almacen, capacidad : e.target.value})
    }
    const handleEncargado = (e) =>{
        setAlmacen({...almacen, id_encargado : e.target.value})
    }

    useEffect(() => {
        const obtenerAlmacen = async () => {
            const response = await apiFetch(`http://localhost/api/almacenes/${id}`);
            const data = await response.json();
            console.log(data);
            const almacenRecibido = data.almacen[0];
            setAlmacen({
                direccion: almacenRecibido.direccion,
                capacidad: almacenRecibido.capacidad,
                id_encargado: almacenRecibido.id_encargado
            });
            
        };
       const obtenerEncargados = async () => {
        try {
            const response = await apiFetch('http://localhost/api/encargadoAlmacen');
            const data = await response.json();
            console.log(data);
            setEncargados(data.encargadoAlmacen);
        } catch (error) {
            console.error("Error al obtener encargados:", error);
        }
        };
        obtenerAlmacen();
        obtenerEncargados();
        },[id]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await apiFetch(`http://localhost/api/almacenes/actualizar/${id}`, {
                method: 'PUT',
                body: JSON.stringify(almacen)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Funciona:", data);
                alert("Almacén actualizado con éxito");
                navigate('/GestionAlmacen');
            } else {
                alert("Hubo un error al modificar el almacén");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Hubo un error al modificar el almacén");
        }
    }


    const inputClasses = "w-full px-5 py-3 mb-10 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";
    
   return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-10">
    
    <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2rem shadow-lg p-6 sm:p-10 relative">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Modificar Almacén
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-2"> 
        <label className="block ml-4 text-sm font-bold text-gray-600">Dirección</label>
        <input 
          type="text" 
          name="direccion" 
          placeholder="Ej: Calle Mayor 1"
          value={almacen.direccion} 
          className={inputClasses} 
          onChange={handleDireccion} 
          required
        />

        <label className="block ml-4 text-sm font-bold text-gray-600">Capacidad</label>
        <input 
          type="number" 
          name="capacidad" 
          value={almacen.capacidad} 
          className={inputClasses} 
          onChange={handleCapacidad} 
          min="1" 
          required
        />

        <label className="block ml-4 text-sm font-bold text-gray-600">Encargado de Almacén</label>
        <div className="relative mb-8">
          <select 
            name="id_encargado" 
            value={almacen.id_encargado} 
            className={`${inputClasses} appearance-none`} 
            onChange={handleEncargado} 
            onFocus={() => setMenu(true)} 
            required
          >
            <option value="" disabled>Seleccione un encargado</option>
            {encargados.map((encargado) => (
              <option key={encargado.id_encargado} value={encargado.id_encargado}>
                {encargado.nombre}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#bc002d] text-white py-4 rounded-full text-xl sm:text-2xl font-bold text-center shadow-lg hover:bg-red-800 transition-all active:scale-[0.98] cursor-pointer tracking-wide"
        >
          MODIFICAR
        </button>
      </form>
    </div>

    <div className="mt-8 lg:absolute lg:bottom-10 lg:right-10">
      <Link 
        to='/GestionAlmacen' 
        className="inline-block bg-[#bc002d] text-white px-8 py-3 sm:px-12 sm:py-4 rounded-full sm:rounded-3xl text-xl sm:text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95"
      >
        Volver
      </Link>
    </div>
  </div>
);
    

}
export default ModificarAlmacen;