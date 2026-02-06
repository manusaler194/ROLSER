import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CrearClienteVip = () => {
    const navigate = useNavigate();

    // 1. Estado inicial EXACTO según tu validación de Laravel
    const [clienteVip, setClienteVip] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        direccion: '',
        id_administrador: '', // Se enviará como integer o null
        id_catalogo: ''       // Se enviará como integer o null
    });

    // Estados para llenar los selects
    const [administradores, setAdministradores] = useState([]);
    const [catalogos, setCatalogos] = useState([]);

    // 2. Cargar datos al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Ajusta estas URLs si tu backend tiene rutas distintas
                const resAdmins = await axios.get('http://localhost/api/administradores');
                const resCatalogos = await axios.get('http://localhost/api/catalogos');

                console.log("Datos Admins:", resAdmins.data);
                console.log("Datos Catalogos:", resCatalogos.data);

                // Lógica para extraer el array de administradores
                // (Intenta buscar .admin, si no usa la data directa)
                const listaAdmins = resAdmins.data.admin || resAdmins.data || [];
                setAdministradores(listaAdmins);

                // Lógica para extraer el array de catálogos
                // (Intenta buscar .catalogo, si no usa la data directa)
                const listaCatalogos = resCatalogos.data.catalogo || resCatalogos.data || [];
                setCatalogos(listaCatalogos);

            } catch (error) {
                console.error("Error cargando listas desplegables:", error);
                alert("No se pudieron cargar las listas de administradores o catálogos.");
            }
        };
        cargarDatos();
    }, []);

    // 3. Manejar cambios en los inputs
    const handleChange = (e) => {
        setClienteVip({
            ...clienteVip,
            [e.target.name]: e.target.value
        });
    };

    // 4. Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // PREPARACIÓN DE DATOS (CRÍTICO)
            // Laravel espera 'integer' o 'null'. Si el string está vacío "", enviamos null.
            const datosEnviados = {
                nombre: clienteVip.nombre,
                telefono: clienteVip.telefono,
                correo: clienteVip.correo,
                direccion: clienteVip.direccion,
                id_administrador: clienteVip.id_administrador ? parseInt(clienteVip.id_administrador) : null,
                id_catalogo: clienteVip.id_catalogo ? parseInt(clienteVip.id_catalogo) : null,
            };

            console.log("Enviando al servidor:", datosEnviados);

            // Asegúrate que esta URL es correcta en tu api.php
            const url = 'http://localhost/api/clientesVip/guardar'; 
            
            const response = await axios.post(url, datosEnviados);

            console.log("Respuesta Exitosa:", response.data);
            alert("Cliente VIP creado con éxito");
            
            // Redirección a usuarios
            navigate('/usuarios');

        } catch (error) {
            console.error("Error completo:", error);
            
            // Extracción segura del mensaje de error
            let mensaje = "Error desconocido";
            let detalles = "";

            if (error.response) {
                // El servidor respondió con un código de error (ej: 422 o 500)
                mensaje = error.response.data.message || error.response.statusText;
                
                // Si hay errores de validación (422)
                if (error.response.data.errors) {
                    detalles = JSON.stringify(error.response.data.errors, null, 2);
                }
            } else if (error.request) {
                mensaje = "No se pudo conectar con el servidor";
            } else {
                mensaje = error.message;
            }

            alert(`Hubo un error:\n${mensaje}\n\nDetalles:\n${detalles}`);
        }
    };

    // Estilos CSS (Reutilizados para mantener diseño)
    const inputClasses = "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Crear nuevo Cliente <span className="text-[#b3002d]">VIP</span>
                </h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre Completo" 
                        value={clienteVip.nombre} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Teléfono */}
                    <input 
                        type="text" 
                        name="telefono" 
                        placeholder="Teléfono" 
                        value={clienteVip.telefono} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Correo */}
                    <input 
                        type="email" 
                        name="correo" 
                        placeholder="Correo Electrónico" 
                        value={clienteVip.correo} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* Dirección */}
                    <input 
                        type="text" 
                        name="direccion" 
                        placeholder="Dirección" 
                        value={clienteVip.direccion} 
                        className={inputClasses} 
                        onChange={handleChange} 
                        required 
                    />

                    {/* SELECT ADMINISTRADOR */}
                    <div className="relative mb-6">
                        <select 
                            name="id_administrador" 
                            value={clienteVip.id_administrador} 
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
                        {/* Icono flecha */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    {/* SELECT CATÁLOGO */}
                    <div className="relative mb-8">
                        <select 
                            name="id_catalogo" 
                            value={clienteVip.id_catalogo} 
                            className={inputClasses} 
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Catálogo (Opcional)</option>
                            {catalogos.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {/* Intentamos mostrar 'nombre', si no existe mostramos ID para depurar */}
                                    {cat.nombre ? cat.nombre : `Catálogo #${cat.id}`}
                                </option>
                            ))}
                        </select>
                        {/* Icono flecha */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 mt-2 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"
                    > 
                        CREAR CLIENTE VIP
                    </button>
                </form>
            </div>

            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
                <button 
                    onClick={() => navigate('/usuarios')} 
                    className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}

export default CrearClienteVip;