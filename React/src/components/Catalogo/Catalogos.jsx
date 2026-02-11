import React, { useState, useEffect } from "react";

const CrearCatalogo = () => {
  // Estados del formulario
  const [nombreCatalogo, setNombreCatalogo] = useState("");
  const [anyo, setAnyo] = useState("");
  const [administradores, setAdministradores] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  
  // Cargar administradores
  useEffect(() => {
    const cargarAdministradores = async () => {
      try {
        const response = await fetch("http://localhost/api/administradores");
        const data = await response.json();
        setAdministradores(data.admin || []);
      } catch (error) {
          console.error("Error al cargar administradores:", error);
      }

    };
    cargarAdministradores();
  }, []);

  // Cargar artículos
  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        const response = await fetch("http://localhost/api/articulo");
        const data = await response.json();
        setArticulos(data.almacen || []);
      } catch (error) {
        console.error("Error al cargar articulos:", error);
      }
    };
    cargarArticulos();
  }, []);


  // Enviar formulario
  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje("");

  const idAdministrador = e.target.administrador.value;

  try {
    const catalogo = await fetch("http://localhost/api/catalogo/guardar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre_catalogo: nombreCatalogo,
        anyo: anyo,
        id_administrador: idAdministrador,
      }),
    });

    const dataCatalogo = await catalogo.json();
    console.log(dataCatalogo.idCatalogo);

    if (!catalogo.ok) {
      setMensaje(dataCatalogo.error || "Error al crear el catálogo");
      return;
    }

    if (articulosSeleccionados.length > 0) {
      await Promise.all(articulosSeleccionados.map(idArticulo => fetch("http://localhost/api/articulo_catalogo/guardar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id_catalogo: dataCatalogo.idCatalogo,
              id_articulo: idArticulo,
            }),
          })
        )
      );
    }

    setNombreCatalogo("");
    setAnyo("");
    setArticulosSeleccionados([]);
    setMensaje("Catálogo creado correctamente");

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

        {/* Artículos */}
        <div>
          <label className="block mb-2 font-semibold">Artículos (OPCIONAL)</label>

          <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
            {articulos.map((articulo) => (
              <div key={articulo.id_articulo}>
                <input
                  type="checkbox"
                  value={articulo.id_articulo}
                  onChange={(e) => {
                    const seleccionado = e.target.checked; // Coge la opcion seleccionada
                    if (seleccionado) { // Si "seleccionado" es true entonces mete el artiuclo al array de "seleccionado"
                      setArticulosSeleccionados([...articulosSeleccionados, Number(articulo.id_articulo)]);
                    } else { // Si "seleccionado" es false entonces quita el artiuclo del array de "seleccionado"
                      setArticulosSeleccionados(articulosSeleccionados.filter(a => a !== Number(articulo.id_articulo)));
                    }
                  }}
                />
                <span className="ml-2">{articulo.nombre}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Administrador */}
        <div>
          <label className="block mb-1 font-semibold">Administrador</label>
          <select
            name="administrador"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            required
          >
            {administradores.map((admin) => (
              <option key={admin.id_administrador} value={admin.id_administrador}>
                {admin.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <button type="submit" className="bg-[#C8102E] text-white py-2 rounded-full hover:bg-[#a00c24] font-medium shadow-md">
          Crear Catálogo
        </button>
      </form>
    </div>
  );
};

export default CrearCatalogo;
