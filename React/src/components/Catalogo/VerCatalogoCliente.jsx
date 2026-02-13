import React, { useState, useEffect } from "react";

// Imágenes locales
import Bolso from "./img/bolsoRolser.jpg";
import Carro from "./img/carroRolser.jpg";
import Escalera from "./img/escaleraRolser.jpg";
import Plancha from "./img/planchaRolser.jpg";

const VerCatalogoCliente = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [catalogoSeleccionado, setCatalogoSeleccionado] = useState(null);

  // Relacionar nombre del catálogo → imagen
  const imagenesCatalogo = {"Bolso": Bolso, "Carro": Carro, "Escalera": Escalera, "Plancha": Plancha};

  // Cargar catálogos
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const response = await fetch("http://localhost/api/catalogo");
        const data = await response.json();
        setCatalogos(data.catalogo); 
      } catch (error) {
        console.error("Error al cargar catalogos:", error);
      }
    };

    // Cargar artículos
    const cargarArticulos = async () => {
      try {
        const response = await fetch("http://localhost/api/articulo");
        const data = await response.json();
        setArticulos(data.almacen);
      } catch (error) {
        console.error("Error al cargar articulos:", error);
      }
    };

    cargarCatalogos();
    cargarArticulos();
  }, []);


  return (
    <div className="w-full max-w-6xl mx-auto p-10 mt-10">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Catálogos
      </h2>

      {/* LISTA DE CATALOGOS */}
      <div className="space-y-6">

        {catalogos.map(catalogo => (
          <div key={catalogo.id_catalogo} className="bg-white rounded-xl shadow-md overflow-hidden">

            {/* TARJETA CLICABLE */}
            <div
              onClick={() => setCatalogoSeleccionado(catalogo)}
              className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-100 transition"
            >

                <img
                  src={imagenesCatalogo[catalogo.nombre_catalogo]}
                  alt={catalogo.nombre_catalogo}
                  className="w-24 h-24 object-cover rounded-lg"
                /> 
              <div>
                <h3 className="text-xl font-bold">{catalogo.nombre_catalogo}</h3>
                <p className="text-gray-500">Año: {catalogo.anyo}</p>
              </div>
            </div>

            {/* ARTICULOS DEL CATALOGO (solo si está seleccionado) */}
            {catalogoSeleccionado?.id_catalogo === catalogo.id_catalogo && (
              <div className="p-5 border-t grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50">
                {articulosDelCatalogo.length === 0 ? (
                  <p className="col-span-full text-gray-500">No hay artículos en este catálogo.</p>
                ) : (
                  articulosDelCatalogo.map(articulo => (
                    <div key={articulo.id_articulo} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                      <h4 className="font-bold mb-1">{articulo.nombre}</h4>
                      <p className="text-gray-600 mb-1">{articulo.descripcion}</p>
                      <p className="text-red-700 font-semibold">{articulo.precio} €</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default VerCatalogoCliente;