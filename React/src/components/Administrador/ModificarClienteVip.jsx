import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ModificarClienteVip = () => {
  const navegar = useNavigate();
  const { id } = useParams();

  // Estado inicial
  const [clienteVip, setClienteVip] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const [estaCargando, setEstaCargando] = useState(true);

  // 1. Cargar datos (GET)
  useEffect(() => {
    const cargarClienteVip = async () => {
      try {
        // ... fetch ...
        const respuesta = await fetch(`http://localhost/api/clientesVip/${id}`);
        const datos = await respuesta.json();

        
        const usuario = datos.clienteVip[0];

        if (usuario) {
          setClienteVip({
            nombre: usuario.nombre || "",
            email: usuario.email || "", 
            telefono: usuario.telefono || "",
            direccion: usuario.direccion || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setEstaCargando(false);
      }
    };

    if (id) {
      cargarClienteVip();
    }
  }, [id]);

  const manejarCambio = (e) => {
    setClienteVip({
      ...clienteVip,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Guardar cambios (PUT)
  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost/api/clientesVip/actualizar/${id}`,
        clienteVip,
      );
      alert("Cliente VIP modificado con éxito");
      navegar("/usuarios");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const clasesInput =
    "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#bd0026] appearance-none bg-white text-gray-700 placeholder-gray-500 font-medium";

  if (estaCargando) {
    return (
      <div className="flex h-screen justify-center items-center">
        Cargando datos del Cliente VIP...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-8 uppercase tracking-wide">
          Modificar Cliente VIP
        </h2>

        <form onSubmit={manejarEnvio}>
          {/* INPUT NOMBRE */}
          <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
            Nombre / Razón Social
          </label>
          <input
            type="text"
            name="nombre"
            value={clienteVip.nombre} // <-- Esto es lo que muestra el dato
            onChange={manejarCambio}
            className={clasesInput}
            required
          />

          {/* INPUT CORREO */}
          <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={clienteVip.email} // <-- Esto es lo que muestra el dato
            onChange={manejarCambio}
            className={clasesInput}
            required
          />

          {/* INPUT TELEFONO */}
          <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={clienteVip.telefono} // <-- Esto es lo que muestra el dato
            onChange={manejarCambio}
            className={clasesInput}
            required
          />

          {/* INPUT DIRECCION */}
          <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={clienteVip.direccion} // <-- Esto es lo que muestra el dato
            onChange={manejarCambio}
            className={clasesInput}
            required
          />

          <button
            type="submit"
            className="w-full py-4 mt-4 text-white font-bold bg-[#bd0026] rounded-full hover:bg-red-800 transition-all transform active:scale-95 shadow-lg uppercase tracking-wider"
          >
            Guardar Cambios
          </button>
        </form>
      </div>

      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => navegar("/usuarios")}
          className="bg-black text-white px-10 py-3 rounded-full text-xl font-bold hover:bg-gray-800 shadow-xl transition-transform active:scale-95 cursor-pointer uppercase"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ModificarClienteVip;
