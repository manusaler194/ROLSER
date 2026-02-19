import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EncargadosTable from "./Encargado"; // Tu componente de ficha individual
import { apiFetch } from "../../utils/api";

const ListadoEncargado = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 3;
  
  const [encargadoSeleccionado, setEncargadoSeleccionado] = useState(null);

  useEffect(() => {
    apiFetch("http://localhost/api/encargadoAlmacen")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLista(data);
        } else {
          setLista(data.encargadoAlmacen || []);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando encargados:", err);
        setCargando(false);
      });
  }, []);

  const eliminarEncargado = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este Encargado?")) {
      return;
    }

    try {
      const response = await apiFetch(`http://localhost/api/encargadoAlmacen/borrar/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Corregido: antes decía admin.id_administrador
        const nuevaLista = lista.filter((enc) => enc.id_encargado !== id);
        setLista(nuevaLista);
        alert("Encargado eliminado con éxito.");
      } else {
        alert("Error al eliminar.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const filtrados = lista.filter((encargado) => {
    const termino = busqueda.toLowerCase();
    const nombre = (encargado.nombre || "").toLowerCase();
    const email = (encargado.email || "").toLowerCase();
    
    return nombre.includes(termino) || email.includes(termino);
  });

  const indiceUltimoItem = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  
  const encargadosVisibles = filtrados.slice(indicePrimerItem, indiceUltimoItem);
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
  
  if (encargadoSeleccionado) {
    return (
      <EncargadosTable 
        usuario={encargadoSeleccionado} 
        onVolver={() => setEncargadoSeleccionado(null)} 
      />
    );
  }

  if (cargando) return <div className="p-10 text-center text-gray-500 font-bold">Cargando encargados...</div>;

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
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">Encargados</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold mt-2 inline-block">
              Total: {filtrados.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate("/crear-encargado")}
            className="w-full sm:w-auto bg-[#bd0026] text-white px-4 sm:px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex justify-center items-center gap-2 text-sm sm:text-base"
          >
            <span className="text-xl leading-none pb-1">+</span> Nuevo
          </button>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar encargado por nombre o email..."
          className="w-full mb-6 md:mb-8 p-3 md:p-4 rounded-full border border-gray-400 px-4 md:px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white text-sm md:text-base"
          value={busqueda}
          onChange={handleBusquedaChange}
        />

        {/* LISTA DE ENCARGADOS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {encargadosVisibles.length > 0 ? (
            encargadosVisibles.map((encargado) => (
              <div 
                key={encargado.id_encargado} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors gap-4 sm:gap-2"
              >
                <div className="w-full sm:w-auto overflow-hidden">
                  <span className="block text-base md:text-lg font-bold text-gray-800 truncate">
                    {encargado.nombre}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 break-words">{encargado.email}</span>
                  <span className="block text-xs text-gray-400 mt-1">Tel: {encargado.telefono}</span>
                </div>
                
                {/* BOTONES ADAPTADOS A MÓVIL */}
                <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-2">
                  <button
                    onClick={() => navigate(`/modificar-encargado/${encargado.id_encargado}`)}
                    className="flex-1 sm:flex-none bg-black text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarEncargado(encargado.id_encargado)}
                    className="flex-1 sm:flex-none bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => setEncargadoSeleccionado(encargado)}
                    className="flex-1 sm:flex-none bg-white border border-[#bd0026] text-[#bd0026] px-3 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider text-center"
                  >
                    Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 md:p-10 text-center text-sm md:text-base text-gray-400">
              No se encontraron encargados.
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

export default ListadoEncargado;