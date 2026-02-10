import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearClienteVip = () => {
  const navigate = useNavigate();

  const [clienteVip, setClienteVip] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    id_administrador: "",
    id_catalogo: "",
    id_comercial: "",
  });

  const [administradores, setAdministradores] = useState([]);
  const [catalogos, setCatalogos] = useState([]);
  const [comerciales, setComerciales] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resAdmins = await axios.get(
          "http://localhost/api/administradores",
        );
        const resCatalogos = await axios.get(
          "http://localhost/api/catalogo",
        );
        const resComerciales = await axios.get(
          "http://localhost/api/comerciales",
        );

        // --- DEBUG: MIRA LA CONSOLA (F12) PARA VER LOS NOMBRES REALES ---
        console.log("RESPUESTA ADMINS COMPLETA:", resAdmins.data);
        console.log("RESPUESTA CATALOGO COMPLETA:", resCatalogos.data);
        console.log("RESPUESTA COMERCIALES COMPLETA:", resComerciales.data);
        // -----------------------------------------------------------------

        // Carga robusta de Arrays
        const listaAdmins =
          resAdmins.data.admin ||
          resAdmins.data.administradores ||
          resAdmins.data;
        setAdministradores(Array.isArray(listaAdmins) ? listaAdmins : []);

        const listaCatalogos =
          resCatalogos.data.catalogo ||
          resCatalogos.data.catalogos ||
          resCatalogos.data;
        setCatalogos(Array.isArray(listaCatalogos) ? listaCatalogos : []);

        const listaComerciales =
          resComerciales.data.comercial ||
          resComerciales.data.comerciales ||
          resComerciales.data;
        setComerciales(Array.isArray(listaComerciales) ? listaComerciales : []);
      } catch (error) {
        console.error("Error cargando listas:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setClienteVip({
      ...clienteVip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datosEnviados = {
        nombre: clienteVip.nombre,
        telefono: clienteVip.telefono,
        email: clienteVip.email,
        direccion: clienteVip.direccion,
        id_administrador: clienteVip.id_administrador
          ? parseInt(clienteVip.id_administrador)
          : null,
        id_catalogo: clienteVip.id_catalogo
          ? parseInt(clienteVip.id_catalogo)
          : null,
        id_comercial: clienteVip.id_comercial
          ? parseInt(clienteVip.id_comercial)
          : null,
      };

      await axios.post(
        "http://localhost/api/clientesVip/guardar",
        datosEnviados,
      );
      alert("Cliente VIP creado con éxito");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el cliente. Revisa la consola.");
    }
  };

  const inputClasses =
    "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Crear nuevo Cliente <span className="text-[#b3002d]">VIP</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={clienteVip.nombre}
            className={inputClasses}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={clienteVip.telefono}
            className={inputClasses}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={clienteVip.email}
            className={inputClasses}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={clienteVip.direccion}
            className={inputClasses}
            onChange={handleChange}
            required
          />

          {/* SELECT ADMINISTRADOR */}
          <div className="relative mb-6">
            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
              Administrador
            </label>
            <select
              name="id_administrador"
              value={clienteVip.id_administrador}
              className={inputClasses}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {Array.isArray(administradores) &&
                administradores.map((admin) => {
                  // INTENTAMOS VARIOS NOMBRES POSIBLES
                  const nombreMostrar = admin.nombre;
                  const apellidoMostrar = admin.apellidos;
                  return (
                    <option
                      key={admin.id || admin.id_administrador}
                      value={admin.id || admin.id_administrador}
                    >
                      {nombreMostrar} {apellidoMostrar}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* SELECT COMERCIAL */}
          <div className="relative mb-6">
            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
              Comercial
            </label>
            <select
              name="id_comercial"
              value={clienteVip.id_comercial}
              className={inputClasses}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {Array.isArray(comerciales) &&
                comerciales.map((com) => {
                  // INTENTAMOS VARIOS NOMBRES POSIBLES
                  const nombreMostrar =
                    com.nombre || com.name || `Comercial #${com.id}`;
                  const apellidoMostrar = com.apellidos || com.lastname || "";
                  return (
                    <option
                      key={com.id || com.id_comercial}
                      value={com.id || com.id_comercial}
                    >
                      {nombreMostrar} {apellidoMostrar}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* SELECT CATÁLOGO */}
          <div className="relative mb-8">
            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
              Catálogo
            </label>
            <select
              name="id_catalogo"
              value={clienteVip.id_catalogo}
              className={inputClasses}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {Array.isArray(catalogos) &&
                catalogos.map((cat) => {
                  // INTENTAMOS: nombre_temporada -> nombre -> title -> descripcion -> ID
                  const textoCatalogo =
                    cat.nombre_temporada  ||
                    `Catálogo #${cat.id}`;
                  return (
                    <option
                      key={cat.id || cat.id_catalogo}
                      value={cat.id || cat.id_catalogo}
                    >
                      {textoCatalogo}
                    </option>
                  );
                })}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"
          >
            CREAR CLIENTE VIP
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

export default CrearClienteVip;
