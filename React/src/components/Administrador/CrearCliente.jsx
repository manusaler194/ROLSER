import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    id_administrador: "",
    id_comercial: "",
  });

  const [administradores, setAdministradores] = useState([]);
  const [comerciales, setComerciales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
        const cargarDatos = async () => {
            try {
                const resAdmins = await axios.get('http://localhost/api/administradores'); 
                const resComerciales = await axios.get('http://localhost/api/comerciales');
                
                console.log("Respuesta Admins:", resAdmins.data);
                console.log("Respuesta Comerciales:", resComerciales.data);

                // LÓGICA MÁS ROBUSTA PARA ADMINISTRADORES
                // Buscamos: data.admin (singular), data.administradores (plural) o data directamente
                const listaAdmins = resAdmins.data.admin || resAdmins.data.administradores || resAdmins.data;
                if (Array.isArray(listaAdmins)) {
                    setAdministradores(listaAdmins);
                } else {
                    setAdministradores([]); // Evita el error .map is not a function
                    console.error("La API de administradores no devolvió un array:", resAdmins.data);
                }
                
                // LÓGICA MÁS ROBUSTA PARA COMERCIALES
                // Buscamos: data.comercial (singular), data.comerciales (plural) o data directamente
                const listaComerciales = resComerciales.data.comercial || resComerciales.data.comerciales || resComerciales.data;
                if (Array.isArray(listaComerciales)) {
                     setComerciales(listaComerciales);
                } else {
                     setComerciales([]); // Evita el error .map is not a function
                     console.error("La API de comerciales no devolvió un array:", resComerciales.data);
                }

            } catch (error) {
                console.error("Error al cargar listas:", error);
                // En caso de error, aseguramos que sean arrays vacíos para que no rompa la página
                setAdministradores([]);
                setComerciales([]);
            }
        };
        cargarDatos();
    }, []);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertimos a número o null.
      // Si la cadena está vacía (""), enviamos null.
      const datosEnviados = {
        ...cliente,
        id_administrador: cliente.id_administrador
          ? parseInt(cliente.id_administrador)
          : null,
        id_comercial: cliente.id_comercial
          ? parseInt(cliente.id_comercial)
          : null,
      };

      await axios.post("http://localhost/api/clientes/guardar", datosEnviados);

      alert("Cliente creado con éxito");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error completo:", error);
      const mensajeError = error.response?.data?.message || "Error desconocido";
      alert(`Error: ${mensajeError}`);
    }
  };

  const inputClasses =
    "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Crear nuevo Cliente
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={cliente.nombre}
            className={inputClasses}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={cliente.telefono}
            className={inputClasses}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={cliente.correo}
            className={inputClasses}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={cliente.direccion}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* SELECT ADMINISTRADOR */}
          <div className="relative mb-6">
            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
              Administrador Asignado
            </label>
            <select
              name="id_administrador"
              value={cliente.id_administrador}
              className={inputClasses}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {administradores.map((admin) => (
                // IMPORTANTE: Verifica si tu BD devuelve 'id' o 'id_administrador'
                <option
                  key={admin.id || admin.id_administrador}
                  value={admin.id || admin.id_administrador}
                >
                  {admin.nombre} {admin.apellidos}
                </option>
              ))}
            </select>
          </div>

          {/* Select Comercial */}
          <div className="relative mb-8">
            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
              Comercial Asignado
            </label>
            <select
              name="id_comercial"
              value={cliente.id_comercial}
              className={inputClasses}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>

              {/* CORRECCIÓN AQUÍ: Verificamos si es array antes de hacer map */}
              {Array.isArray(comerciales) &&
                comerciales.map((comercial) => (
                  <option
                    key={comercial.id || comercial.id_comercial}
                    value={comercial.id || comercial.id_comercial}
                  >
                    {comercial.nombre} {comercial.apellidos}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"
          >
            CREAR CLIENTE
          </button>
        </form>
      </div>

      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default CrearCliente;
