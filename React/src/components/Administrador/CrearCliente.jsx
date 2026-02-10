import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearCliente = () => {
  const navigate = useNavigate();
  const URL_API_GUARDAR = "http://localhost/api/clientes/guardar";

  // Estado del formulario
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    email: "",      // Mantenemos 'email' como confirmamos antes
    direccion: "",
    password: "",
    id_administrador: "",
    id_comercial: "",
  });

  // Estados para listas desplegables
  const [administradores, setAdministradores] = useState([]);
  const [comerciales, setComerciales] = useState([]);

  // Estados de control de UI
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Cargar listas al iniciar
  useEffect(() => {
    const cargarListas = async () => {
      try {
        const [resAdmins, resComerciales] = await Promise.all([
          axios.get("http://localhost/api/administradores"),
          axios.get("http://localhost/api/comerciales"),
        ]);

        const listaAdmins = resAdmins.data.admin || resAdmins.data || [];
        const listaComerciales = resComerciales.data.comercial || resComerciales.data || [];

        setAdministradores(Array.isArray(listaAdmins) ? listaAdmins : []);
        setComerciales(Array.isArray(listaComerciales) ? listaComerciales : []);
      } catch (err) {
        console.error("Error cargando listas:", err);
        setError("No se pudieron cargar las listas de administradores o comerciales.");
      }
    };
    cargarListas();
  }, []);

  const manejarCambio = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      // Preparamos los datos (convertir IDs a números o null)
      const datosEnviados = {
        ...cliente,
        id_administrador: cliente.id_administrador ? parseInt(cliente.id_administrador) : null,
        id_comercial: cliente.id_comercial ? parseInt(cliente.id_comercial) : null,
      };

      await axios.post(URL_API_GUARDAR, datosEnviados);

      alert("Cliente creado con éxito.");
      navigate("/usuarios");
    } catch (err) {
      console.error("Error completo:", err);
      const mensaje = err.response?.data?.message || err.message || "Error al crear el cliente";
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  // Clase común para todos los inputs y selects (Estilo Admin)
  const claseInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
  const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
        
        <h2 className="text-2xl font-bold mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
          Nuevo Cliente
        </h2>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-5" autoComplete="off">
          
          {/* GRUPO 1: Nombre y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={claseLabel}>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                required
                value={cliente.nombre}
                onChange={manejarCambio}
                className={claseInput}
                placeholder="Ej. Ana García"
              />
            </div>
            <div>
              <label className={claseLabel}>Teléfono</label>
              <input
                type="text"
                name="telefono"
                required
                value={cliente.telefono}
                onChange={manejarCambio}
                className={claseInput}
                placeholder="Ej. 600 123 456"
              />
            </div>
          </div>

          {/* GRUPO 2: Email */}
          <div>
            <label className={claseLabel}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={cliente.email}
              onChange={manejarCambio}
              className={claseInput}
              placeholder="cliente@empresa.com"
            />
          </div>

          {/* GRUPO 3: Dirección */}
          <div>
            <label className={claseLabel}>Dirección</label>
            <input
              type="text"
              name="direccion"
              required
              value={cliente.direccion}
              onChange={manejarCambio}
              className={claseInput}
              placeholder="Calle Principal, 123"
            />
          </div>

          {/* GRUPO 4: Contraseña */}
          <div>
            <label className={claseLabel}>Contraseña</label>
            <input
              type="password"
              name="password"
              required
              value={cliente.password}
              onChange={manejarCambio}
              className={claseInput}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {/* GRUPO 5: Selectores (Administrador y Comercial) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={claseLabel}>Asignar Admin</label>
              <select
                name="id_administrador"
                value={cliente.id_administrador}
                onChange={manejarCambio}
                className={claseInput}
              >
                <option value="">-- Ninguno --</option>
                {administradores.map((admin) => (
                  <option key={admin.id_administrador} value={admin.id_administrador}>
                    {admin.nombre} {admin.apellidos}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={claseLabel}>Asignar Comercial</label>
              <select
                name="id_comercial"
                value={cliente.id_comercial}
                onChange={manejarCambio}
                className={claseInput}
              >
                <option value="">-- Ninguno --</option>
                {comerciales.map((com) => (
                  <option key={com.id_comercial} value={com.id_comercial}>
                    {com.nombre} {com.apellidos}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-center pt-8 gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 border border-gray-400 text-gray-600 font-bold py-3 px-4 rounded shadow hover:bg-gray-50 transition duration-300 uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className={`w-1/2 text-white font-bold py-3 px-4 rounded shadow-lg transition duration-300 uppercase ${
                cargando
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {cargando ? "Guardando..." : "Crear Cliente"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CrearCliente;