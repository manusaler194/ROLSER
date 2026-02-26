import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../../utils/api'; 

// Configuraciones específicas para cada tipo de usuario a crear
const CONFIGURACION_CREAR = {
    admin: {
        titulo: 'Nuevo Administrador',
        urlPost: `${BASE_URL}/administradores/guardar`,
        campos: ['nombre', 'apellidos', 'email', 'telefono', 'password'],
        necesitaListas: [] // Qué selects necesita cargar
    },
    cliente: {
        titulo: 'Nuevo Cliente',
        urlPost: `${BASE_URL}/clientes/guardar`,
        campos: ['nombre', 'email', 'telefono', 'direccion', 'password', 'id_administrador', 'id_comercial'],
        necesitaListas: ['administradores', 'comerciales']
    },
    clienteVip: {
        titulo: 'Nuevo Cliente VIP',
        urlPost: `${BASE_URL}/clientesVip/guardar`,
        campos: ['nombre', 'email', 'telefono', 'direccion', 'password', 'id_administrador', 'id_comercial', 'id_catalogo'],
        necesitaListas: ['administradores', 'comerciales', 'catalogos']
    },
    comercial: {
        titulo: 'Nuevo Comercial',
        urlPost: `${BASE_URL}/comerciales/guardar`,
        campos: ['nombre', 'email', 'contacto', 'password', 'id_administrador'],
        necesitaListas: ['administradores']
    },
    encargado: {
        titulo: 'Registrar Encargado',
        urlPost: `${BASE_URL}/encargadoAlmacen/guardar`,
        campos: ['nombre', 'email', 'telefono', 'password'],
        necesitaListas: []
    }
};

