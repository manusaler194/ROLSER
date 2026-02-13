import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ModificarComercial = () => {
    const navegar = useNavigate();
    const { id } = useParams(); 

    // Estado inicial: añadimos password vacío por defecto
    const [comercial, setComercial] = useState({
        nombre: '',
        email: '',
        contacto: '',
        password: '' // <--- Opcional para modificación
    });
    
    const [estaCargando, setEstaCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const cargarComercial = async () => {
            try {
                // CORRECCIÓN: Usamos la IP en lugar de localhost
                const respuesta = await fetch(`http://localhost/api/comerciales/${id}`);
                
                if (!respuesta.ok) throw new Error("Error al conectar con la API");

                const datos = await respuesta.json();
                
                // Extraemos el usuario (depende de cómo responda tu API, nos aseguramos)
                const arrayComerciales = datos.comerciales || datos.comercial || datos;
                const usuario = Array.isArray(arrayComerciales) ? arrayComerciales[0] : arrayComerciales;

                if(usuario) {
                    setComercial({
                        nombre: usuario.nombre || '',
                        email: usuario.email || '',
                        contacto: usuario.contacto || usuario.telefono || '',
                        password: '' // NUNCA se carga del servidor, se deja vacío para que escriba una nueva
                    });
                }

            } catch (error) {
                console.error("Error al cargar:", error);
                alert("No se pudieron cargar los datos del Comercial.");
            } finally {
                setEstaCargando(false);
            }
        };

        if (id) {
            cargarComercial();
        }
    }, [id]);

    const manejarCambio = (e) => {
        setComercial({
            ...comercial,
            [e.target.name]: e.target.value
        });
    };

    // 2. Guardar cambios (PUT)
    const manejarEnvio = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            // Creamos una copia para enviar
            const datosAEnviar = { ...comercial };
            
            // Si la contraseña está vacía, la borramos para no sobreescribirla
            if (!datosAEnviar.password) {
                delete datosAEnviar.password;
            }

            // CORRECCIÓN: Usamos axios.put con la IP en lugar del localhost que tenías en tu código original
            await axios.put(`http://localhost/api/comerciales/actualizar/${id}`, datosAEnviar); 
            
            alert("Comercial modificado con éxito");
            navegar('/usuarios'); // O al listado que corresponda
        } catch (error) {
            console.error("Error al actualizar:", error);
            // Manejo de validaciones de Laravel (422)
            if (error.response && error.response.status === 422) {
                const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
                alert("Corrige estos errores:\n" + mensajesError);
            } else {
                const mensajeError = error.response?.data?.message || "Hubo un error al guardar los cambios.";
                alert(mensajeError);
            }
        } finally {
            setGuardando(false);
        }
    }

    // Clases CSS unificadas
    const clasesInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
    const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

    if (estaCargando) {
        return (
            <div className="flex min-h-screen bg-gray-50 justify-center items-center">
                <p className="text-gray-600 font-bold text-lg animate-pulse">Cargando datos del Comercial...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-lg bg-white p-6 sm:p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
                    Modificar Comercial
                </h2>
                
                <form onSubmit={manejarEnvio} className="space-y-4 sm:space-y-5" autoComplete="off">
                    
                    {/* Fila 1: Nombre y Teléfono (Contacto) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={claseLabel}>Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={comercial.nombre} 
                                onChange={manejarCambio} 
                                className={clasesInput} 
                                required 
                            />
                        </div>
                        <div>
                            <label className={claseLabel}>Contacto / Teléfono</label>
                            <input 
                                type="text" 
                                name="contacto" 
                                value={comercial.contacto} 
                                onChange={manejarCambio} 
                                className={clasesInput} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Fila 2: Correo */}
                    <div>
                        <label className={claseLabel}>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={comercial.email} 
                            onChange={manejarCambio} 
                            className={clasesInput} 
                            required 
                        />
                    </div>

                    {/* Fila 3: Nueva Contraseña (Opcional) */}
                    <div>
                        <label className={claseLabel}>Nueva Contraseña (Opcional)</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={comercial.password} 
                            onChange={manejarCambio} 
                            className={clasesInput} 
                            placeholder="Escribe para cambiar la contraseña"
                            autoComplete="new-password"
                        />
                        <p className="text-[10px] text-gray-500 mt-1 ml-1">
                            * Deja este campo en blanco si deseas mantener la contraseña actual.
                        </p>
                    </div>

                    {/* Botones de acción integrados y responsive */}
                    <div className="flex flex-col-reverse sm:flex-row justify-center pt-6 sm:pt-8 gap-3 sm:gap-4">
                        <button 
                            type="button" 
                            onClick={() => navegar('/usuarios')} 
                            className="w-full sm:w-1/2 border border-gray-400 text-gray-600 font-bold py-3 px-4 rounded shadow hover:bg-gray-50 transition duration-300 uppercase tracking-wider"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={guardando}
                            className={`w-full sm:w-1/2 text-white font-bold py-3 px-4 rounded shadow-lg transition duration-300 uppercase tracking-wider ${
                                guardando 
                                    ? "bg-gray-500 cursor-not-allowed" 
                                    : "bg-[#bd0026] hover:bg-red-800"
                            }`}
                        > 
                            {guardando ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModificarComercial;