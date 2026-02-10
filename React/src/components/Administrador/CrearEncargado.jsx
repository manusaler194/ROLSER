import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearEncargado = () => {
  const navigate = useNavigate();

  
  const [encargado, setEncargado] = useState({
    nombre: "",
    telefono: "",
    email: "", 
  });

  const handleChange = (e) => {
    setEncargado({
      ...encargado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post("http://localhost/api/encargadoAlmacen/guardar", encargado);
      
      alert("Encargado creado con éxito");
      navigate("/usuarios"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el encargado. Revisa la consola.");
    }
  };

  const inputClasses =
    "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Registrar nuevo <span className="text-[#b3002d]">Encargado</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* NOMBRE */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre y Apellidos"
            value={encargado.nombre}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* TELÉFONO */}
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono (ej: +34 600...)"
            value={encargado.telefono}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={encargado.email}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-4 mt-4 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"
          >
            GUARDAR ENCARGADO
          </button>
        </form>
      </div>

      {/* BOTÓN VOLVER */}
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
        <button
          onClick={() => navigate("/usuarios")} // Cambia esta ruta si es necesario
          className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default CrearEncargado;