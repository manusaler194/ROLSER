import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { apiFetch } from "../../utils/api"; 

const ModificarPerfil = () => {
    const { role, user } = useAuth(); 
    const navigate = useNavigate();
    
    const [guardando, setGuardando] = useState(false);
    
    // Añadimos 'direccion' al estado inicial
    const [perfil, setPerfil] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        direccion: '', 
        password: '' 
    });

    useEffect(() => {
        if (user) {
            setPerfil({
                nombre: user.nombre || '',
                apellidos: user.apellidos || '',
                email: user.email || '',
                telefono: user.telefono || user.contacto || '', // Comerciales usan 'contacto'
                direccion: user.direccion || '',
                password: '' 
            });
        }
    }, [user]);

    if (!user || !role) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-bold text-xl sm:text-2xl animate-pulse">Cargando formulario...</p>
            </div>
        );
    }

    // Identificamos el rol para mostrar unos campos u otros
    const rolNormalizado = role.toLowerCase().trim();
    const esAdmin = rolNormalizado === 'admin' || rolNormalizado === 'administrador';
    const esCliente = rolNormalizado === 'cliente' || rolNormalizado === 'clientevip';
    const esComercial = rolNormalizado === 'comercial';
    const esEncargado = rolNormalizado === 'encargado' || rolNormalizado === 'encargadoalmacen' || rolNormalizado === 'encargado_almacen';

    const handleChange = (e) => {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        
        let endpoint = '';
        let userId = user.id;

        if (esAdmin) { 
            endpoint = 'administradores'; 
            userId = user.id_administrador || user.id; 
        } else if (rolNormalizado === 'cliente') { 
            endpoint = 'clientes'; 
            userId = user.id_cliente || user.id; 
        } else if (rolNormalizado === 'clientevip') { 
            endpoint = 'clientesVip'; 
            userId = user.id_clientevip || user.id; 
        } else if (esComercial) { 
            endpoint = 'comerciales'; 
            userId = user.id_comercial || user.id; 
        } else if (esEncargado) { 
            endpoint = 'encargadoAlmacen'; 
            userId = user.id_encargado || user.id; 
        }

        try {
            // Construimos dinámicamente el objeto a enviar según los campos que acepta el rol
            const datosAEnviar = {
                nombre: perfil.nombre,
                email: perfil.email,
            };

            if (esAdmin) {
                datosAEnviar.apellidos = perfil.apellidos;
                datosAEnviar.telefono = perfil.telefono;
            } else if (esCliente) {
                datosAEnviar.telefono = perfil.telefono;
                datosAEnviar.direccion = perfil.direccion;
            } else if (esComercial) {
                datosAEnviar.contacto = perfil.telefono; // ¡Importante! Laravel espera 'contacto'
            } else if (esEncargado) {
                datosAEnviar.telefono = perfil.telefono;
            }

            // Solo enviamos el password si han escrito algo
            if (perfil.password && perfil.password.trim() !== "") {
                datosAEnviar.password = perfil.password;
            }

            const url = `http://100.25.154.102/api/${endpoint}/actualizar/${userId}`;
            
            const response = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(datosAEnviar) 
            }); 
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar en el servidor');
            }

            await Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Tu perfil ha sido modificado con éxito.',
                confirmButtonColor: '#bd0026',
                confirmButtonText: 'Genial'
            });
            
            navigate('/perfil'); 

        } catch (error) {
            console.error("Error al actualizar:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Hubo un error al guardar los cambios. Revisa la consola.',
                confirmButtonColor: '#bd0026'
            });
        } finally {
            setGuardando(false);
        }
    }

    const claseInput = "w-full bg-white border border-gray-300 rounded-full py-3 sm:py-4 px-5 sm:px-6 text-base sm:text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#bd0026] focus:border-transparent transition-all shadow-sm";
    const claseLabel = "block text-base sm:text-lg font-bold text-gray-600 uppercase mb-2 sm:mb-3 pl-2 sm:pl-4 tracking-wide";

    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl bg-white p-6 sm:p-12 shadow-xl rounded-[30px] border border-gray-200">
                
                <h2 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-10 text-center text-gray-900 tracking-tight">
                    Modificar Mis Datos
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" autoComplete="off">
                    
                    {/* Fila 1: Nombre y (Apellidos si es Admin) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div className={!esAdmin ? "sm:col-span-2" : ""}>
                            <label className={claseLabel}>Nombre</label>
                            <input type="text" name="nombre" value={perfil.nombre} onChange={handleChange} className={claseInput} required />
                        </div>
                        {esAdmin && (
                            <div>
                                <label className={claseLabel}>Apellidos</label>
                                <input type="text" name="apellidos" value={perfil.apellidos} onChange={handleChange} className={claseInput} required />
                            </div>
                        )}
                    </div>

                    {/* Fila 2: Email y Teléfono (aplica a todos) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                            <label className={claseLabel}>Correo Electrónico</label>
                            <input type="email" name="email" value={perfil.email} onChange={handleChange} className={claseInput} required />
                        </div>
                        <div>
                            <label className={claseLabel}>Teléfono / Contacto</label>
                            <input type="text" name="telefono" value={perfil.telefono} onChange={handleChange} className={claseInput} required />
                        </div>
                    </div>

                    {/* Fila 3: Dirección (Solo si es Cliente / VIP) */}
                    {esCliente && (
                        <div>
                            <label className={claseLabel}>Dirección de facturación / envío</label>
                            <input type="text" name="direccion" value={perfil.direccion} onChange={handleChange} className={claseInput} required />
                        </div>
                    )}

                    <hr className="border-gray-100 my-8 sm:my-10" />

                    {/* Password */}
                    <div>
                        <label className={claseLabel}>Nueva Contraseña <span className="text-gray-400 font-normal lowercase text-sm sm:text-base">(opcional)</span></label>
                        <input type="password" name="password" value={perfil.password} onChange={handleChange} className={claseInput} placeholder="Déjalo en blanco para no cambiarla" autoComplete="new-password"/>
                    </div>

                    {/* Botones */}
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