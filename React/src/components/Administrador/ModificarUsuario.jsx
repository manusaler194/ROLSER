import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../../utils/api'; 
import Swal from 'sweetalert2'; // <-- Importamos SweetAlert2

const CONFIGURACION_USUARIOS = {
    admin: {
        titulo: 'Modificar Administrador',
        urlGet: (id) => `${BASE_URL}/administradores/${id}`,
        urlPut: (id) => `${BASE_URL}/administradores/actualizar/${id}`,
        extraerDatos: (datos) => Array.isArray(datos) ? datos[0] : datos,
        campos: ['nombre', 'apellidos', 'email', 'telefono']
    },
    cliente: {
        titulo: 'Modificar Cliente',
        urlGet: (id) => `${BASE_URL}/clientes/${id}`,
        urlPut: (id) => `${BASE_URL}/clientes/actualizar/${id}`,
        extraerDatos: (datos) => Array.isArray(datos.cliente) ? datos.cliente[0] : datos.cliente,
        campos: ['nombre', 'email', 'telefono', 'direccion']
    },
    clienteVip: {
        titulo: 'Modificar Cliente VIP',
        urlGet: (id) => `${BASE_URL}/clientesVip/${id}`,
        urlPut: (id) => `${BASE_URL}/clientesVip/actualizar/${id}`,
        extraerDatos: (datos) => {
            const data = datos.clienteVip || datos;
            return Array.isArray(data) ? data[0] : data;
        },
        campos: ['nombre', 'email', 'telefono', 'direccion']
    },
    comercial: {
        titulo: 'Modificar Comercial',
        urlGet: (id) => `${BASE_URL}/comerciales/${id}`,
        urlPut: (id) => `${BASE_URL}/comerciales/actualizar/${id}`,
        extraerDatos: (datos) => {
            const data = datos.comerciales || datos.comercial || datos;
            return Array.isArray(data) ? data[0] : data;
        },
        campos: ['nombre', 'email', 'contacto'] 
    },
    encargado: {
        titulo: 'Modificar Encargado',
        urlGet: (id) => `${BASE_URL}/encargadoAlmacen/${id}`,
        urlPut: (id) => `${BASE_URL}/encargadoAlmacen/actualizar/${id}`,
        extraerDatos: (datos) => Array.isArray(datos) ? datos[0] : datos,
        campos: ['nombre', 'email', 'telefono']
    }
};

