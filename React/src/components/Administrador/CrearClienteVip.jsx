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
    password: "", 
    id_administrador: "",
    id_catalogo: "",
    id_comercial: "",
  });

  const [administradores, setAdministradores] = useState([]);
  const [catalogos, setCatalogos] = useState([]);
  const [comerciales, setComerciales] = useState([]);
  const [cargando, setCargando] = useState(false); // Añadido para controlar el botón

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resAdmins = await axios.get("http://192.168.0.14:8008/api/administradores");
        const resCatalogos = await axios.get("http://192.168.0.14:8008/api/catalogo");
        const resComerciales = await axios.get("http://192.168.0.14:8008/api/comerciales");

        const listaAdmins = resAdmins.data.admin;
        setAdministradores(Array.isArray(listaAdmins) ? listaAdmins : []);

        const listaCatalogos = resCatalogos.data.catalogo 
        setCatalogos(Array.isArray(listaCatalogos) ? listaCatalogos : []);

        const listaComerciales = resComerciales.data.comerciales;
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
    setCargando(true);
    
    try {
      const datosEnviados = {
        nombre: clienteVip.nombre,
        telefono: clienteVip.telefono,
        email: clienteVip.email,
        direccion: clienteVip.direccion,
        password: clienteVip.password, 
        id_administrador: clienteVip.id_administrador ? parseInt(clienteVip.id_administrador) : null,
        id_catalogo: clienteVip.id_catalogo ? parseInt(clienteVip.id_catalogo) : null,
        id_comercial: clienteVip.id_comercial ? parseInt(clienteVip.id_comercial) : null,
      };

      await axios.post(
        "http://localhost/api/clientesVip/guardar",
        datosEnviados
      );
      alert("Cliente VIP creado con éxito");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 422) {
        const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
        alert("Corrije estos errores:\n" + mensajesError);
      } else {
        alert("Error al crear el cliente. Revisa la consola.");
      }
    } finally {
      setCargando(false);
    }
  };

  // Clases estandarizadas para mantener coherencia visual
  const claseInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
  const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-white p-6 sm:p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
        
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
          Nuevo Cliente <span className="text-[#b3002d]">VIP</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" autoComplete="off">
          
          {/* Fila 1: Nombre y Teléfono (1 columna móvil, 2 columnas PC) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={claseLabel}>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Laura Gómez"
                value={clienteVip.nombre}
                className={claseInput}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className={claseLabel}>Teléfono</label>
              <input
                type="text"
                name="telefono"
                placeholder="Ej. 600 123 456"
                value={clienteVip.telefono}
                className={claseInput}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila 2: Email */}
          <div>
            <label className={claseLabel}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="cliente@empresa.com"
              value={clienteVip.email}
              className={claseInput}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 3: Dirección */}
          <div>
            <label className={claseLabel}>Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Calle Principal, 123"
              value={clienteVip.direccion}
              className={claseInput}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 4: Contraseña */}
          <div>
            <label className={claseLabel}>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={clienteVip.password}
              className={claseInput}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Fila 5: Administrador y Comercial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={claseLabel}>Administrador</label>
              <select
                name="id_administrador"
                value={clienteVip.id_administrador}
                className={claseInput}
                onChange={handleChange}
              >
                <option value="">-- Ninguno --</option>
                {Array.isArray(administradores) && administradores.map((admin) => (
                  <option key={admin.id || admin.id_administrador} value={admin.id || admin.id_administrador}>
                    {admin.nombre} {admin.apellidos}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={claseLabel}>Comercial</label>
              <select
                name="id_comercial"
                value={clienteVip.id_comercial}
                className={claseInput}
                onChange={handleChange}
              >
                <option value="">-- Ninguno --</option>
                {Array.isArray(comerciales) && comerciales.map((com) => (
                  <option key={com.id || com.id_comercial} value={com.id || com.id_comercial}>
                    {com.nombre || com.name} {com.apellidos || com.lastname || ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fila 6: Catálogo */}
          <div>
            <label className={claseLabel}>Catálogo VIP Asignado</label>
            <select
              name="id_catalogo"
              value={clienteVip.id_catalogo}
              // Destacamos un poco el select del catálogo para que se note que es VIP
              className={`${claseInput} bg-yellow-50 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500`}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {Array.isArray(catalogos) && catalogos.map((cat) => (
                <option key={cat.id || cat.id_catalogo} value={cat.id || cat.id_catalogo}>
                  {cat.nombre_catalogo || `Catálogo #${cat.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Botones Apilados en Móvil / En línea en PC */}
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
              {cargando ? "Guardando..." : "Crear VIP"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CrearClienteVip;