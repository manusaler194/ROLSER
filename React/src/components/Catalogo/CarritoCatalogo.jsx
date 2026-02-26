import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2"; // <-- Importamos SweetAlert2

const CarritoCatalogo = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [cantidadCompra, setCantidadCompra] = useState(0);
  const [pagoDatos, setPagoDatos] = useState({
    nombre: "",
    numeroTarjeta: "",
    expiracion: "",
    cvc: "",
  });

  // Cargar carrito de articulos
  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      setCarrito(JSON.parse(stored));
    }
  }, []);

  // Actualizar cantidad
  const actualizarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    const nuevoCarrito = carrito.map((item) =>
      item.id_articulo === id ? { ...item, cantidad: Number(cantidad) } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Eliminar artículo
  const eliminarArticulo = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id_articulo !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const manejoPago = (e) => {
    setPagoDatos({ ...pagoDatos, [e.target.name]: e.target.value });
  };

  const pagoTarjeta = async (e) => {
    e.preventDefault();

    const ivaPorcentaje = 21; 
    const baseImponible = total / (1 + (ivaPorcentaje / 100));
    const totalIva = total - baseImponible;

    const payloadIdentidad = {
      id_cliente: role === 'cliente' ? user?.id_cliente : null,
      id_clientevip: role === 'clientevip' ? user?.id_clientevip : null,
      id_comercial: user?.id_comercial || null,
    };

    try {
      const resFactura = await apiFetch("http://100.25.154.102/api/factura/guardar", {
        method: "POST",
        body: JSON.stringify({
          base_imponible: baseImponible.toFixed(2),
          iva_porcentaje: ivaPorcentaje,
          total_iva: totalIva.toFixed(2),
          total_factura: total.toFixed(2),
          estado: "Pagado",
          metodo_pago: "Tarjeta",
          ...payloadIdentidad
        }),
      });

      const dataFactura = await resFactura.json();

      await apiFetch("http://100.25.154.102/api/pedidos/guardar", {
        method: "POST",
        body: JSON.stringify({
          fecha_pedido: new Date().toISOString().split("T")[0],
          estado: "Pagado",
          id_factura: dataFactura.id_factura, // ID generado automáticamente
          id_encargado: Math.floor(Math.random() * 10) + 1,
          ...payloadIdentidad
        }),
      });

      for (const item of carrito) {
        const nuevoStock = item.stock_actual - item.cantidad;

        await apiFetch(`http://100.25.154.102/api/articulo/actualizar/${item.id_articulo}`, {
          method: "PUT",
          body: JSON.stringify({
            nombre : item.nombre,
            descripcion: item.descripcion,
            precio: item.precio,
            stock_actual: nuevoStock,
            id_seccion: item.id_seccion,
            id_administrador: item.id_administrador,
          }),
        });
      }

      // <-- Reemplazo de alert de éxito por SweetAlert2
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "¡Compra procesada con éxito!",
        confirmButtonColor: "#C8102E",
        confirmButtonText: "Ir a mis pedidos"
      }).then(() => {
        setCarrito([]);
        localStorage.removeItem("carrito");
        setMostrarPago(false);
        navigate("/pedidos");
      });

    } catch (error) {
      console.error("Detalle del error:", error);
      
      // <-- Reemplazo de alert de error por SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo completar: " + error.message,
        confirmButtonColor: "#C8102E",
      });
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
            <div key={item.id_articulo} className="flex flex-col md:flex-row items-center justify-between mb-4 border-b pb-4">
              <div className="flex items-center flex-1 gap-4">
                <img src={item.imagenSrc} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
                <span className="text-lg font-medium">{item.nombre}</span>
              </div>
              <div className="flex items-center gap-2 w-32 justify-center">
                <button 
                  onClick={() => actualizarCantidad(item.id_articulo, item.cantidad - 1)} 
                  disabled={item.cantidad <= 1} 
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  ↓
                </button>
                
                <input 
                  type="number" 
                  min={1} 
                  value={item.cantidad} 
                  onChange={(e) => actualizarCantidad(item.id_articulo, e.target.value)} 
                  className="w-12 p-1 border rounded text-center" 
                />
                
                <button 
                  onClick={() => actualizarCantidad(item.id_articulo, item.cantidad + 1)} 
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  ↑
                </button>
              </div>
              <div className="w-32 text-right font-semibold">{(item.precio * item.cantidad).toFixed(2)} €</div>
              <button onClick={() => eliminarArticulo(item.id_articulo)} className="ml-4 text-red-600 font-bold hover:underline">X</button>
            </div>
          ))}
          <div className="flex justify-end mt-4 text-2xl font-bold">Total: {total.toFixed(2)} €</div>
          <div className="flex justify-end mt-4">
            <button onClick={() => setMostrarPago(true)} className="bg-[#C8102E] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-red-800 transition">Realizar pago</button>
          </div>
        </div>
      )}

      {mostrarPago && (
        <div className="fixed inset-0 bg-[#C8102E] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Datos de pago</h2>
            <form className="flex flex-col gap-3" onSubmit={pagoTarjeta}>
              <input type="text" name="nombre" placeholder="Nombre del titular" value={pagoDatos.nombre} onChange={manejoPago} required className="p-2 border rounded" />
              <input type="text" name="numeroTarjeta" placeholder="Número de tarjeta" value={pagoDatos.numeroTarjeta} onChange={manejoPago} required className="p-2 border rounded" />
              <div className="flex gap-2">
                <input type="text" name="expiracion" placeholder="MM/AA" value={pagoDatos.expiracion} onChange={manejoPago} required className="p-2 border rounded flex-1" />
                <input type="text" name="cvc" placeholder="CVC" value={pagoDatos.cvc} onChange={manejoPago} required className="p-2 border rounded w-20" />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setMostrarPago(false)} className="px-4 py-2 border rounded hover:bg-gray-200">Cancelar</button>
                <button type="submit" className="bg-[#C8102E] text-white px-4 py-2 rounded hover:bg-red-800">Pagar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoCatalogo;