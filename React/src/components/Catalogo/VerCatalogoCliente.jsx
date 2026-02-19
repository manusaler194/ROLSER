import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {apiFetch} from '../../utils/api';


// Imágenes
import Bolso from "./imgCatalogo/bolsoRolser.jpg";
import Carro from "./imgCatalogo/carroRolser.jpg";
import Escalera from "./imgCatalogo/escaleraRolser.jpg";
import Plancha from "./imgCatalogo/planchaRolser.jpg";

const VerCatalogoCliente = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();

  const imagenesCatalogo = {
    Bolso: Bolso,
    Carro: Carro,
    Escalera: Escalera,
    Plancha: Plancha
  };

  // Cargar catálogos y artículos
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const response = await apiFetch("http://localhost/api/catalogo");
        const data = await response.json();
        setCatalogos(data.catalogo);
      } catch (error) {
        console.error("Error al cargar catalogos:", error);
      }
    };

    const cargarArticulos = async () => {
      try {
        const response = await apiFetch("http://localhost/api/articulo");
        const data = await response.json();
        setArticulos(data.almacen);
      } catch (error) {
        console.error("Error al cargar articulos:", error);
      }
    };

    cargarCatalogos();
    cargarArticulos();
  }, []);
  

  const verArticulosCatalogo = (catalogo) => {
    // Filtramos los artículos que pertenecen a este catálogo
    const articulosFiltrados = articulos.filter(a =>
      a.id_catalogo === catalogo.id_catalogo
    );

    // Redirigimos a VerArticulosCliente pasando los artículos por state
    navigate(`/VerArticulosCliente/${catalogo.id_catalogo}`, { state: { articulos: articulosFiltrados, catalogoNombre: catalogo.nombre_catalogo } });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-10 mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Catálogos
      </h2>

      <div className="space-y-6">
        {catalogos.map((catalogo) => (
          <div
            key={catalogo.id_catalogo}
            onClick={() => verArticulosCatalogo(catalogo)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-4 p-5">
              <img
                src={imagenesCatalogo[catalogo.nombre_catalogo]}
                alt={catalogo.nombre_catalogo}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">
                  {catalogo.nombre_catalogo}
                </h3>
                <p className="text-gray-500">Año: {catalogo.anyo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerCatalogoCliente;
