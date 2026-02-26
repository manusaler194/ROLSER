import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, BASE_URL } from '../../utils/api'; 
import Swal from 'sweetalert2'; // <-- Importamos SweetAlert2

import Ficha from "./Ficha";

const GestionUsuarios = () => {
  const navigate = useNavigate();
  
  const [datos, setDatos] = useState({
    admins: [],
    clientes: [],
    vips: [],
    encargados: [],
    comerciales: []
  });
  const [cargando, setCargando] = useState(true);
  
  const [pestañaActual, setPestañaActual] = useState("admins");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 5;
  
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch(`${BASE_URL}/administradores`).then(res => res.json()),
      apiFetch(`${BASE_URL}/clientes`).then(res => res.json()),
      apiFetch(`${BASE_URL}/clientesVip`).then(res => res.json()),
      apiFetch(`${BASE_URL}/encargadoAlmacen`).then(res => res.json()),
      apiFetch(`${BASE_URL}/comerciales`).then(res => res.json())
    ])
    .then(([dataAdmins, dataClientes, dataVips, dataEncargados, dataComerciales]) => {
      setDatos({
        admins: dataAdmins.admin || dataAdmins || [],
        clientes: dataClientes.clientes || dataClientes || [],
        vips: dataVips.clientesVip || dataVips || [],
        encargados: Array.isArray(dataEncargados) ? dataEncargados : (dataEncargados.encargadoAlmacen || []),
        comerciales: dataComerciales.comerciales || dataComerciales || [],
      });
      setCargando(false);
    })
    .catch((err) => {
      console.error("Error cargando usuarios:", err);
      setCargando(false);
    });
  }, []);

  const configPestañas = {
    admins: { 
      titulo: "Administradores", 
      idKey: "id_administrador", 
      endpoint: "administradores",
      rutaNuevo: "/crear-admin",
      rutaModificar: "/modificar-admin" 
    },
    clientes: { 
      titulo: "Clientes", 
      idKey: "id_cliente", 
      endpoint: "clientes",
      rutaNuevo: "/crear-cliente",
      rutaModificar: "/modificar-cliente"
    },
    vips: { 
      titulo: "Clientes VIP", 
      idKey: "id_clientevip", 
      endpoint: "clientesVip",
      rutaNuevo: "/crear-clientevip",
      rutaModificar: "/modificar-clientevip"
    },
    encargados: { 
      titulo: "Encargados", 
      idKey: "id_encargado", 
      endpoint: "encargadoAlmacen",
      rutaNuevo: "/crear-encargado",
      rutaModificar: "/modificar-encargado"
    },
    comerciales: { 
      titulo: "Comerciales", 
      idKey: "id_comercial", 
      endpoint: "comerciales",
      rutaNuevo: "/crear-comercial",
      rutaModificar: "/modificar-comercial"
    },
  };

  const actualConf = configPestañas[pestañaActual];

  // --- FUNCIÓN ACTUALIZADA CON SWEETALERT2 ---
  const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar este ${actualConf.titulo.toLowerCase()}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#bd0026', // Color rojo de tu interfaz
      cancelButtonColor: '#000000',  // Color negro de los botones
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await apiFetch(`${BASE_URL}/${actualConf.endpoint}/borrar/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setDatos(prev => ({
            ...prev,
            [pestañaActual]: prev[pestañaActual].filter(item => item[actualConf.idKey] !== id)
          }));
          
          Swal.fire(
            '¡Eliminado!',
            `${actualConf.titulo} ha sido eliminado con éxito.`,
            'success'
          );
        } else {
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar el registro.',
            'error'
          );
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          'Error',
          'Ocurrió un error inesperado al conectar con el servidor.',
          'error'
        );
      }
    }
  };
  // ---------------------------------------------

  const listaActiva = datos[pestañaActual] || [];
  
  const filtrados = listaActiva.filter((item) => {
    const termino = busqueda.toLowerCase();
    const nombreCompleto = item.apellidos ? `${item.nombre} ${item.apellidos}`.toLowerCase() : (item.nombre || "").toLowerCase();
    const email = (item.email || "").toLowerCase();
    return nombreCompleto.includes(termino) || email.includes(termino);
  });

  const indiceUltimoItem = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  const usuariosVisibles = filtrados.slice(indicePrimerItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA);

  const handleCambioPestaña = (nuevaPestaña) => {
    setPestañaActual(nuevaPestaña);
    setBusqueda("");
    setPaginaActual(1);
    setUsuarioSeleccionado(null);
  };

  if (usuarioSeleccionado) {
    const onVolver = () => setUsuarioSeleccionado(null);
    
    const mapeoTipos = {
      admins: 'admin',
      clientes: 'cliente',
      vips: 'vip',
      comerciales: 'comercial',
      encargados: 'encargado'
    };

    return (
      <Ficha 
        usuario={usuarioSeleccionado} 
        tipo={mapeoTipos[pestañaActual]} 
        onVolver={onVolver} 
      />
    );
  }

  if (cargando) return <div className="min-h-screen p-10 text-center text-xl font-bold text-gray-500">Cargando usuarios...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-8 text-center">
          {/* Título principal más grande: de text-3xl/4xl a text-4xl/5xl */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-widest">
            Gestión de Usuarios
          </h1>
          <div className="h-1 w-24 bg-[#bd0026] mx-auto mt-4"></div>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          {Object.entries(configPestañas).map(([clave, config]) => (
            <button
              key={clave}
              onClick={() => handleCambioPestaña(clave)}
              className={`px-5 py-3 rounded-lg font-bold text-base md:text-lg transition-all ${
                pestañaActual === clave 
                  ? "bg-[#bd0026] text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {config.titulo} ({datos[clave].length})
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold uppercase text-gray-900">Listado de {actualConf.titulo}</h2>
          </div>
          
          <button
            onClick={() => navigate(actualConf.rutaNuevo)}
            
            className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-gray-800 transition-all uppercase flex justify-center items-center gap-2"
          >
            <span className="text-2xl leading-none pb-1">+</span> Nuevo
          </button>
        </div>

        <input
          type="text"
          placeholder={`Buscar en ${actualConf.titulo.toLowerCase()} por nombre o email...`}
          
          className="w-full mb-6 p-4 rounded-full border border-gray-300 px-6 text-lg focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
          value={busqueda}
          onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
        />

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {usuariosVisibles.length > 0 ? (
            usuariosVisibles.map((item) => (
              <div 
                key={item[actualConf.idKey]} 
                className="flex flex-col md:flex-row justify-between md:items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 gap-4"
              >
                <div className="overflow-hidden">
                  {/* Nombre más grande: de text-lg a text-xl */}
                  <span className="block text-xl font-bold text-gray-800 truncate">
                    {item.nombre} {item.apellidos || ''}
                  </span>
                  {/* Email más grande: de text-sm a text-base */}
                  <span className="text-base text-gray-500 break-words">{item.email}</span>
                  
                  {/* Detalles más grandes: de text-xs a text-sm */}
                  {item.telefono && <span className="block text-sm text-gray-500 mt-1">Tel: {item.telefono}</span>}
                  {item.contacto && <span className="block text-sm text-gray-500 mt-1">Contacto: {item.contacto}</span>}
                  {item.catalogo && <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-md font-semibold mt-1">Catálogo: {item.catalogo.nombre_catalogo}</span>}
                </div>
                
                <div className="flex flex-wrap sm:flex-nowrap w-full md:w-auto gap-2">
                  {/* Botones de acción más grandes: de text-xs a text-sm */}
                  <button
                    onClick={() => navigate(`${actualConf.rutaModificar}/${item[actualConf.idKey]}`)}
                    className="flex-1 md:flex-none bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 shadow-sm uppercase text-center"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(item[actualConf.idKey])}
                    className="flex-1 md:flex-none bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-800 shadow-sm uppercase text-center"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => setUsuarioSeleccionado(item)}
                    className="flex-1 md:flex-none bg-white border border-[#bd0026] text-[#bd0026] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#bd0026] hover:text-white shadow-sm uppercase text-center"
                  >
                    Ficha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-lg text-gray-400">
              No se encontraron resultados en {actualConf.titulo}.
            </div>
          )}
        </div>

        {filtrados.length > ITEMS_POR_PAGINA && (
          <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className={`px-5 py-2 text-base rounded-lg font-bold ${paginaActual === 1 ? "bg-gray-200 text-gray-400" : "bg-white border text-gray-700 hover:bg-gray-50"}`}
            >
              Anterior
            </button>
            {/* Texto de paginación más grande: text-lg */}
            <span className="text-gray-600 font-medium text-lg">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className={`px-5 py-2 text-base rounded-lg font-bold ${paginaActual === totalPaginas ? "bg-gray-200 text-gray-400" : "bg-white border text-gray-700 hover:bg-gray-50"}`}
            >
              Siguiente
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default GestionUsuarios;