import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ModificarComercial = () => {
    const navegar = useNavigate();
    const { id } = useParams(); 

    
    const [comercial, setComercial] = useState({
        nombre: '',
        email: '',
        contacto: '',
        password: '' 
    });
    
    const [estaCargando, setEstaCargando] = useState(true);

    
    useEffect(() => {
        const cargarComercial = async () => {
            try {
                
                const respuesta = await fetch(`http://localhost/api/comerciales/${id}`);
                
                if (!respuesta.ok) throw new Error("Error al conectar con la API");

                const datos = await respuesta.json();
                
                
                const usuario = datos; 

                setComercial({
                    nombre: usuario.nombre || '',
                    email: usuario.email || '',
                    contacto: usuario.contacto || usuario.telefono || '',
                    password: '' 
                });

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
        try {
            // Creamos una copia para enviar
            const datosAEnviar = { ...comercial };
            
            // Si la contraseña está vacía, la borramos para que Laravel no intente validarla/guardarla vacía
            if (!datosAEnviar.password) {
                delete datosAEnviar.password;
            }

            await axios.put(`http://192.168.0.14:8008/api/comerciales/actualizar/${id}`, datosAEnviar); 
            
            alert("Comercial modificado con éxito");
            navegar('/listado-comerciales'); // Es mejor volver al listado específico
        } catch (error) {
            console.error("Error al actualizar:", error);
            // Mostramos el error real si viene del servidor
            const mensajeError = error.response?.data?.message || "Hubo un error al guardar los cambios.";
            alert(mensajeError);
        }
    }

    const clasesInput = "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#bd0026] appearance-none bg-white text-gray-700 placeholder-gray-500 font-medium";

    if (estaCargando) {
        return <div className="flex h-screen justify-center items-center">Cargando datos del Comercial...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
                <h2 className="text-3xl font-bold text-center text-black mb-8 uppercase tracking-wide">
                    Modificar Comercial
                </h2>
                
                <form onSubmit={manejarEnvio}>
                    {/* NOMBRE */}
                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Nombre</label>
                    <input 
                        type="text" name="nombre" value={comercial.nombre} onChange={manejarCambio} 
                        className={clasesInput} required 
                    />

                    {/* EMAIL */}
                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Correo Electrónico</label>
                    <input 
                        type="email" name="email" value={comercial.email} onChange={manejarCambio} 
                        className={clasesInput} required 
                    />

                    {/* CONTACTO */}
                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Contacto / Teléfono</label>
                    <input 
                        type="text" name="contacto" value={comercial.contacto} onChange={manejarCambio} 
                        className={clasesInput} required 
                    />

                    

                    <button type="submit" className="w-full py-4 mt-4 text-white font-bold bg-[#bd0026] rounded-full hover:bg-red-800 transition-all transform active:scale-95 shadow-lg uppercase tracking-wider"> 
                        Guardar Cambios 
                    </button>
                </form>
            </div>

            <div className="fixed bottom-10 right-10">
                <button onClick={() => navegar('/listado-comerciales')} className="bg-black text-white px-10 py-3 rounded-full text-xl font-bold hover:bg-gray-800 shadow-xl transition-transform active:scale-95 cursor-pointer uppercase">
                    Volver
                </button>
            </div>
        </div>
    )
}

export default ModificarComercial;