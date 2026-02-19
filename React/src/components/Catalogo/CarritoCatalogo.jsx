import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarritoCatalogo = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [showPago, setShowPago] = useState(false);
  const [pagoDatos, setPagoDatos] = useState({
    nombre: "",
    numeroTarjeta: "",
    expiracion: "",
    cvv: "",
  });
  const [idProveedor, setIdProveedor] = useState("");

  // Cargar carrito de articulos
  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      setCarrito(JSON.parse(stored));
    }
  }, []);

  // Actualizar cantidad
  const actualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id_articulo === id ? { ...item, cantidad: Number(cantidad) } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Eliminar un artíulo
  const eliminarArticulo = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id_articulo !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  
  const handlePagoChange = (e) => {
    setPagoDatos({ ...pagoDatos, [e.target.name]: e.target.value });
  };

  const handlePagoSubmit = (e) => {
    e.preventDefault();
    alert(
      `¡Pago realizado!\n\nTitular: ${pagoDatos.nombre}\nTotal: ${total.toFixed(
        2
      )} €`
    );
    setShowPago(false);
    setCarrito([]);
    localStorage.removeItem("carrito");
    setPagoDatos({ nombre: "", numeroTarjeta: "", expiracion: "", cvv: "" });
  };


  // Crear pedido
  const crearReabastecimiento = async () => {
  
      const productosParaActualizar = articulos.filter(a => a.cantidad > 0);
  
      if (productosParaActualizar.length === 0) {
        alert("Selecciona al menos un producto con cantidad mayor a 0.");
        return;
      }
  
      try {
        const datosPedido = {
          fecha_pedido: new Date().toISOString().split('T')[0],
          estado: 'En preparación',
          id_proveedor: idProveedor,
          id_administrador: role === 'admin' ? user.id_adminsitrador : null,
          id_encargado: role === 'encargado_almacen' ? user.id_encargado : null
        };
  
        const responsePedido = await apiFetch('http://localhost/api/pedidos/reposicion/guardar', {
          method: 'POST',
          body: JSON.stringify(datosPedido)
        });
  
        if (!responsePedido.ok) throw new Error("Error al guardar el pedido");
  
        for (const articulo of productosParaActualizar) {
  
          const responseArt = await apiFetch(`http://localhost/api/articulo/actualizar/${articulo.id_articulo}`, {
            method: 'PUT',
            body: JSON.stringify({
              id_articulo: articulo.id_articulo,
              nombre: articulo.nombre,
              descripcion: articulo.descripcion,
              precio: articulo.precio,
              stock_actual: Number(articulo.stock_actual) + Number(articulo.cantidad),
              id_seccion: articulo.id_seccion,
              id_administrador: user.id_ad
            })
          });
  
          if (!responseArt.ok) console.error(`Error actualizando stock de: ${articulo.nombre}`);
        }
  
        alert("Pedido de reposición creado y stock actualizado con éxito.");
  
        setArticulos(prev => prev.map(articulo => ({ ...articulo, cantidad: 0 })));
        setIdProveedor("");
  
      } catch (error) {
        console.error(error);
        alert("Hubo un error en el proceso.");
      }
    };




  return (
    <div className="w-full max-w-6xl mx-auto p-10 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Compra</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-lg text-gray-700">Tu carrito está vacío.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="hidden md:flex font-bold border-b pb-2 mb-4">
            <div className="flex-1">Nombre</div>
            <div className="w-32 text-center">Cantidad</div>
            <div className="w-32 text-right">Subtotal</div>
          </div>

          {carrito.map((item) => (
            <div
              key={item.id_articulo}
              className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center flex-1 gap-4">
                <img
                  src={item.imagenSrc}
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
                {(item.precio * item.cantidad).toFixed(2)} €
              </div>

              <button
                onClick={() => eliminarArticulo(item.id_articulo)}
                className="ml-4 text-red-600 font-bold hover:underline"
              >
                X
              </button>
            </div>
          ))}

          <div className="flex justify-end mt-4 text-2xl font-bold">
            Total: {total.toFixed(2)} €
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowPago(true)}
              className="bg-[#C8102E] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-red-800 transition"
            >
              Realizar pago
            </button>
          </div>
        </div>
      )}


      {/* ----- MODAL INTERMEDIO DE PAGO ----- */}
      {showPago && (
        <div className="fixed inset-0 bg-[#C8102E] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Datos de pago</h2>
            <form className="flex flex-col gap-3" onSubmit={handlePagoSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del titular"
                value={pagoDatos.nombre}
                onChange={handlePagoChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="numeroTarjeta"
                placeholder="Número de tarjeta"
                value={pagoDatos.numeroTarjeta}
                onChange={handlePagoChange}
                required
                className="p-2 border rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="expiracion"
                  placeholder="MM/AA"
                  value={pagoDatos.expiracion}
                  onChange={handlePagoChange}
                  required
                  className="p-2 border rounded flex-1"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={pagoDatos.cvv}
                  onChange={handlePagoChange}
                  required
                  className="p-2 border rounded w-20"
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowPago(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button onClick={crearReabastecimiento}
                  type="submit"
                  className="bg-[#C8102E] text-white px-4 py-2 rounded hover:bg-red-800"
                >
                  Pagar
                </button>
              </div>
            </form>
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