const CrearUsuario = ({ tipo }) => {
    const navegar = useNavigate();
    const config = CONFIGURACION_CREAR[tipo];

    // Estado centralizado para todos los campos posibles
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        contacto: '',
        direccion: '',
        password: '',
        id_administrador: '',
        id_comercial: '',
        id_catalogo: ''
    });

    // Estados para los desplegables (selects)
    const [administradores, setAdministradores] = useState([]);
    const [comerciales, setComerciales] = useState([]);
    const [catalogos, setCatalogos] = useState([]);

    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    // Cargar las listas necesarias para los combos desplegables
    useEffect(() => {
        if (!config) return;

        const cargarListas = async () => {
            try {
                if (config.necesitaListas.includes('administradores')) {
                    const res = await apiFetch(`${BASE_URL}/administradores`);
                    if(res.ok){
                        const data = await res.json();
                        setAdministradores(Array.isArray(data.admin || data) ? (data.admin || data) : []);
                    }
                }
                if (config.necesitaListas.includes('comerciales')) {
                    const res = await apiFetch(`${BASE_URL}/comerciales`);
                    if(res.ok){
                        const data = await res.json();
                        setComerciales(Array.isArray(data.comerciales || data) ? (data.comerciales || data) : []);
                    }
                }
                if (config.necesitaListas.includes('catalogos')) {
                    const res = await apiFetch(`${BASE_URL}/catalogo`);
                    if(res.ok){
                        const data = await res.json();
                        setCatalogos(Array.isArray(data.catalogo || data) ? (data.catalogo || data) : []);
                    }
                }
            } catch (err) {
                console.error("Error cargando listas:", err);
                setError("No se pudieron cargar algunas opciones del formulario.");
            }
        };

        cargarListas();
    }, [tipo, config]);

    const manejarCambio = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError(null);

        try {
            // Filtramos solo los campos que este 'tipo' necesita enviar
            const datosAEnviar = {};
            config.campos.forEach(campo => {
                // Convertir IDs a números enteros si no están vacíos
                if (campo.startsWith('id_')) {
                    datosAEnviar[campo] = usuario[campo] ? parseInt(usuario[campo]) : null;
                } else {
                    datosAEnviar[campo] = usuario[campo];
                }
            });

            const respuesta = await apiFetch(config.urlPost, {
                method: 'POST',
                body: JSON.stringify(datosAEnviar)
            });

            if (!respuesta.ok) {
                const errorData = await respuesta.json();
                throw { response: { status: respuesta.status, data: errorData } };
            }

            alert(`${config.titulo.replace('Nuevo ', '').replace('Registrar ', '')} creado con éxito.`);
            navegar('/usuarios');
        } catch (err) {
            console.error("Error completo:", err);
            if (err.response && err.response.status === 422) {
                const mensajesError = Object.values(err.response.data.errors || err.response.data).flat().join("\n");
                setError("Corrige estos errores:\n" + mensajesError);
            } else {
                const mensaje = err.response?.data?.message || err.message || "Error al crear el usuario";
                setError(mensaje);
            }
        } finally {
            setCargando(false);
        }
    };

    // Clases estandarizadas redimensionadas
    // Se aumentó el padding (p-3 a p-4) y el tamaño del texto (text-base sm:text-lg)
    const claseInput = "w-full bg-white border border-gray-400 p-3 sm:p-4 text-base sm:text-lg text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
    // Se aumentó el tamaño de las etiquetas (text-xs a text-sm sm:text-base) y el margen inferior
    const claseLabel = "block text-sm sm:text-base font-bold text-gray-500 uppercase mb-2 ml-1";

    if (!config) return <div className="p-10 text-center text-xl text-red-500">Error: Tipo de usuario desconocido.</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            {/* Contenedor más ancho: max-w-xl -> max-w-2xl para acomodar textos más grandes */}
            <div className="w-full max-w-2xl bg-white p-6 sm:p-12 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
                {/* Título más grande: text-xl/2xl -> text-3xl/4xl */}
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-black uppercase tracking-wider border-b pb-4 sm:pb-6">
                    {config.titulo}
                </h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold text-base sm:text-lg whitespace-pre-line">
                        {error}
                    </div>
                )}

                <form onSubmit={manejarEnvio} className="space-y-5 sm:space-y-6" autoComplete="off">
                    
                    {/* Fila 1: Nombre y Apellidos/Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={claseLabel}>{tipo === 'clienteVip' ? 'Nombre Completo' : 'Nombre'}</label>
                            <input type="text" name="nombre" value={usuario.nombre} onChange={manejarCambio} required className={claseInput} placeholder="Ej. Juan" />
                        </div>
                        
                        {config.campos.includes('apellidos') && (
                            <div>
                                <label className={claseLabel}>Apellidos</label>
                                <input type="text" name="apellidos" value={usuario.apellidos} onChange={manejarCambio} required className={claseInput} placeholder="Ej. Pérez" />
                            </div>
                        )}

                        {!config.campos.includes('apellidos') && config.campos.includes('telefono') && (
                            <div>
                                <label className={claseLabel}>Teléfono</label>
                                <input type="text" name="telefono" value={usuario.telefono} onChange={manejarCambio} required className={claseInput} placeholder="Ej. 600 123 456" />
                            </div>
                        )}

                        {!config.campos.includes('apellidos') && config.campos.includes('contacto') && (
                            <div>
                                <label className={claseLabel}>Teléfono / Contacto</label>
                                <input type="text" name="contacto" value={usuario.contacto} onChange={manejarCambio} required className={claseInput} placeholder="Ej. 600 123 456" />
                            </div>
                        )}
                    </div>

                    {/* Fila 2: Email */}
                    <div>
                        <label className={claseLabel}>Correo Electrónico</label>
                        <input type="email" name="email" value={usuario.email} onChange={manejarCambio} required className={claseInput} placeholder="correo@ejemplo.com" />
                    </div>

                    {/* Si tiene apellidos (Admin), ponemos el teléfono aquí abajo */}
                    {config.campos.includes('apellidos') && config.campos.includes('telefono') && (
                        <div>
                            <label className={claseLabel}>Teléfono</label>
                            <input type="text" name="telefono" value={usuario.telefono} onChange={manejarCambio} required className={claseInput} placeholder="Ej. 600 123 456" />
                        </div>
                    )}

                    {/* Dirección (Clientes y VIP) */}
                    {config.campos.includes('direccion') && (
                        <div>
                            <label className={claseLabel}>Dirección</label>
                            <input type="text" name="direccion" value={usuario.direccion} onChange={manejarCambio} required className={claseInput} placeholder="Calle Principal, 123" />
                        </div>
                    )}

                    {/* Contraseña */}
                    <div>
                        <label className={claseLabel}>Contraseña</label>
                        <input type="password" name="password" value={usuario.password} onChange={manejarCambio} required className={claseInput} placeholder="••••••••" autoComplete="new-password" />
                    </div>

                    {/* Selects: Administrador y Comercial */}
                    {(config.campos.includes('id_administrador') || config.campos.includes('id_comercial')) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {config.campos.includes('id_administrador') && (
                                <div>
                                    <label className={claseLabel}>Administrador</label>
                                    <select name="id_administrador" value={usuario.id_administrador} onChange={manejarCambio} required={tipo === 'cliente'} className={claseInput}>
                                        <option value="">-- Selecciona uno --</option>
                                        {administradores.map((admin) => (
                                            <option key={admin.id_administrador || admin.id} value={admin.id_administrador || admin.id}>
                                                {admin.nombre} {admin.apellidos}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {config.campos.includes('id_comercial') && (
                                <div>
                                    <label className={claseLabel}>Comercial</label>
                                    <select name="id_comercial" value={usuario.id_comercial} onChange={manejarCambio} required={tipo === 'cliente'} className={claseInput}>
                                        <option value="">-- Selecciona uno --</option>
                                        {comerciales.map((com) => (
                                            <option key={com.id_comercial || com.id} value={com.id_comercial || com.id}>
                                                {com.nombre} {com.apellidos || ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Selects: Catálogo (VIP) */}
                    {config.campos.includes('id_catalogo') && (
                        <div>
                            <label className={claseLabel}>Catálogo VIP Asignado</label>
                            <select name="id_catalogo" value={usuario.id_catalogo} onChange={manejarCambio} className={`${claseInput} bg-yellow-50 border-yellow-300 focus:border-yellow-500`}>
                                <option value="">-- Ninguno --</option>
                                {catalogos.map((cat) => (
                                    <option key={cat.id_catalogo || cat.id} value={cat.id_catalogo || cat.id}>
                                        {cat.nombre_catalogo || `Catálogo #${cat.id_catalogo || cat.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Botones - Texto y padding más grandes */}
                    <div className="flex flex-col-reverse sm:flex-row justify-center pt-8 sm:pt-10 gap-4 sm:gap-6">
                        <button type="button" onClick={() => navegar(-1)} className="w-full sm:w-1/2 border border-gray-400 text-gray-600 text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 rounded shadow hover:bg-gray-50 transition duration-300 uppercase">
                            Cancelar
                        </button>
                        <button type="submit" disabled={cargando} className={`w-full sm:w-1/2 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 rounded shadow-lg transition duration-300 uppercase ${cargando ? "bg-gray-500 cursor-not-allowed" : "bg-[#bd0026] hover:bg-red-800"}`}>
                            {cargando ? "Guardando..." : "Crear"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CrearUsuario;