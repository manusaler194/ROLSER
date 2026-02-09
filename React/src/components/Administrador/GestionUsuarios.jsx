/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import AdminsTable from "./AdminsTable";
import ClientesTable from "./ClientesTable";
import VipsTable from "./ClientesVips";
import EncargadosTable from "./Encargado";
import ComercialesTable from "./Comercial";

const GestionUsuarios = () => {
  
  const URL_API = "http://192.168.0.14:8008/api/users";

  
  const navegar = useNavigate();

  // Estados
  const [vistaActual, setVistaActual] = useState("MENU");
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosFormulario, setDatosFormulario] = useState(null);

  const [datosGlobales, setDatosGlobales] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [errorConexion, setErrorConexion] = useState(null);

  const listaCategorias = [
    { id: "admins", titulo: "Administradores" },
    { id: "clientes", titulo: "Clientes" },
    { id: "vips", titulo: "Clientes VIP" },
    { id: "encargados", titulo: "Encargados" },
    { id: "comerciales", titulo: "Comerciales" },
  ];

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch(URL_API);
        if (!respuesta.ok) throw new Error("Error de conexión");
        const resultado = await respuesta.json();
        setDatosGlobales(resultado);
      } catch (err) {
        console.error(err);
        setErrorConexion("No se pudo conectar con el servidor.");
      } finally {
        setEstaCargando(false);
      }
    };

    cargarUsuarios();
  }, []);

  const formatearUsuario = (usuario) => ({
    id:
      usuario.id_cliente ||
      usuario.id_clientevip ||
      usuario.id_encargado ||
      usuario.id_comercial ||
      usuario.id_administrador ||
      usuario.id,

    nombre: usuario.nombre || "",
    apellidos: usuario.apellidos || "",
    email: usuario.email || usuario.correo || "",
    telefono: usuario.telefono || usuario.contacto || "",
    direccion: usuario.direccion || "",
    original: usuario,
  });

  
  const manejarCrearNuevo = () => {
    if (categoriaActiva === "admins") {
      navegar("/crear-admin");
    } else if (categoriaActiva === "clientes") {
      navegar("/crear-cliente");
    } else if (categoriaActiva === "vips") {
      navegar("/crear-clientevip");
    } else if (categoriaActiva === "comerciales") {
      navegar("/crear-comercial");
    } else if (categoriaActiva === "encargados") {
      navegar("/crear-encargado");
    } else {
      
      setDatosFormulario({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        direccion: "",
      });
      setVistaActual("EDITAR"); 
    }
  };

  if (estaCargando)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-600">
        Cargando recursos...
      </div>
    );
  if (errorConexion)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        {errorConexion}
      </div>
    );

  // ---------------------------- VISTAS ------------

  // 1. MENU PRINCIPAL
  if (vistaActual === "MENU") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-widest">
            Gestión de Usuarios
          </h1>
          <div className="h-1 w-24 bg-[#bd0026] mx-auto mt-4"></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {listaCategorias.map((categoria) => (
            <BotonCategoria
              key={categoria.id}
              categoria={categoria}
              cantidad={datosGlobales?.[categoria.id]?.length || 0}
              alHacerClick={() => {
                if (datosGlobales?.[categoria.id]) {
                  setCategoriaActiva(categoria.id);
                  setVistaActual("LISTA");
                  setTextoBusqueda("");
                } else {
                  alert(`Sin datos para ${categoria.titulo}`);
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // 2. VISTA DE LISTA
  if (vistaActual === "LISTA") {
    const listaSinFiltrar = datosGlobales[categoriaActiva] || [];

    const usuariosFiltrados = listaSinFiltrar
      .map(formatearUsuario)
      .filter((usuario) => {
        const termino = textoBusqueda.toLowerCase();
        return (
          usuario.nombre.toLowerCase().includes(termino) ||
          usuario.apellidos.toLowerCase().includes(termino) ||
          usuario.email.toLowerCase().includes(termino)
        );
      });

    const tituloSeccion = listaCategorias.find(
      (c) => c.id === categoriaActiva,
    )?.titulo;

    return (
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setVistaActual("MENU")}
            className="text-[#bd0026] font-bold mb-8 hover:underline flex items-center gap-2"
          >
            ← VOLVER AL MENÚ
          </button>

          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-left w-full md:w-auto">
              <h2 className="text-3xl font-bold text-black uppercase">
                {tituloSeccion}
              </h2>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
                Total: {usuariosFiltrados.length}
              </span>
            </div>

            
            <button
              onClick={manejarCrearNuevo}
              className="w-full md:w-auto bg-[#bd0026] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-800 hover:shadow-xl transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span className="text-xl leading-none pb-1">+</span> Crear Nuevo
            </button>
       
          </div>

          <input
            type="text"
            placeholder="Buscar usuario..."
            className="w-full mb-8 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
          />

          <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario, index) => (
                <ItemLista
                  key={index}
                  usuario={usuario}
                  alVer={() => {
                    setUsuarioSeleccionado(usuario);
                    setVistaActual("FICHA");
                  }}
                  alEditar={() => {
                    if (categoriaActiva === "admins") {
                      navegar(`/modificar-admin/${usuario.id}`);
                    } else if (categoriaActiva === "clientes") {
                      navegar(`/modificar-cliente/${usuario.id}`);
                    } else if (categoriaActiva === "vips") {
                      navegar(`/modificar-clientevip/${usuario.id}`);
                    } else if (categoriaActiva === "comerciales") {
                      navegar(`/modificar-comercial/${usuario.id}`);
                    } else if (categoriaActiva === "encargados") {
                      navegar(`/modificar-encargado/${usuario.id}`);
                    } else {
                      setUsuarioSeleccionado(usuario);
                      setDatosFormulario(usuario);
                      setVistaActual("EDITAR");
                    }
                  }}
                />
              ))
            ) : (
              <div className="p-10 text-center text-gray-400">
                No hay resultados.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. VISTA DE FICHA
  if (vistaActual === "FICHA" && usuarioSeleccionado) {
    if (categoriaActiva === "admins") {
      return (
        <AdminsTable
          usuario={usuarioSeleccionado}
          onVolver={() => setVistaActual("LISTA")}
        />
      );
    } else if (categoriaActiva === "clientes") {
      return (
        <ClientesTable
          usuario={usuarioSeleccionado}
          onVolver={() => setVistaActual("LISTA")}
        />
      );
    } else if (categoriaActiva === "vips") {
      return (
        <VipsTable
          usuario={usuarioSeleccionado}
          onVolver={() => setVistaActual("LISTA")}
        />
      );
    } else if (categoriaActiva === "encargados") {
      return (
        <EncargadosTable
          usuario={usuarioSeleccionado}
          onVolver={() => setVistaActual("LISTA")}
        />
      );
    } else if (categoriaActiva === "comerciales") {
      return (
        <ComercialesTable
          usuario={usuarioSeleccionado}
          onVolver={() => setVistaActual("LISTA")}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <p>Cargando ficha...</p>
      </div>
    );
  }

  
  
};



const BotonCategoria = ({ categoria, cantidad, alHacerClick }) => (
  <button
    onClick={alHacerClick}
    className="bg-white group p-8 rounded-xl border border-gray-300 shadow-sm hover:border-[#bd0026] hover:shadow-xl transition-all duration-300 flex flex-col items-center"
  >
    <span className="text-xl font-bold text-gray-700 group-hover:text-[#bd0026] uppercase tracking-wide">
      {categoria.titulo}
    </span>
    <span className="text-sm text-gray-400 mt-2">{cantidad} Registros</span>
  </button>
);

const ItemLista = ({ usuario, alVer, alEditar }) => (
  <div className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors group">
    <div className="flex flex-col">
      <span className="text-lg font-bold text-gray-800 group-hover:text-[#bd0026] transition-colors">
        {usuario.nombre} {usuario.apellidos}
      </span>
      <span className="text-sm text-gray-500">{usuario.email}</span>
    </div>
    <div className="flex gap-2">
      <button
        onClick={alEditar}
        className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider"
      >
        Modificar
      </button>
      <button
        onClick={alVer}
        className="bg-white border border-[#bd0026] text-[#bd0026] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider"
      >
        Ver Ficha
      </button>
    </div>
  </div>
);


export default GestionUsuarios;
*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GestionUsuarios = () => {
  const navigate = useNavigate();
  const [contadores, setContadores] = useState({});

  // Carga inicial solo para los numeritos de las tarjetas
  useEffect(() => {
    fetch("http://192.168.0.14:8008/api/users")
      .then((res) => res.json())
      .then((data) => {
        setContadores({
          admins: data.admins?.length || 0,
          clientes: data.clientes?.length || 0,
          vips: data.vips?.length || 0,
          encargados: data.encargados?.length || 0,
          comerciales: data.comerciales?.length || 0,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // Configuración de botones con SUS RUTAS ESPECÍFICAS
  const categorias = [
    { id: "admins", titulo: "Administradores", ruta: "/listado-administradores" },
    { id: "clientes", titulo: "Clientes", ruta: "/listado-clientes" },
    { id: "vips", titulo: "Clientes VIP", ruta: "/listado-clientes-vip" },
    { id: "encargados", titulo: "Encargados", ruta: "/listado-encargados" },
    { id: "comerciales", titulo: "Comerciales", ruta: "/listado-comerciales" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-widest">
          Gestión de Usuarios
        </h1>
        <div className="h-1 w-24 bg-[#bd0026] mx-auto mt-4"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(cat.ruta)} // <--- Navega a la página específica
            className="bg-white group p-8 rounded-xl border border-gray-300 shadow-sm hover:border-[#bd0026] hover:shadow-xl transition-all duration-300 flex flex-col items-center cursor-pointer"
          >
            <span className="text-xl font-bold text-gray-700 group-hover:text-[#bd0026] uppercase tracking-wide">
              {cat.titulo}
            </span>
            <span className="text-sm text-gray-400 mt-2">
              {contadores[cat.id] || 0} Registros
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GestionUsuarios;