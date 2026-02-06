import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CrearCliente = () => {
    
    const [cliente, setCliente] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        direccion: '',
        id_administrador: '', 
        id_comercial: ''      
    });

    
    const [administradores, setAdministradores] = useState([]);
    const [comerciales, setComerciales] = useState([]);
    
    const navigate = useNavigate();

    
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const resAdmins = await axios.get('http://localhost/api/administradores'); 
                const resComerciales = await axios.get('http://localhost/api/comerciales');
                
                if (resAdmins.data.admin) {
                    setAdministradores(resAdmins.data.admin);
                } else {
                    setAdministradores(resAdmins.data); 
                }
                
                if (resComerciales.data.comercial) {
                     setComerciales(resComerciales.data.comercial);
                } else {
                     setComerciales(resComerciales.data);
                }

            } catch (error) {
                console.error("Error al cargar listas:", error);
            }
        };
        cargarDatos();
    }, []);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const datosEnviados = {
                ...cliente,
                id_administrador: cliente.id_administrador ? parseInt(cliente.id_administrador) : null,
                id_comercial: cliente.id_comercial ? parseInt(cliente.id_comercial) : null
            };

            const response = await axios.post('http://localhost/api/clientes/guardar', datosEnviados);
            console.log("Funciona:", response.data);
            
           
            alert("Cliente creado con éxito");
            
            
            navigate('/usuarios'); 

        } catch (error) {
            console.error("Error completo:", error);
            const mensajeError = error.response?.data?.message || "Error desconocido";
            const detallesError = JSON.stringify(error.response?.data?.errors || {});
            alert(`Error del servidor: ${mensajeError} \n ${detallesError}`);
        }
    };

    const inputClasses = "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Crear nuevo Cliente</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre Completo" 
                        value={cliente.nombre} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Teléfono */}
                    <input 
                        type="text" 
                        name="telefono" 
                        placeholder="Teléfono" 
                        value={cliente.telefono} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Correo */}
                    <input 
                        type="email" 
                        name="correo" 
                        placeholder="Correo Electrónico" 
                        value={cliente.correo} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Dirección */}
                    <input 
                        type="text" 
                        name="direccion" 
                        placeholder="Dirección" 
                        value={cliente.direccion} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Select Administrador */}
                    <div className="relative mb-6">
                        <select 
                            name="id_administrador" 
                            value={cliente.id_administrador} 
                            className={inputClasses} 
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Administrador (Opcional)</option>
                            {administradores.map((admin) => (
                                <option key={admin.id} value={admin.id}>
                                    {admin.nombre} {admin.apellidos}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    {/* Select Comercial */}
                    <div className="relative mb-8">
                        <select 
                            name="id_comercial" 
                            value={cliente.id_comercial} 
                            className={inputClasses} 
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Comercial (Opcional)</option>
                            {comerciales.map((comercial) => (
                                <option key={comercial.id} value={comercial.id}>
                                    {comercial.nombre} {comercial.apellidos}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 mt-2 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"
                    > 
                        CREAR CLIENTE 
                    </button>
                </form>
            </div>

            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}

export default CrearCliente;