const ModificarUsuario = ({ tipo }) => {
    const navegar = useNavigate();
    const { id } = useParams();
    const config = CONFIGURACION_USUARIOS[tipo];

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        contacto: '',
        direccion: '',
        password: ''
    });

    const [estaCargando, setEstaCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (!config) return;

        const cargarDatos = async () => {
            try {
                const respuesta = await apiFetch(config.urlGet(id));
                if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

                const datosCrudos = await respuesta.json();
                const datosUsuario = config.extraerDatos(datosCrudos);

                if (datosUsuario) {
                    setUsuario({
                        nombre: datosUsuario.nombre || '',
                        apellidos: datosUsuario.apellidos || '',
                        email: datosUsuario.email || '',
                        telefono: datosUsuario.telefono || datosUsuario.contacto || '', 
                        contacto: datosUsuario.contacto || datosUsuario.telefono || '', 
                        direccion: datosUsuario.direccion || '',
                        password: '' 
                    });
                }
            } catch (error) {
                console.error("Error al cargar:", error);
                // Reemplazado alert por Swal
                Swal.fire({
                    icon: 'error',
                    title: 'Error de carga',
                    text: `No se pudieron cargar los datos del ${tipo}.`,
                    confirmButtonColor: '#bd0026'
                });
            } finally {
                setEstaCargando(false);
            }
        };

        if (id) cargarDatos();
    }, [id, tipo, config]);

    const manejarCambio = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            const datosAEnviar = {};
            config.campos.forEach(campo => {
                datosAEnviar[campo] = usuario[campo];
            });

            if (usuario.password) {
                datosAEnviar.password = usuario.password;
            }

            const respuesta = await apiFetch(config.urlPut(id), {
                method: 'PUT',
                body: JSON.stringify(datosAEnviar)
            });
            
            if (!respuesta.ok) {
                const errorData = await respuesta.json();
                throw { response: { status: respuesta.status, data: errorData } };
            }
            
            // Reemplazado alert de éxito por Swal
            await Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: `${config.titulo.replace('Modificar ', '')} modificado con éxito`,
                confirmButtonColor: '#000000',
                timer: 2000, // Se cierra solo en 2 segundos
                timerProgressBar: true
            });
            navegar('/usuarios');
        } catch (error) {
            console.error("Error al actualizar:", error);
            if (error.response && error.response.status === 422) {
                const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
                // Reemplazado alert de errores de validación por Swal
                Swal.fire({
                    icon: 'warning',
                    title: 'Faltan datos o son incorrectos',
                    text: "Corrige estos errores:\n" + mensajesError,
                    confirmButtonColor: '#bd0026'
                });
            } else {
                const mensajeError = error.response?.data?.message || "Hubo un error al guardar los cambios.";
                // Reemplazado alert de error general por Swal
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: mensajeError,
                    confirmButtonColor: '#bd0026'
                });
            }
        } finally {
            setGuardando(false);
        }
    };

    // Clases estandarizadas y agrandadas (igual que en CrearUsuario)
    const clasesInput = "w-full bg-white border border-gray-400 p-3 sm:p-4 text-base sm:text-lg text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
    const claseLabel = "block text-sm sm:text-base font-bold text-gray-500 uppercase mb-2 ml-1";

    if (!config) return <div className="p-10 text-center text-xl text-red-500">Error: Tipo de usuario desconocido.</div>;

    if (estaCargando) {
        return (
            <div className="flex min-h-screen bg-gray-50 justify-center items-center">
                <p className="text-gray-600 font-bold text-xl sm:text-2xl animate-pulse">Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            {/* Contenedor más ancho: de max-w-lg a max-w-2xl y más padding */}
            <div className="w-full max-w-2xl bg-white p-6 sm:p-12 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
                {/* Título más grande: de text-xl/2xl a text-3xl/4xl */}
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-black uppercase tracking-wider border-b pb-4 sm:pb-6">
                    {config.titulo}
                </h2>
                
                <form onSubmit={manejarEnvio} className="space-y-5 sm:space-y-6" autoComplete="off">
                    
                    {/* Grid con más espacio entre columnas (gap-4 a gap-5) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={claseLabel}>{tipo === 'clienteVip' ? 'Nombre / Razón Social' : 'Nombre'}</label>
                            <input type="text" name="nombre" value={usuario.nombre} onChange={manejarCambio} className={clasesInput} required />
                        </div>
                        
                        {config.campos.includes('apellidos') && (
                            <div>
                                <label className={claseLabel}>Apellidos</label>
                                <input type="text" name="apellidos" value={usuario.apellidos} onChange={manejarCambio} className={clasesInput} required />
                            </div>
                        )}

                        {!config.campos.includes('apellidos') && config.campos.includes('telefono') && (
                            <div>
                                <label className={claseLabel}>Teléfono</label>
                                <input type="text" name="telefono" value={usuario.telefono} onChange={manejarCambio} className={clasesInput} required />
                            </div>
                        )}
                        
                        {!config.campos.includes('apellidos') && config.campos.includes('contacto') && (
                            <div>
                                <label className={claseLabel}>Contacto / Teléfono</label>
                                <input type="text" name="contacto" value={usuario.contacto} onChange={manejarCambio} className={clasesInput} required />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={claseLabel}>Correo Electrónico</label>
                        <input type="email" name="email" value={usuario.email} onChange={manejarCambio} className={clasesInput} required />
                    </div>

                    {config.campos.includes('apellidos') && config.campos.includes('telefono') && (
                        <div>
                            <label className={claseLabel}>Teléfono</label>
                            <input type="text" name="telefono" value={usuario.telefono} onChange={manejarCambio} className={clasesInput} required />
                        </div>
                    )}

                    {config.campos.includes('direccion') && (
                        <div>
                            <label className={claseLabel}>Dirección</label>
                            <input type="text" name="direccion" value={usuario.direccion} onChange={manejarCambio} className={clasesInput} required />
                        </div>
                    )}

                    <div>
                        <label className={claseLabel}>Nueva Contraseña (Opcional)</label>
                        <input 
                            type="password" name="password" value={usuario.password} onChange={manejarCambio} 
                            className={clasesInput} placeholder="Escribe para cambiar la contraseña" autoComplete="new-password"
                        />
                        {/* Texto de ayuda un poco más grande: text-[10px] a text-xs sm:text-sm */}
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 ml-1">
                            * Deja este campo en blanco si deseas mantener la contraseña actual.
                        </p>
                    </div>

                    {/* Botones - Texto y padding más grandes (text-lg/xl y py-3/4) */}
                    <div className="flex flex-col-reverse sm:flex-row justify-center pt-8 sm:pt-10 gap-4 sm:gap-6">
                        <button type="button" onClick={() => navegar('/usuarios')} className="w-full sm:w-1/2 border border-gray-400 text-gray-600 text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 rounded shadow hover:bg-gray-50 transition duration-300 uppercase tracking-wider">
                            Cancelar
                        </button>
                        <button type="submit" disabled={guardando} className={`w-full sm:w-1/2 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 rounded shadow-lg transition duration-300 uppercase tracking-wider ${guardando ? "bg-gray-500 cursor-not-allowed" : "bg-[#bd0026] hover:bg-red-800"}`}> 
                            {guardando ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarUsuario;