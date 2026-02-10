import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientesTable from "./ClientesTable"; // Tu componente de Ficha Individual

const ListadoCliente = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  
  useEffect(() => {
    fetch("http://localhost/api/clientes")
      .then((res) => res.json())
      .then((data) => {
        
        setLista(data.clientes || []); 
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando clientes:", err);
        setCargando(false);
      });
  }, []);

  const eliminarCliente = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este Cliente?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost/api/clientes/borrar/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        
        const nuevaLista = lista.filter((admin) => admin.id_administrador !== id);
        setLista(nuevaLista);
        alert("Cliente eliminado con éxito.");
      } else {
        alert("Error al eliminar.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filtrados = lista.filter((cliente) => {
    const termino = busqueda.toLowerCase();
    const nombre = (cliente.nombre || "").toLowerCase();
    const email = (cliente.email || "").toLowerCase();
    
    return nombre.includes(termino) || email.includes(termino);
  });

  // 3. RENDERIZADO CONDICIONAL (Ficha o Lista)
  if (clienteSeleccionado) {
    return (
      <ClientesTable 
        usuario={clienteSeleccionado} 
        onVolver={() => setClienteSeleccionado(null)} 
      />
    );
  }

  if (cargando) return <div className="p-10 text-center text-gray-500 font-bold">Cargando clientes...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* BOTÓN VOLVER */}
        <button 
          onClick={() => navigate("/usuarios")} 
          className="text-[#bd0026] font-bold mb-8 hover:underline flex items-center gap-2"
        >
          ← VOLVER AL MENÚ
        </button>

        {/* CABECERA */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold uppercase text-gray-900">Clientes</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
              Total: {filtrados.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate("/crear-cliente")}
            className="bg-[#bd0026] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex items-center gap-2"
          >
            <span className="text-xl leading-none pb-1">+</span> Nuevo Cliente
          </button>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar cliente por nombre o correo..."
          className="w-full mb-8 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* LISTA DE CLIENTES */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {filtrados.length > 0 ? (
            filtrados.map((cliente) => (
              <div 
                key={cliente.id_cliente} 
                className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="block text-lg font-bold text-gray-800">
                    {cliente.nombre}
                  </span>
                  <span className="text-sm text-gray-500">{cliente.email}</span>
                  {/* Info extra (opcional): mostramos el comercial asignado si existe */}
                  {cliente.comercial && (
                    <span className="block text-xs text-gray-400 mt-1">
                      Comercial: {cliente.comercial.nombre}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/modificar-cliente/${cliente.id_cliente}`)}
                    className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarCliente(cliente.id_cliente)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm uppercase tracking-wider"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => setClienteSeleccionado(cliente)}
                    className="bg-white border border-[#bd0026] text-[#bd0026] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider"
                  >
                    Ver Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              No se encontraron clientes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListadoCliente;