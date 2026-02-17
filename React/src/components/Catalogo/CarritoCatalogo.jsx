import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importar imágenes
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

// Mapeo de imágenes
const imagenesArticulos = {
  bolso1: Bolso1,
  bolso2: Bolso2,
  bolso3: Bolso3,
  bolso4: Bolso4,
  carro1: Carro1,
  carro2: Carro2,
  carro3: Carro3,
  escalera1: Escalera1,
  escalera2: Escalera2,
  plancha1: Plancha1,
};

const CarritoCatalogo = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  

  // Cargar carrito desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      setCarrito(JSON.parse(stored));
      console.log(stored)
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id_articulo === id ? { ...item, cantidad: Number(cantidad) } : item
      )
    );
  };

  const eliminarArticulo = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id_articulo !== id));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-10 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Compra</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-lg text-gray-700">Tu carrito está vacío.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Header de tabla */}
          <div className="hidden md:flex font-bold border-b pb-2 mb-4">
            <div className="flex-1">Nombre</div>
            <div className="w-32 text-center">Cantidad</div>
            <div className="w-32 text-right">Subtotal</div>
          </div>

          {/* Artículos */}
          {carrito.map((item) => (
            <div
              key={item.id_articulo}
              className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center flex-1 gap-4">
                <img
                  src={imagenesArticulos[item.nombre.toLowerCase()] || ""}
                  alt={item.nombre}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="text-lg font-medium">{item.nombre}</span>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0 w-32 justify-center">
                <button
                  onClick={() =>
                    actualizarCantidad(item.id_articulo, item.cantidad - 1)
                  }
                  disabled={item.cantidad <= 1}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  ↓
                </button>
                <input
                  type="number"
                  min={1}
                  value={item.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(item.id_articulo, e.target.value)
                  }
                  className="w-12 p-1 border rounded text-center"
                />
                <button
                  onClick={() =>
                    actualizarCantidad(item.id_articulo, item.cantidad + 1)
                  }
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  ↑
                </button>
              </div>

              <div className="w-32 text-right font-semibold mt-2 md:mt-0">
                {Number(item.precio * item.cantidad).toFixed(2)} €
              </div>

              <button
                onClick={() => eliminarArticulo(item.id_articulo)}
                className="ml-4 text-red-600 font-bold hover:underline"
              >
                X
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-end mt-4 text-2xl font-bold">
            Total: {total.toFixed(2)} €
          </div>

          {/* Botón de pagar */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => alert("Procediendo a pagar...")}
              className="bg-[#C8102E] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-red-800 transition"
            >
              Realizar pago
            </button>
          </div>
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-8 left-8 bg-[#bc002d] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-800 transition"
      >
        Volver
      </button>
    </div>
  );
};

export default CarritoCatalogo;
