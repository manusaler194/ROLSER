import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearComercial = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [comercial, setComercial] = useState({
    nombre: "",
    contacto: "",
    email: "",
    password: "", // Necesario para crear un usuario con acceso
    id_administrador: "",
  });

  // Estado para la lista de administradores (Select)
  const [administradores, setAdministradores] = useState([]);

  // Cargar administradores al iniciar
  useEffect(() => {
    const cargarAdmins = async () => {
      try {
        const res = await axios.get("http://192.168.0.14:8008/api/administradores");
        
        // Carga robusta detectando la estructura de la respuesta
        const lista = res.data.admin || res.data.administradores || res.data;
        setAdministradores(Array.isArray(lista) ? lista : []);
        
      } catch (error) {
        console.error("Error cargando administradores:", error);
      }
    };
    cargarAdmins();
  }, []);

  const handleChange = (e) => {
    setComercial({
      ...comercial,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Preparamos los datos (convertimos ID a entero o null)
      const datosEnviados = {
        ...comercial,
        id_administrador: comercial.id_administrador
          ? parseInt(comercial.id_administrador)
          : null,
      };

      // Ajusta la ruta de tu API según corresponda
      await axios.post("http://192.168.0.14:8008/api/comerciales/guardar", datosEnviados);
      
      alert("Comercial creado con éxito");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error creando comercial:", error);
      alert("Error al crear el comercial. Revisa la consola.");
    }
  };

  const inputClasses =
    "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Crear nuevo <span className="text-[#b3002d]">Comercial</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* NOMBRE */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={comercial.nombre}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* CONTACTO */}
          <input
            type="text"
            name="contacto"
            placeholder="Teléfono de contacto"
            value={comercial.contacto}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={comercial.email}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* CONTRASEÑA (Nueva para el Login) */}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={comercial.password}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* SELECT ADMINISTRADOR (Jefe del comercial) */}
          <div className="relative mb-8">
            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
              Administrador Responsable
            </label>
            <select
              name="id_administrador"
              value={comercial.id_administrador}
              className={inputClasses}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {administradores.map((admin) => (
                <option 
                  key={admin.id || admin.id_administrador} 
                  value={admin.id || admin.id_administrador}
                >
                  {admin.nombre} {admin.apellidos}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"
          >
            GUARDAR COMERCIAL
          </button>
        </form>
      </div>

      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
        <button
          onClick={() => navigate("/usuarios")}
          className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default CrearComercial;