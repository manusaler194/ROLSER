import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminsTable from "./AdminsTable"; 

const ListadoAdministrador = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 3;

  const [adminSeleccionado, setAdminSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost/api/administradores")
      .then((res) => res.json())
      .then((data) => {
        setLista(data.admin || []); 
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando administradores:", err);
        setCargando(false);
      });
  }, []);

  const eliminarAdmin = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este administrador?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost/api/administradores/borrar/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const nuevaLista = lista.filter((admin) => admin.id_administrador !== id);
        setLista(nuevaLista);
        alert("Administrador eliminado con éxito.");
      } else {
        alert("Error al eliminar.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const filtrados = lista.filter((admin) => {
    const termino = busqueda.toLowerCase();
    const nombreCompleto = `${admin.nombre} ${admin.apellidos}`.toLowerCase();
    const email = (admin.email || "").toLowerCase();
    
    return nombreCompleto.includes(termino) || email.includes(termino);
  });

  
  const indiceUltimoItem = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  
  
  const administradoresVisibles = filtrados.slice(indicePrimerItem, indiceUltimoItem);
  
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

  if (adminSeleccionado) {
    return (
      <AdminsTable 
        usuario={adminSeleccionado} 
        onVolver={() => setAdminSeleccionado(null)} 
      />
    );
  }

  if (cargando) return <div className="p-10 text-center">Cargando administradores...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate("/usuarios")} 
          className="text-[#bd0026] font-bold mb-8 hover:underline flex items-center gap-2"
        >
          ← VOLVER AL MENÚ
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold uppercase text-gray-900">Administradores</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
              Total: {filtrados.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate("/crear-admin")}
            className="bg-[#bd0026] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 transition-all uppercase flex items-center gap-2"
          >
            <span className="text-xl leading-none pb-1">+</span> Nuevo
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar administrador por nombre o email..."
          className="w-full mb-8 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
          value={busqueda}
          onChange={handleBusquedaChange} // Usamos el nuevo manejador
        />

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {/* AQUI CAMBIAMOS filtrados.map POR administradoresVisibles.map */}
          {administradoresVisibles.length > 0 ? (
            administradoresVisibles.map((admin) => (
              <div 
                key={admin.id_administrador} 
                className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="block text-lg font-bold text-gray-800">
                    {admin.nombre} {admin.apellidos}
                  </span>
                  <span className="text-sm text-gray-500">{admin.email}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/modificar-admin/${admin.id_administrador}`)}
                    className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider"
                  >
                    Modificar
                  </button>

                  <button
                    onClick={() => eliminarAdmin(admin.id_administrador)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-sm uppercase tracking-wider"
                  >
                    Borrar
                  </button>

                  <button
                    onClick={() => setAdminSeleccionado(admin)}
                    className="bg-white border border-[#bd0026] text-[#bd0026] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider"
                  >
                    Ver Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              No se encontraron administradores.
            </div>
          )}
        </div>

        {/* 3. CONTROLES DE PAGINACIÓN */}
        {filtrados.length > ITEMS_POR_PAGINA && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePaginaAnterior}
              disabled={paginaActual === 1}
              className={`px-4 py-2 rounded-lg font-bold ${
                paginaActual === 1 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Anterior
            </button>
            
            <span className="text-gray-600 font-medium">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              onClick={handlePaginaSiguiente}
              disabled={paginaActual === totalPaginas}
              className={`px-4 py-2 rounded-lg font-bold ${
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

export default ListadoAdministrador;