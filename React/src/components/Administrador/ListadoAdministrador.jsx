import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminsTable from "./AdminsTable"; // Componente de Ficha Individual

const ListadoAdministrador = () => {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  
  // Estado para controlar si vemos la lista o la ficha de uno concreto
  const [adminSeleccionado, setAdminSeleccionado] = useState(null);

  // 1. CARGA DE DATOS DESDE LA RUTA CORRECTA
  useEffect(() => {
    fetch("http://192.168.0.14:8008/api/administradores")
      .then((res) => res.json())
      .then((data) => {
        // La API devuelve: { message: "...", admin: [...] }
        // Así que accedemos a data.admin
        setLista(data.admin || []); 
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando administradores:", err);
        setCargando(false);
      });
  }, []);

  // 2. FILTRADO
  const filtrados = lista.filter((admin) => {
    const termino = busqueda.toLowerCase();
    const nombreCompleto = `${admin.nombre} ${admin.apellidos}`.toLowerCase();
    const email = (admin.email || "").toLowerCase();
    
    return nombreCompleto.includes(termino) || email.includes(termino);
  });

  // 3. RENDERIZADO CONDICIONAL: ¿FICHA O LISTA?
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
        
        {/* BOTÓN VOLVER AL MENÚ */}
        <button 
          onClick={() => navigate("/usuarios")} 
          className="text-[#bd0026] font-bold mb-8 hover:underline flex items-center gap-2"
        >
          ← VOLVER AL MENÚ
        </button>

        {/* CABECERA */}
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

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar administrador por nombre o email..."
          className="w-full mb-8 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* LISTA DE ADMINISTRADORES */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {filtrados.length > 0 ? (
            filtrados.map((admin) => (
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
      </div>
    </div>
  );
};

export default ListadoAdministrador;