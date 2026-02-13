import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearEncargado = () => {
  const navigate = useNavigate();

  const [encargado, setEncargado] = useState({
    nombre: "",
    telefono: "",
    email: "", 
    password: "",
  });

  const [cargando, setCargando] = useState(false); // Añadido para controlar el botón de envío

  const handleChange = (e) => {
    setEncargado({
      ...encargado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    try {
      await axios.post("http://localhost/api/encargadoAlmacen/guardar", encargado);
      
      alert("Encargado creado con éxito");
      navigate("/usuarios"); 
    } catch (error) {
      console.error("Error:", error);
      
      // Manejo de errores de validación de Laravel (como en los anteriores)
      if (error.response && error.response.status === 422) {
        const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
        alert("Corrige estos errores:\n" + mensajesError);
      } else {
        alert("Error al crear el encargado. Revisa la consola.");
      }
    } finally {
      setCargando(false);
    }
  };

  // Clases estandarizadas para mantener coherencia visual con el resto de la app
  const claseInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
  const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Contenedor principal adaptable */}
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
        
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
          Registrar <span className="text-[#b3002d]">Encargado</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" autoComplete="off">
          
          {/* Fila 1: Nombre y Teléfono (1 columna en móvil, 2 en PC) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={claseLabel}>Nombre y Apellidos</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Martín López"
                value={encargado.nombre}
                className={claseInput}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className={claseLabel}>Teléfono</label>
              <input
                type="text"
                name="telefono"
                placeholder="Ej. +34 600 123 456"
                value={encargado.telefono}
                className={claseInput}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila 2: Email */}
          <div>
            <label className={claseLabel}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="encargado@empresa.com"
              value={encargado.email}
              className={claseInput}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 3: Contraseña */}
          <div>
            <label className={claseLabel}>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={encargado.password}
              className={claseInput}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Botones Adaptativos (Apilados en móvil, en línea en escritorio) */}
          <div className="flex flex-col-reverse sm:flex-row justify-center pt-6 sm:pt-8 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/usuarios")}
              className="w-full sm:w-1/2 border border-gray-400 text-gray-600 font-bold py-3 px-4 rounded shadow hover:bg-gray-50 transition duration-300 uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className={`w-full sm:w-1/2 text-white font-bold py-3 px-4 rounded shadow-lg transition duration-300 uppercase ${
                cargando
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#bd0026] hover:bg-red-800"
              }`}
            >
              {cargando ? "Guardando..." : "Crear Encargado"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CrearEncargado;