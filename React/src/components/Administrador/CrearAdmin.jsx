import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearAdmin = () => {
  const navegar = useNavigate();

  // URL de tu API
  const URL_API = "http://192.168.0.14:8008/api/administradores/guardar";

  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.message || "Error al crear el administrador");
      }

      // Éxito
      alert("Administrador creado con éxito.");
      
      // CAMBIO REALIZADO AQUÍ: Redirigir a /usuarios
      navegar('/usuarios'); 

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Padding ajustado: p-6 en móvil para ganar espacio, p-10 en escritorio */}
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
          Nuevo Administrador
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-4 sm:space-y-5">
          {/* Nombre y Apellidos (Ocupan 1 columna en móvil, 2 en pantallas a partir de tamaño sm) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={datos.nombre}
                onChange={manejarCambio}
                className="w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all"
                placeholder="Ej. Juan"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                required
                value={datos.apellidos}
                onChange={manejarCambio}
                className="w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all"
                placeholder="Ej. Pérez"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={datos.email}
              onChange={manejarCambio}
              className="w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all"
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              required
              value={datos.telefono}
              onChange={manejarCambio}
              className="w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all"
              placeholder="600 000 000"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              value={datos.password}
              onChange={manejarCambio}
              className="w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Botones - Apilados en móvil (Cancelar debajo, Crear arriba), lado a lado en PC */}
          <div className="flex flex-col-reverse sm:flex-row justify-center pt-6 sm:pt-8 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navegar(-1)}
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
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {cargando ? "Guardando..." : "Crear Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearAdmin;