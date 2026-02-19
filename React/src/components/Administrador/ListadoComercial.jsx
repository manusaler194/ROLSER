import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComercialesTable from "./Comercial";
import { apiFetch } from "../../utils/api";

const ListadoComerciales = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 3;

  const [comercialSeleccionado, setComercialSeleccionado] = useState(null);

  useEffect(() => {
    apiFetch("http://localhost/api/comerciales")
      .then((res) => res.json())
      .then((data) => {
        setLista(data.comerciales || []); 
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando comerciales:", err);
        setCargando(false);
      });
  }, []);

  const eliminarComercial = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este Comercial?")) {
      return;
    }

    try {
      const response = await apiFetch(`http://localhost/api/comerciales/borrar/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Corregido: filtrando por id_comercial en lugar de id_administrador
        const nuevaLista = lista.filter((c) => c.id_comercial !== id);
        setLista(nuevaLista);
        alert("Comercial eliminado con éxito.");
      } else {
        alert("Error al eliminar.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const filtrados = lista.filter((comercial) => {
    const termino = busqueda.toLowerCase();
    const nombre = (comercial.nombre || "").toLowerCase();
    const email = (comercial.email || "").toLowerCase();
    
    return nombre.includes(termino) || email.includes(termino);
  });

  const indiceUltimoItem = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  
  const comercialesVisibles = filtrados.slice(indicePrimerItem, indiceUltimoItem);
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
  
  if (comercialSeleccionado) {
    return (
      <ComercialesTable 
        usuario={comercialSeleccionado} 
        onVolver={() => setComercialSeleccionado(null)} 
      />
    );
  }

  if (cargando) return <div className="p-10 text-center text-gray-500 font-bold">Cargando comerciales...</div>;

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
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">Comerciales</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold mt-2 inline-block">
              Total: {filtrados.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate("/crear-comercial")}
            className="w-full sm:w-auto bg-[#bd0026] text-white px-4 sm:px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex justify-center items-center gap-2 text-sm sm:text-base"
          >
            <span className="text-xl leading-none pb-1">+</span> Nuevo
          </button>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar comercial por nombre o email..."
          className="w-full mb-6 md:mb-8 p-3 md:p-4 rounded-full border border-gray-400 px-4 md:px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white text-sm md:text-base"
          value={busqueda}
          onChange={handleBusquedaChange}
        />

        {/* LISTA DE COMERCIALES */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {comercialesVisibles.length > 0 ? (
            comercialesVisibles.map((comercial) => (
              <div 
                key={comercial.id_comercial} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors gap-4 sm:gap-2"
              >
                <div className="w-full sm:w-auto overflow-hidden">
                  <span className="block text-base md:text-lg font-bold text-gray-800 truncate">
                    {comercial.nombre}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 break-words">{comercial.email}</span>
                  <span className="block text-xs text-gray-400 mt-1">Contacto: {comercial.contacto}</span>
                  
                  {/* Badge de administrador */}
                  {comercial.administrador && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mt-2 font-medium">
                      Admin: {comercial.administrador.nombre} {comercial.administrador.apellidos}
                    </span>
                  )}
                </div>
                
                {/* BOTONES ADAPTADOS A MÓVIL */}
                <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-2">
                  <button
                    onClick={() => navigate(`/modificar-comercial/${comercial.id_comercial}`)}
                    className="flex-1 sm:flex-none bg-black text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarComercial(comercial.id_comercial)}
                    className="flex-1 sm:flex-none bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => setComercialSeleccionado(comercial)}
                    className="flex-1 sm:flex-none bg-white border border-[#bd0026] text-[#bd0026] px-3 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 md:p-10 text-center text-sm md:text-base text-gray-400">
              No se encontraron comerciales.
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
export default ListadoComerciales;