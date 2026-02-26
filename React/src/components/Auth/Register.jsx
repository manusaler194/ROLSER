import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/Header/logo.jpg";
import { registerRequest } from "../../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerRequest(formData);

      if (response.ok) {
        alert("Registro completado");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#b5121b] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded shadow-lg"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-40 object-contain" />
        </div>

        <h2 className="text-center text-xl font-bold mb-4 text-gray-700">
          Registro de Cliente
        </h2>

        <div className="space-y-4">
          <input
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            className="w-full border border-gray-300 px-3 py-2 text-md focus:ring-1 focus:ring-red-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="w-full border border-gray-300 px-3 py-2 text-md focus:ring-1 focus:ring-red-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="telefono"
            type="text"
            placeholder="Teléfono"
            className="w-full border border-gray-300 px-3 py-2 text-md focus:ring-1 focus:ring-red-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="direccion"
            type="text"
            placeholder="Dirección completa"
            className="w-full border border-gray-300 px-3 py-2 text-md focus:ring-1 focus:ring-red-500 outline-none"
            onChange={handleChange}
            required
          />

          <div className="relative w-full">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full border border-gray-300 px-3 py-2 pr-10 text-md focus:ring-1 focus:ring-red-500 outline-none"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600 transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 8.245 7.051 4.5 12 4.5c4.949 0 8.587 3.745 9.964 7.178.07.242.07.483 0 .725-1.377 3.433-5.015 7.178-9.964 7.178-4.949 0-8.587-3.745-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-2 text-md rounded transition-colors font-semibold"
          >
            Crear Cuenta
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-md font-medium text-gray-600 hover:text-red-700 transition-colors"
          >
            ¿Ya tienes cuenta? Inicia sesión aquí
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;