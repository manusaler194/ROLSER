import React, { useEffect, useState } from "react";
import iconoDesplegable from '/src/assets/desplegable.svg';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from "../../utils/api"; 

const CrearAlmacen = () =>{
    const [almacen,setAlmacen] = useState({
        direccion : '',
        capacidad : '',
        id_encargado: ''
    });
    const [encargados, setEncargados] = useState([]);
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
        const cargarEncargados = async () => {
            try {
                const response = await apiFetch('http://localhost/api/encargadoAlmacen');
                const data = await response.json();
                console.log(data);
                setEncargados(data.encargadoAlmacen);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        cargarEncargados();
    }, []);
    
    const handleSubmit = async (e) => {
        console.log("a");
        e.preventDefault();
        try {
            const response = await apiFetch('http://localhost/api/almacenes/guardar', {
                method: 'POST',
                body: JSON.stringify(almacen)
            });
            const data = await response.json();
            console.log("Funciona:", data);
            alert("Almacén creado con éxito");
            navigate('/GestionAlmacen');
        } catch (error) {
            console.error("Error al enviar datos:", error.message);
            alert(error.message);
        }
    };


    const inputClasses = "w-full px-5 py-3 mb-10 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";
    
return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
    <div className="max-w-4xl mx-auto">

      <button
        onClick={() => navigate("/GestionAlmacen")}
        className="text-[#bd0026] font-bold mb-6 hover:underline flex items-center gap-2"
      >
        ← VOLVER AL MENÚ
      </button>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900">
            Crear Almacén
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={almacen.direccion}
            className="w-full p-3 sm:p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white text-sm sm:text-base"
            onChange={handleDireccion}
            required
          />

          <input
            type="number"
            name="capacidad"
            placeholder="Capacidad"
            value={almacen.capacidad}
            className="w-full p-3 sm:p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white text-sm sm:text-base"
            onChange={handleCapacidad}
            min="1"
            required
          />

          <select
            name="id_encargado"
            value={almacen.id_encargado}
            className="w-full p-3 sm:p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white text-sm sm:text-base appearance-none"
            onChange={handleEncargado}
            required
          >
            <option value="" disabled>
              Seleccionar Encargado
            </option>
            {encargados.map((encargado) => (
              <option
                key={encargado.id_encargado}
                value={encargado.id_encargado}
              >
                {encargado.nombre}
              </option>
            ))}
          </select>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#bd0026] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase"
            >
              Crear
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
);

    
}
export default CrearAlmacen;