import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../Conjunto/Header";
import logo from "/src/assets/Header/logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://100.25.154.102/api/login", {
        email,
        password,
      });
      console.log(response.data);
      const { user, token, role } = response.data;

      const userConRole = { ...user, role: role };

      login(userConRole, token);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error: Credenciales inválidas");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#b5121b]">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-80 p-8 rounded shadow-lg"
        >
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Rolser Logo" className="h-12 object-contain" />
          </div>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Nombre de usuario"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 text-sm rounded transition-colors"
            >
              Acceder
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              No estoy registrado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
