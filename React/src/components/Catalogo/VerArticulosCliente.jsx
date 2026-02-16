import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importamos todas las imágenes
import Bolso1 from "./imgArticulos/Bolso1.jpg";
import Bolso2 from "./imgArticulos/Bolso2.jpg";
import Bolso3 from "./imgArticulos/Bolso3.jpg";
import Bolso4 from "./imgArticulos/Bolso4.jpg";
import Carro1 from "./imgArticulos/Carro1.jpg";
import Carro2 from "./imgArticulos/Carro2.jpg";
import Carro3 from "./imgArticulos/Carro3.jpg";
import Escalera1 from "./imgArticulos/Escalera1.jpg";
import Escalera2 from "./imgArticulos/Escalera2.jpg";
import Plancha1 from "./imgArticulos/Plancha1.jpg";

// Creamos un objeto para mapear nombre de artículo → imagen
const imagenesArticulos = {
  "Bolso1": Bolso1,
  "Bolso2": Bolso2,
  "Bolso3": Bolso3,
  "Bolso4": Bolso4,
  "Carro1": Carro1,
  "Carro2": Carro2,
  "Carro3": Carro3,
  "Escalera1": Escalera1,
  "Escalera2": Escalera2,
  "Plancha1": Plancha1,
};

const VerArticulosCliente = () => {
  const { id_catalogo } = useParams();
  const navigate = useNavigate();

  const [articulos, setArticulos] = useState([]);
  const [catalogoNombre, setCatalogoNombre] = useState("Catálogo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/catalogo/${id_catalogo}/articulos`
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error al cargar artículos");
          return;
        }

        setArticulos(data.articulos || []);
        setCatalogoNombre(data.catalogoNombre || "Catálogo");
      } catch (err) {
        console.error(err);
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    cargarArticulos();
  }, [id_catalogo]);

  if (loading) return <p className="text-center mt-10">Cargando artículos...</p>;

  return (
    <div className="w-full max-w-6xl mx-auto p-10 mt-10 relative">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Artículos de {catalogoNombre}
      </h2>

      {/* Botón volver */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Volver
        </button>
      </div>

      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articulos.map((articulo) => (
          <div
            key={articulo.id_articulo}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex flex-col items-center">
              {/* Imagen del artículo */}
              {imagenesArticulos[articulo.nombre] ? (
                <img
                  src={imagenesArticulos[articulo.nombre]}
                  alt={articulo.nombre}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{articulo.nombre}</h3>
              <p className="text-lg font-bold text-[#C8102E]">{articulo.precio} €</p>
            </div>

            {/* Botón + para añadir al carrito */}
            <button
              onClick={() => alert(`Agregar al carrito: ${articulo.nombre}`)}
              className="mt-4 bg-[#bc002d] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#a00c24] transition"
            >
              + 
            </button>
          </div>
        ))}
      </div>

      {/* Botón fijo abajo a la derecha para ir al carrito */}
      <button
        onClick={() => navigate("/carritoCatalogo")}
        className="fixed bottom-8 right-8 bg-[#C8102E] text-white px-6 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-red-800 transition"
      >
        Ir al carrito
      </button>
    </div>
  );
};

export default VerArticulosCliente;
