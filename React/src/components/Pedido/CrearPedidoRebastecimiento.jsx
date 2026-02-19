import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const CrearPedidoRebastecimiento = () => {
  const { user, role } = useAuth();
  const [articulos, setArticulos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [idProveedor, setIdProveedor] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseArt = await apiFetch('http://localhost/api/articulo');
        const dataArt = await responseArt.json();
        console.log(dataArt);
        setArticulos(dataArt.almacen);

        const responseProv = await apiFetch('http://localhost/api/proveedor');
        const dataProv = await responseProv.json();
        console.log(dataProv);
        setProveedores(dataProv.proveedor);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleCantidad = (id, nuevaCantidad) => {
    const valor = parseInt(nuevaCantidad) || 0;
    setArticulos(prevArticulo =>
      prevArticulo.map(articulo =>
        articulo.id_articulo === id ? { ...articulo, cantidad: valor } : articulo
      )
    );
  };

  const totalPedido = articulos.reduce((contador, articulo) => contador + ((articulo.cantidad || 0) * (articulo.precio || 0)), 0);

  const crearReabastecimiento = async () => {
    if (!idProveedor) {
      alert("Por favor, selecciona un proveedor.");
      return;
    }

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Crear Pedido Reposición
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">Gestiona la entrada de stock</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-stretch sm:items-end">
            <div className="flex flex-col grow sm:w-64">
              <label className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
                Proveedor
              </label>
              <select
                value={idProveedor}
                onChange={(e) => setIdProveedor(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#bc002d] outline-none shadow-sm transition-all"
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map(prov => (
                  <option key={prov.id_proveedor} value={prov.id_proveedor}>{prov.nombre_empresa}</option>
                ))}
              </select>
            </div>

            <button
              onClick={crearReabastecimiento}
              className="bg-[#bc002d] hover:bg-red-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95 uppercase text-sm tracking-widest"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>

        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">Producto</th>
                <th className="px-6 py-4 text-center font-bold text-gray-700 text-sm uppercase">Stock Actual</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">Precio Unit.</th>
                <th className="px-6 py-4 text-center font-bold text-gray-700 text-sm uppercase">Cantidad</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articulos.map((articulo) => (
                <tr key={articulo.id_articulo} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{articulo.nombre}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${articulo.stock_actual < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {articulo.stock_actual}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{articulo.precio}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      min="0"
                      value={articulo.cantidad || 0}
                      onChange={(e) => handleCantidad(articulo.id_articulo, e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none text-center font-bold"
                    />
                  </td>
                  <td className="px-6 py-4 font-bold text-red-700 text-right">
                    {((articulo.cantidad || 0) * (articulo.precio || 0)).toFixed(2)}€
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {articulos.map((articulo) => (
            <div key={articulo.id_articulo} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-900 text-lg">{articulo.nombre}</h3>
                <span className={`px-2 py-1 text-[10px] font-black rounded-full uppercase ${articulo.stock_actual < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  Stock: {articulo.stock_actual}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Precio Unit.</p>
                  <p className="font-medium text-gray-800">{articulo.precio}€</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase">Subtotal</p>
                  <p className="font-bold text-red-700">{((articulo.cantidad || 0) * (articulo.precio || 0)).toFixed(2)}€</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-100 mt-2">
                  <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Cantidad a pedir</label>
                  <input
                    type="number"
                    min="0"
                    value={articulo.cantidad || 0}
                    onChange={(e) => handleCantidad(articulo.id_articulo, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 outline-none text-center font-bold"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6 sm:gap-10 w-full sm:w-auto justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest">Total del Pedido</span>
              <span className="text-2xl sm:text-3xl font-black text-red-700">{totalPedido}€</span>
            </div>
            <div className="h-10 w-0.5 bg-gray-100 hidden sm:block"></div>
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Items</span>
              <span className="font-bold text-gray-800">{articulos.filter(a => a.cantidad > 0).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearPedidoRebastecimiento;