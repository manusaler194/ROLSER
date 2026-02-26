import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ModificarPerfil = () => {
    const { role, user, token } = useAuth(); 
    const navigate = useNavigate();
    
    const [guardando, setGuardando] = useState(false);
    
    // Inicializamos el estado vacío para evitar errores antes de que cargue el 'user'
    const [perfil, setPerfil] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '' 
    });

    // Usamos un useEffect para rellenar los datos en cuanto el Context nos devuelva al 'user'
    useEffect(() => {
        if (user) {
            setPerfil({
                nombre: user.nombre || '',
                apellidos: user.apellidos || '',
                email: user.email || '',
                telefono: user.telefono || user.contacto || '',
                password: '' 
            });
        }
    }, [user]);

    // Pantalla de carga de seguridad si recargan la página directamente aquí
    if (!user || !role) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-bold text-xl sm:text-2xl animate-pulse">Cargando formulario...</p>
            </div>
        );
    }

    const handleChange = (e) => {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        
        // 1. Determinar endpoint y el ID correcto según el rol
        const rolNormalizado = role.toLowerCase().trim();
        let endpoint = '';
        let userId = user.id;

        if (rolNormalizado === 'admin' || rolNormalizado === 'administrador') { 
            endpoint = 'administradores'; 
            userId = user.id_administrador; 
        } else if (rolNormalizado === 'cliente') { 
            endpoint = 'clientes'; 
            userId = user.id_cliente; 
        } else if (rolNormalizado === 'clientevip') { 
            endpoint = 'clientesVip'; 
            userId = user.id_clientevip; 
        } else if (rolNormalizado === 'comercial') { 
            endpoint = 'comerciales'; 
            userId = user.id_comercial; 
        } else if (rolNormalizado === 'encargado' || rolNormalizado === 'encargadoalmacen' || rolNormalizado === 'encargado_almacen') { 
            endpoint = 'encargadoAlmacen'; 
            userId = user.id_encargado; 
        }

        try {
            // 2. Preparamos los datos (borramos el password si no escribió nada para que no lo machaque)
            const datosAEnviar = { ...perfil };
            if (!datosAEnviar.password) {
                delete datosAEnviar.password;
            }

            // 3. Petición a la API de Laravel
            await axios.put(`http://100.25.154.102/api/${endpoint}/actualizar/${userId}`, datosAEnviar, {
                headers: { Authorization: `Bearer ${token}` }
            }); 
            
            alert("¡Perfil actualizado con éxito!");
            
            // Volvemos a la página principal de perfil (ajusta esta ruta si se llama distinto)
            navigate('/perfil'); 

        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al guardar los cambios. Revisa la consola.");
        } finally {
            setGuardando(false);
        }
    }

    // Clases CSS reutilizables escaladas
    // Aumentamos el padding (py-3 sm:py-4, px-5 sm:px-6) y el tamaño del texto (text-base sm:text-lg)
    const claseInput = "w-full bg-white border border-gray-300 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-base sm:text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#bd0026] focus:border-transparent transition-all shadow-sm";
    
    // Aumentamos el texto de las etiquetas (text-base sm:text-lg) y el margen inferior (mb-2 sm:mb-3)
    const claseLabel = "block text-base sm:text-lg font-bold text-gray-600 uppercase mb-2 sm:mb-3 pl-2 sm:pl-4 tracking-wide";

    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 font-sans">
            {/* Contenedor más ancho: max-w-lg -> max-w-2xl para acomodar mejor los textos grandes */}
            <div className="w-full max-w-2xl bg-white p-6 sm:p-12 shadow-xl rounded-[30px] border border-gray-200">
                
                {/* Título más grande: text-2xl -> text-3xl sm:text-4xl */}
                <h2 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-10 text-center text-gray-900 tracking-tight">
                    Modificar Mis Datos
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" autoComplete="off">
                    
                    {/* Aumentamos un poco el espacio entre columnas: gap-4 -> gap-5 sm:gap-6 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                            <label className={claseLabel}>Nombre</label>
                            <input type="text" name="nombre" value={perfil.nombre} onChange={handleChange} className={claseInput} required />
                        </div>
                        <div>
                            <label className={claseLabel}>Apellidos</label>
                            <input type="text" name="apellidos" value={perfil.apellidos} onChange={handleChange} className={claseInput} />
                        </div>
                    </div>

                    <div>
                        <label className={claseLabel}>Correo Electrónico</label>
                        <input type="email" name="email" value={perfil.email} onChange={handleChange} className={claseInput} required />
                    </div>

                    <div>
                        <label className={claseLabel}>Teléfono / Contacto</label>
                        <input type="text" name="telefono" value={perfil.telefono} onChange={handleChange} className={claseInput} required />
                    </div>

                    <hr className="border-gray-100 my-8 sm:my-10" />

                    <div>
                        <label className={claseLabel}>Nueva Contraseña <span className="text-gray-400 font-normal lowercase text-sm sm:text-base">(opcional)</span></label>
                        <input type="password" name="password" value={perfil.password} onChange={handleChange} className={claseInput} placeholder="Déjalo en blanco para no cambiarla" autoComplete="new-password"/>
                    </div>

                    {/* Botones - Texto y padding más grandes (text-lg/xl y py-3/4) */}
                    <div className="flex flex-col-reverse sm:flex-row justify-center pt-8 sm:pt-10 gap-4 sm:gap-6">
                        <button 
                            type="button" 
                            onClick={() => navigate('/perfil')} 
                            className="w-full sm:w-1/2 border border-gray-300 text-gray-600 text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 rounded-full shadow-sm hover:bg-gray-100 transition-colors active:scale-95 transform"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={guardando}
                            className={`w-full sm:w-1/2 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 rounded-full shadow-md transition-colors active:scale-95 transform ${guardando ? "bg-gray-400 cursor-not-allowed" : "bg-[#bd0026] hover:bg-red-800"}`}
                        > 
                            {guardando ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ModificarPerfil;