import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/Header/logo.jpg";
import { loginRequest } from "../../utils/api";
import Swal from 'sweetalert2'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest(email, password);
      
      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrecto");
      }

      const data = await response.json();
      const { user, token, role } = data;

      const userConRole = { ...user, role };
      login(userConRole, token);

      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de acceso',
        text: 'Usuario o contraseña incorrectos.',
        confirmButtonColor: '#b5121b'
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-700 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 8.245 7.051 4.5 12 4.5c4.949 0 8.587 3.745 9.964 7.178.07.242.07.483 0 .725-1.377 3.433-5.015 7.178-9.964 7.178-4.949 0-8.587-3.745-9.964-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
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