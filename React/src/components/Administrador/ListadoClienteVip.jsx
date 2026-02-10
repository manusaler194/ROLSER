import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientesVipsTable from "./ClientesVips"; // Componente de Ficha VIP

const ListadoClienteVip = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  // Estado para la ficha individual
  const [vipSeleccionado, setVipSeleccionado] = useState(null);

  // 1. CARGA DE DATOS (Ruta específica /api/clientesVip)
  useEffect(() => {
    fetch("http://localhost/api/clientesVip")
      .then((res) => res.json())
      .then((data) => {
        // La API devuelve: { message: "...", clientesVip: [...] }
        setLista(data.clientesVip || []); 
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando clientes VIP:", err);
        setCargando(false);
      });
  }, []);

  const eliminarClienteVip = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este Cliente?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost/api/clientesVip/borrar/${id}`, {
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

  // 2. FILTRADO (Buscamos por Nombre o Correo)
  const filtrados = lista.filter((vip) => {
    const termino = busqueda.toLowerCase();
    const nombre = (vip.nombre || "").toLowerCase();
    const email = (vip.email || "").toLowerCase();
    
    return nombre.includes(termino) || email.includes(termino);
  });

  // 3. RENDERIZADO CONDICIONAL (Ficha o Lista)
  if (vipSeleccionado) {
    return (
      <ClientesVipsTable 
        usuario={vipSeleccionado} 
        onVolver={() => setVipSeleccionado(null)} 
      />
    );
  }

  if (cargando) return <div className="p-10 text-center text-gray-500 font-bold">Cargando clientes VIP...</div>;

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
            <h2 className="text-3xl font-bold uppercase text-gray-900">
              Clientes <span className="text-[#b3002d]">VIP</span>
            </h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
              Total: {filtrados.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate("/crear-clientevip")}
            className="bg-[#bd0026] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex items-center gap-2"
          >
            <span className="text-xl leading-none pb-1">+</span> Nuevo VIP
          </button>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar VIP por nombre o correo..."
          className="w-full mb-8 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* LISTA DE CLIENTES VIP */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {filtrados.length > 0 ? (
            filtrados.map((vip) => (
              <div 
                key={vip.id_clientevip} 
                className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="block text-lg font-bold text-gray-800">
                    {vip.nombre}
                  </span>
                  <span className="text-sm text-gray-500 block mb-1">{vip.email}</span>
                  
                  {/* Info extra específica para VIPs (Catálogo) */}
                  {vip.catalogo && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md font-semibold mr-2">
                      Catálogo: {vip.catalogo.nombre_catalogo}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/modificar-clientevip/${vip.id_clientevip}`)}
                    className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarClienteVip(vip.id_clientevip)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm uppercase tracking-wider"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => setVipSeleccionado(vip)}
                    className="bg-white border border-[#bd0026] text-[#bd0026] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider"
                  >
                    Ver Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              No se encontraron clientes VIP.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListadoClienteVip;