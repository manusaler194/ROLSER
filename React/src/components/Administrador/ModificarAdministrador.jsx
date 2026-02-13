import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ModificarAdministrador = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    // Añadido el campo password al estado inicial
    const [admin, setAdmin] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '' // Inicializado vacío
    });
    
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const cargarAdmin = async () => {
            try {
                const response = await fetch(`http://localhost/api/administradores/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                const usuario = Array.isArray(data) ? data[0] : data;

                // Solo cargamos los datos existentes (la contraseña NUNCA se recibe del servidor por seguridad)
                setAdmin({
                    nombre: usuario.nombre || '',
                    apellidos: usuario.apellidos || '',
                    email: usuario.email || '',
                    telefono: usuario.telefono || '',
                    password: '' // Se deja vacío para que el usuario escriba una nueva si quiere
                });

            } catch (error) {
                console.error("Error al cargar:", error);
                alert("No se pudieron cargar los datos del usuario.");
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            cargarAdmin();
        }
    }, [id]);

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            // Creamos una copia de los datos a enviar
            const datosAEnviar = { ...admin };

            // Si el campo password está vacío, lo eliminamos del objeto para no enviar un string vacío al backend
            if (!datosAEnviar.password) {
                delete datosAEnviar.password;
            }

            // Ojo: Corregida la URL (tenías un doble http://http://)
            await axios.put(`http://localhost/api/administradores/actualizar/${id}`, datosAEnviar); 
            
            alert("Administrador modificado con éxito");
            navigate('/usuarios');
        } catch (error) {
            console.error("Error al actualizar:", error);
            // Manejo de errores de validación de Laravel (422)
            if (error.response && error.response.status === 422) {
                const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
                alert("Corrige estos errores:\n" + mensajesError);
            } else {
                alert("Hubo un error al guardar los cambios.");
            }
        } finally {
            setGuardando(false);
        }
    }

    // Clases CSS unificadas con el resto del proyecto
    const claseInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
    const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

    if (cargando) {
        return (
            <div className="flex min-h-screen bg-gray-50 justify-center items-center">
                <p className="text-gray-600 font-bold text-lg animate-pulse">Cargando datos del administrador...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-lg bg-white p-6 sm:p-10 shadow-2xl rounded-sm border-t-4 border-[#bd0026]">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
                    Modificar Administrador
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" autoComplete="off">
                    
                    {/* Fila 1: Nombre y Apellidos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={claseLabel}>Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={admin.nombre} 
                                onChange={handleChange} 
                                className={claseInput} 
                                required 
                            />
                        </div>
                        <div>
                            <label className={claseLabel}>Apellidos</label>
                            <input 
                                type="text" 
                                name="apellidos" 
                                value={admin.apellidos} 
                                onChange={handleChange} 
                                className={claseInput} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Fila 2: Email */}
                    <div>
                        <label className={claseLabel}>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={admin.email} 
                            onChange={handleChange} 
                            className={claseInput} 
                            required 
                        />
                    </div>

                    {/* Fila 3: Teléfono */}
                    <div>
                        <label className={claseLabel}>Teléfono</label>
                        <input 
                            type="text" 
                            name="telefono" 
                            value={admin.telefono} 
                            onChange={handleChange} 
                            className={claseInput} 
                            required 
                        />
                    </div>

                    {/* Fila 4: Nueva Contraseña (Opcional) */}
                    <div>
                        <label className={claseLabel}>Nueva Contraseña (Opcional)</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={admin.password} 
                            onChange={handleChange} 
                            className={claseInput} 
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
                            onClick={() => navigate('/usuarios')} 
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

export default ModificarAdministrador;