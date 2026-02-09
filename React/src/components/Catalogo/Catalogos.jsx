import React, { useState } from "react";

const CrearCatalogo = () => {
  // Estado del formulario
  const [nombreCatalogo, setNombreCatalogo] = useState(""); // nombre del catálogo
  const [anyo, setAnyo] = useState(""); // año del catálogo
  const [mensaje, setMensaje] = useState("");

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await fetch("http://localhost/api/catalogos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_catalogo: nombreCatalogo,
          anyo: anyo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("¡Catálogo creado correctamente!");
        setNombreCatalogo(""); // limpiar nombre
        setAnyo(""); // limpiar año
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
            onChange={(e) => setAnyo(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            placeholder="Introduce el año"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#C8102E] text-white py-2 rounded-full hover:bg-[#a00c24] transition-colors font-medium shadow-md"
        >
          {loading ? "Creando..." : "Crear Catálogo"}
        </button>
      </form>
    </div>
  );
};

export default CrearCatalogo;
