import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {apiFetch} from '../../utils/api';

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

// Array de imágenes agrupadas por tipo
const imagenesArticulos = [
  {
    tipo: "bolso",
    articulos: [
      { nombre: "bolso1", imagen: Bolso1 },
      { nombre: "bolso2", imagen: Bolso2 },
      { nombre: "bolso3", imagen: Bolso3 },
      { nombre: "bolso4", imagen: Bolso4 },
    ],
  },
  {
    tipo: "carro",
    articulos: [
      { nombre: "carro1", imagen: Carro1 },
      { nombre: "carro2", imagen: Carro2 },
      { nombre: "carro3", imagen: Carro3 },
    ],
  },
  {
    tipo: "escalera",
    articulos: [
      { nombre: "escalera1", imagen: Escalera1 },
      { nombre: "escalera2", imagen: Escalera2 },
    ],
  },
  {
    tipo: "plancha",
    articulos: [
      { nombre: "plancha1", imagen: Plancha1 },
    ],
  },
];

const VerArticulosCliente = () => {
  const { id_catalogo } = useParams();
  const navigate = useNavigate();
  const [articulos, setArticulos] = useState([]);
  const [catalogoNombre, setCatalogoNombre] = useState("Catálogo");
  const [cantidades, setCantidades] = useState({});

  // Cargar artículos desde la API
  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        const response = await apiFetch(
          `http://localhost/api/catalogo/${id_catalogo}/articulos`
        );
        const data = await response.json();

        setArticulos(data.articulos || []);
        setCatalogoNombre(data.catalogoNombre || "Catálogo");
      } catch (err) {
        console.error(err);
      }
    };

    cargarArticulos();
  }, [id_catalogo]);

  // Obtenemos el tipo de catálogo
  const catalogoTipo = catalogoNombre.toLowerCase();
  const tipoSeleccionado = imagenesArticulos.find(
    (imagen) => imagen.tipo === catalogoTipo
  );

  // Creamos un array solo con las imágenes del tipo seleccionado
  const imagenesInsertar = tipoSeleccionado ? tipoSeleccionado.articulos.map((articulo) => articulo.imagen) : [];

  // ----- MODIFICADO: función para agregar al carrito
  const agregarAlCarrito = (articulo, imagen) => {
    const cantidad = cantidades[articulo.id_articulo];

    if (!cantidad || cantidad <= 0) {
      alert("Selecciona una cantidad válida");
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carritoActual.find(
      (item) => item.id_articulo === articulo.id_articulo
    );

    let nuevoCarrito;

    if (existe) {
      // Si ya existe, sumamos la cantidad
      nuevoCarrito = carritoActual.map((item) =>
        item.id_articulo === articulo.id_articulo
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
    } else {
      // Si no existe, lo agregamos con la imagen
      nuevoCarrito = [
        ...carritoActual,
        {
          ...articulo,
          cantidad: cantidad,
          imagenSrc: imagen, // ----- GUARDAMOS EL SRC DIRECTO
        },
      ];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    alert(`${articulo.nombre} añadido al carrito`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-10 mt-10 relative">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Artículos de {catalogoNombre}
      </h2>

      {/* Botón volver */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/VerCatalogoCliente")}
          className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Volver
        </button>
      </div>

      {/* Lista de artículos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articulos.map((articulo, index) => {
          const imagen = imagenesInsertar[index];
          const cantidad = cantidades[articulo.id_articulo];

          return (
            <div
              key={articulo.id_articulo}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex flex-col items-center">
                {imagen ? (
                  <img
                    src={imagen}
                    alt={articulo.nombre}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2">{articulo.nombre}</h3>
                <p className="text-lg font-bold text-[#C8102E]">
                  {articulo.precio} €
                </p>
              </div>

              {/* Seleccionar cantidad de compra */}
              <div className="flex items-center mt-4 gap-2">
                <input
                  type="number"
                  min={0}
                  onChange={(e) =>
                    setCantidades((prev) => ({
                      ...prev,
                      [articulo.id_articulo]: Number(e.target.value),
                    }))
                  }
                  value={cantidad || ""}
                  className="w-16 p-2 border rounded text-center"
                />
                <button
                  onClick={() => agregarAlCarrito(articulo, imagen)}
                  className="bg-[#bc002d] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#a00c24] transition"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón al carrito */}
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
