import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientesVipsTable from "./ClientesVips"; // Componente de Ficha VIP
import { apiFetch } from "../../utils/api";

const ListadoClienteVip = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 3;
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Estado para la ficha individual
  const [vipSeleccionado, setVipSeleccionado] = useState(null);

  // 1. CARGA DE DATOS
  useEffect(() => {
    apiFetch("http://localhost/api/clientesVip")
      .then((res) => res.json())
      .then((data) => {
        setLista(data.clientesVip || []); 
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando clientes VIP:", err);
        setCargando(false);
      });
  }, []);

  const eliminarClienteVip = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este Cliente VIP?")) {
      return;
    }

    try {
      const response = await apiFetch(`http://localhost/api/clientesVip/borrar/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Corregido: antes decía admin.id_administrador
        const nuevaLista = lista.filter((vip) => vip.id_clientevip !== id);
        setLista(nuevaLista);
        alert("Cliente eliminado con éxito.");
      } else {
        alert("Error al eliminar.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 2. FILTRADO
  const filtrados = lista.filter((vip) => {
    const termino = busqueda.toLowerCase();
    const nombre = (vip.nombre || "").toLowerCase();
    const email = (vip.email || "").toLowerCase();
    
    return nombre.includes(termino) || email.includes(termino);
  });

  const indiceUltimoItem = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  
  const clientesVipVisibles = filtrados.slice(indicePrimerItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1); 
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  // 3. RENDERIZADO CONDICIONAL
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* BOTÓN VOLVER */}
        <button 
          onClick={() => navigate("/usuarios")} 
          className="text-[#bd0026] font-bold mb-6 md:mb-8 hover:underline flex items-center gap-2 text-sm md:text-base"
        >
          ← VOLVER AL MENÚ
        </button>

        {/* CABECERA */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">
              Clientes <span className="text-[#b3002d]">VIP</span>
            </h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold mt-2 inline-block">
              Total: {filtrados.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate("/crear-clientevip")}
            className="w-full sm:w-auto bg-[#bd0026] text-white px-4 sm:px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex justify-center items-center gap-2 text-sm sm:text-base"
          >
            <span className="text-xl leading-none pb-1">+</span> Nuevo VIP
          </button>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar VIP por nombre o correo..."
          className="w-full mb-6 md:mb-8 p-3 md:p-4 rounded-full border border-gray-400 px-4 md:px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white text-sm md:text-base"
          value={busqueda}
          onChange={handleBusquedaChange}
        />

        {/* LISTA DE CLIENTES VIP */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {clientesVipVisibles.length > 0 ? (
            clientesVipVisibles.map((vip) => (
              <div 
                key={vip.id_clientevip} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors gap-4 sm:gap-2"
              >
                <div className="w-full sm:w-auto overflow-hidden">
                  <span className="block text-base md:text-lg font-bold text-gray-800 truncate">
                    {vip.nombre}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 block mb-2 break-words">
                    {vip.email}
                  </span>
                  
                  {/* Info extra específica para VIPs */}
                  {vip.catalogo && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md font-semibold">
                      Catálogo: {vip.catalogo.nombre_catalogo}
                    </span>
                  )}
                </div>
                
                {/* BOTONES ADAPTADOS A MÓVIL */}
                <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-2">
                  <button
                    onClick={() => navigate(`/modificar-clientevip/${vip.id_clientevip}`)}
                    className="flex-1 sm:flex-none bg-black text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarClienteVip(vip.id_clientevip)}
                    className="flex-1 sm:flex-none bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => setVipSeleccionado(vip)}
                    className="flex-1 sm:flex-none bg-white border border-[#bd0026] text-[#bd0026] px-3 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 md:p-10 text-center text-sm md:text-base text-gray-400">
              No se encontraron clientes VIP.
            </div>
          )}
        </div>

        {/* PAGINACIÓN */}
        {filtrados.length > ITEMS_POR_PAGINA && (
          <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
            <button
              onClick={handlePaginaAnterior}
              disabled={paginaActual === 1}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-sm md:text-base ${
                paginaActual === 1 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Anterior
            </button>
            
            <span className="text-gray-600 font-medium text-sm md:text-base mb-2 sm:mb-0">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              onClick={handlePaginaSiguiente}
              disabled={paginaActual === totalPaginas}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-sm md:text-base ${
                paginaActual === totalPaginas 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoClienteVip;