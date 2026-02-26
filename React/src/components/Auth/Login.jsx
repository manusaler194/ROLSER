import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/Header/logo.jpg";
import { loginRequest } from "../../utils/api";
import Swal from 'sweetalert2'; // <-- Importamos SweetAlert2

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest(email, password);
      
      // Si la respuesta no es exitosa, forzamos el error para que vaya al catch
      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrecto");
      }

      const data = await response.json();
      const { user, token, role } = data;

      const userConRole = { ...user, role };
      login(userConRole, token);

      // Pequeña alerta de éxito antes de redirigir
      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        showConfirmButton: false,
        timer: 1500, // Desaparece rápido en 1.5 segundos
        timerProgressBar: true
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      // Alerta de error con Swal
      Swal.fire({
        icon: 'error',
        title: 'Error de acceso',
        text: 'Usuario o contraseña incorrectos.',
        confirmButtonColor: '#b5121b' // Usamos el mismo rojo del fondo del login
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#b5121b] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-10 rounded-xl shadow-2xl"
      >
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Rolser Logo" className="h-40 object-contain" />
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-md font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <label className="block text-md font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-3 mt-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]"
          >
            Acceder
          </button>
        </div>

        <div className="text-center mt-8 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-md font-medium text-gray-600 hover:text-red-700 transition-colors"
          >
            ¿No tienes cuenta? <span className="underline">Regístrate aquí</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;