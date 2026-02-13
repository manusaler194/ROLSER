import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import axios from "axios";

const Perfil = () => {
    // IMPORTANTE: Asegúrate de que useAuth() está devolviendo el objeto 'user' completo
    const { role, user, token } = useAuth(); 
    
    const [isEditing, setIsEditing] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    const [perfil, setPerfil] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '' 
    });

    // 1. FUNCIÓN PARA OBTENER EL ENDPOINT
    const obtenerEndpoint = () => {
        const rolNormalizado = role ? role.toLowerCase().trim() : '';
        switch(rolNormalizado) {
            case 'admin': return 'administradores';
            case 'cliente': return 'clientes';
            case 'clientevip': return 'clientesVip'; 
            case 'comercial': return 'comerciales';
            case 'encargado_almacen': return 'encargadoAlmacen';
            
        }
    };

    // 2. NUEVA FUNCIÓN PARA EXTRAER EL ID CORRECTO
    const obtenerIdUsuario = () => {
        if (!user) return null;
        
        // Busca dinámicamente qué propiedad de ID tiene el usuario
        return user.id_administrador || 
               user.id_cliente || 
               user.id_clientevip || 
               user.id_comercial || 
               user.id_encargado || 
               user.id; // Fallback por si acaso
    };

    useEffect(() => {
        const cargarPerfil = async () => {
            const userId = obtenerIdUsuario();
            
            // Si aún no tenemos el ID, no hacemos la petición (esperamos a que el AuthContext cargue)
            if (!userId) {
                // Si pasa mucho tiempo y no hay userId, podríamos quitar el cargando para mostrar un error, 
                // pero normalmente el Context carga en milisegundos.
                return; 
            } 

            const endpoint = obtenerEndpoint();
            try {
                const response = await axios.get(`http://localhost/api/${endpoint}/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const data = response.data;
                const usuario = Array.isArray(data) ? data[0] : data;

                setPerfil({
                    nombre: usuario.nombre || '',
                    apellidos: usuario.apellidos || '',
                    email: usuario.email || '',
                    telefono: usuario.telefono || usuario.contacto ||'',
                    password: '' 
                });
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                alert("No se pudieron cargar los datos de tu perfil.");
            } finally {
                setCargando(false);
            }
        };

        // Solo intentamos cargar si ya tenemos el 'user' disponible en el contexto
        if (user) {
            cargarPerfil();
        }
    }, [user, role, token]); // Dependencias del useEffect

    const handleChange = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        
        const endpoint = obtenerEndpoint();
        const userId = obtenerIdUsuario(); // Volvemos a sacar el ID para guardar

        try {
            const datosAEnviar = { ...perfil };
            if (!datosAEnviar.password) {
                delete datosAEnviar.password;
            }

            await axios.put(`http://localhost/api/${endpoint}/actualizar/${userId}`, datosAEnviar, {
                headers: { Authorization: `Bearer ${token}` }
            }); 
            
            alert("Perfil actualizado con éxito");
            setIsEditing(false); 
        } catch (error) {
            console.error("Error al actualizar:", error);
            if (error.response?.status === 422) {
                const mensajesError = Object.values(error.response.data.errors).flat().join("\n");
                alert("Corrige estos errores:\n" + mensajesError);
            } else {
                alert("Hubo un error al guardar los cambios.");
            }
        } finally {
            setGuardando(false);
        }
    }

    // Clases CSS
    const claseInput = "w-full bg-white border border-gray-400 p-3 text-gray-800 focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] rounded-sm transition-all";
    const claseLabel = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";
    const claseInputVista = "w-full border border-gray-600 rounded-full py-2 px-4 focus:outline-none bg-white font-medium text-gray-700";
    console.log("Perfil actual:", perfil); // Para depuración
    if (cargando) {
        return (
            <div className="flex min-h-screen bg-gray-50 justify-center items-center">
                <p className="text-gray-600 font-bold text-lg animate-pulse">Cargando tu perfil...</p>
            </div>
        );
    }

    return (
        <div className="min-h-full w-full bg-gray-50 flex flex-col items-center py-10 px-4 font-sans">
            <div className="w-full max-w-lg bg-white p-6 sm:p-10 shadow-2xl rounded-[30px] border border-gray-300">
                <h2 className="text-2xl font-bold mb-6 text-center text-black uppercase tracking-wider border-b pb-4">
                    Mi Perfil
                </h2>

                {!isEditing ? (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <label className="text-lg font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2">Nombre</label>
                            <input type="text" readOnly value={`${perfil.nombre} ${perfil.apellidos}`} className={claseInputVista} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <label className="text-lg font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2">Email</label>
                            <input type="email" readOnly value={perfil.email} className={claseInputVista} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <label className="text-lg font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2">Teléfono</label>
                            <input type="text" readOnly value={perfil.telefono} className={claseInputVista} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <label className="text-lg font-normal text-black w-full sm:w-1/3 mb-1 sm:mb-0 pl-2">Rol</label>
                            <input type="text" readOnly value={role ? role.toUpperCase() : ''} className={`${claseInputVista} text-center font-bold`} />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="bg-[#bd0026] text-white font-medium py-3 sm:py-2 px-10 rounded-full hover:bg-red-800 transition-colors shadow-md w-full sm:w-auto"
                            >
                                Modificar mis datos
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" autoComplete="off">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={claseLabel}>Nombre</label>
                                <input type="text" name="nombre" value={perfil.nombre} onChange={handleChange} className={claseInput} required />
                            </div>
                            <div>
                                <label className={claseLabel}>Apellidos</label>
                                <input type="text" name="apellidos" value={perfil.apellidos} onChange={handleChange} className={claseInput} required />
                            </div>
                        </div>

                        <div>
                            <label className={claseLabel}>Correo Electrónico</label>
                            <input type="email" name="email" value={perfil.email} onChange={handleChange} className={claseInput} required />
                        </div>

                        <div>
                            <label className={claseLabel}>Teléfono</label>
                            <input type="text" name="telefono" value={perfil.telefono} onChange={handleChange} className={claseInput} required />
                        </div>

                        <div>
                            <label className={claseLabel}>Nueva Contraseña</label>
                            <input type="password" name="password" value={perfil.password} onChange={handleChange} className={claseInput} placeholder="Dejar en blanco para no cambiar" autoComplete="new-password"/>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-center pt-6 gap-3 sm:gap-4">
                            <button 
                                type="button" 
                                onClick={() => {
                                    setIsEditing(false);
                                    setPerfil({...perfil, password: ''}); 
                                }} 
                                className="w-full sm:w-1/2 border border-gray-400 text-gray-600 font-bold py-3 px-4 rounded shadow hover:bg-gray-50 transition uppercase tracking-wider"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                disabled={guardando}
                                className={`w-full sm:w-1/2 text-white font-bold py-3 px-4 rounded shadow-lg transition uppercase tracking-wider ${guardando ? "bg-gray-500 cursor-not-allowed" : "bg-[#bd0026] hover:bg-red-800"}`}
                            > 
                                {guardando ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
    
};

export default Perfil;