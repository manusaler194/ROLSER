import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearComercial = () => {
  const navigate = useNavigate();

  // URL unificada (igual que en los GET)
  const URL_API_GUARDAR = "http://192.168.0.14:8008/api/comerciales/guardar";

  // Estado del formulario
  const [comercial, setComercial] = useState({
    nombre: "",
    contacto: "",
    email: "",
    password: "",
    id_administrador: "",
  });

  // Estado para la lista de administradores (Select)
  const [administradores, setAdministradores] = useState([]);
  const [cargando, setCargando] = useState(false);

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
    setCargando(true);
    
    try {
      // Preparamos los datos (convertimos ID a entero o null)
      const datosEnviados = {
        ...comercial,
        id_administrador: comercial.id_administrador
          ? parseInt(comercial.id_administrador)
          : null,
      };

      await axios.post(URL_API_GUARDAR, datosEnviados);
      
      alert("Comercial creado con éxito");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error creando comercial:", error);
      
      // Mostrar error real si viene de validación de Laravel (422)
      if (error.response && error.response.status === 422) {
        const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
        alert("Corrije estos errores:\n" + mensajesError);
      } else {
        alert("Error al crear el comercial. Revisa la consola.");
      }
    } finally {
      setCargando(false);
    }
  };

  // Clases estandarizadas (como en CrearCliente)
  const claseInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
  const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
        
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
          Nuevo Comercial
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" autoComplete="off">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={claseLabel}>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Carlos Ruiz"
                value={comercial.nombre}
                className={claseInput}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className={claseLabel}>Teléfono</label>
              <input
                type="text"
                name="contacto"
                placeholder="Ej. 600 123 456"
                value={comercial.contacto}
                className={claseInput}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className={claseLabel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="correo@empresa.com"
              value={comercial.email}
              className={claseInput}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className={claseLabel}>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={comercial.password}
              className={claseInput}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className={claseLabel}>Administrador Responsable</label>
            <select
              name="id_administrador"
              value={comercial.id_administrador}
              className={claseInput}
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

          {/* Botones Adaptativos */}
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
              {cargando ? "Guardando..." : "Crear Comercial"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CrearComercial;