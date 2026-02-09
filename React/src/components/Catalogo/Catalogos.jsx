import React, { useState, useEffect } from "react";

const CrearCatalogo = () => {
  // Estados del formulario
  const [nombreCatalogo, setNombreCatalogo] = useState("");
  const [anyo, setAnyo] = useState("");
  const [administradores, setAdministradores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  

  // Traer administradores al cargar el componente
  useEffect(() => {
    const cargarAdministradores = async () => {
      try {
        
      


        const response = await fetch("http://localhost/api/administradores");
        const data = await response.json();
        setAdministradores(data.administrador || []);
      } catch (error) {
        console.error("Error al cargar administradores:", error);
      }
    };

    cargarAdministradores();
  }, []);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    // Tomar el valor directamente del select en el formulario
    const idAdministrador = e.target.administrador.value;

    console.log("Datos enviados al backend:", {
    nombre_catalogo: nombreCatalogo,
    anyo: anyo,
    id_administrador: idAdministrador,
  });

    try {
      const response = await fetch("http://localhost/api/catalogo/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreCatalogo,
          anyo: anyo,
          id_administrador: idAdministrador,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("¡Catálogo creado correctamente!");
        setNombreCatalogo("");
        setAnyo("");
      } else {
        setMensaje(data.error || "Error al crear el catálogo");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al crear el catálogo");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-10 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Crear Catálogo</h2>

      {mensaje && (
        <div className="mb-4 text-center text-green-700 font-medium">{mensaje}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Nombre del catálogo */}
        <div>
          <label className="block mb-1 font-semibold">Nombre del Catálogo</label>
          <input
            type="text"
            value={nombreCatalogo}
            onChange={(e) => setNombreCatalogo(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            placeholder="Introduce el nombre del catálogo"
            required
          />
        </div>

        {/* Año */}
        <div>
          <label className="block mb-1 font-semibold">Año</label>
          <input
            type="number"
            value={anyo}
            min="1900"
            max="2100"
            onChange={(e) => setAnyo(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            placeholder="Introduce el año (min 1900 max 2100)"
            required
          />
        </div>

        {/* Administrador */}
        <div>
          <label className="block mb-1 font-semibold">Administrador</label>
          <select
            name="administrador" // importante para leerlo en handleSubmit
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            required
          >
            {administradores.map((admin) => (
              <option key={admin.id_administrador} value={admin.id_administrador}>
                {admin.nombre} {/* Ajusta según tu campo */}
              </option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-[#C8102E] text-white py-2 rounded-full hover:bg-[#a00c24] transition-colors font-medium shadow-md"
        >
           Crear Catálogo
        </button>
      </form>
    </div>
  );
};

export default CrearCatalogo;
