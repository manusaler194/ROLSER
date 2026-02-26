import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/Header/logo.jpg";
import { registerRequest } from "../../utils/api";
import Swal from 'sweetalert2'; // <-- Importamos SweetAlert2

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerRequest(formData);

      if (response.ok) {
        // Alerta de éxito con auto-cierre
        await Swal.fire({
          icon: 'success',
          title: '¡Registro completado!',
          text: 'Tu cuenta ha sido creada con éxito.',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        // Alerta de error si el servidor devuelve fallo (ej. email ya registrado)
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: errorData.message || 'Hubo un problema al crear la cuenta.',
          confirmButtonColor: '#b5121b'
        });
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      // Alerta de error de conexión
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.',
        confirmButtonColor: '#b5121b'
      });
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

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 px-3 py-2 text-md focus:ring-1 focus:ring-red-500 outline-none"
            onChange={handleChange}
            required
          />

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