import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ModificarEncargado = () => {
    const navegar = useNavigate();
    const { id } = useParams(); 

    
    const [encargado, setEncargado] = useState({
        nombre: '',
        email: '',
        telefono: '' 
    });
    
    const [estaCargando, setEstaCargando] = useState(true);

    
    useEffect(() => {
        const cargarEncargado = async () => {
            try {
                const respuesta = await fetch(`http://localhost/api/encargadoAlmacen/${id}`);
                
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }

                const datos = await respuesta.json();
                const usuario = Array.isArray(datos) ? datos[0] : datos;

                setEncargado({
                    nombre: usuario.nombre || '',
                    email: usuario.email || '',
                    
                    telefono: usuario.telefono || usuario.contacto || '' 
                });

            } catch (error) {
                console.error("Error al cargar:", error);
                alert("No se pudieron cargar los datos del Encargado.");
            } finally {
                setEstaCargando(false);
            }
        };

        if (id) {
            cargarEncargado();
        }
    }, [id]);

    const manejarCambio = (e) => {
        setEncargado({
            ...encargado,
            [e.target.name]: e.target.value
        });
    };

    
    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            
            await axios.put(`http://localhost/api/encargadoAlmacen/actualizar/${id}`, encargado); 
            alert("Encargado modificado con éxito");
            navegar('/usuarios'); 
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al guardar los cambios (revisa email duplicado o campos vacíos).");
        }
    }

    const clasesInput = "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#bd0026] appearance-none bg-white text-gray-700 placeholder-gray-500 font-medium";

    if (estaCargando) {
        return <div className="flex h-screen justify-center items-center">Cargando datos del Encargado...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
                <h2 className="text-3xl font-bold text-center text-black mb-8 uppercase tracking-wide">
                    Modificar Encargado
                </h2>
                
                <form onSubmit={manejarEnvio}>
                    {/* NOMBRE */}
                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={encargado.nombre} 
                        onChange={manejarCambio} 
                        className={clasesInput} 
                        required 
                    />

                    {/* EMAIL */}
                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Correo Electrónico</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={encargado.email} 
                        onChange={manejarCambio} 
                        className={clasesInput} 
                        required 
                    />

                    {/* TELEFONO */}
                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Teléfono / Contacto</label>
                    <input 
                        type="text" 
                        name="telefono" 
                        value={encargado.telefono} 
                        onChange={manejarCambio} 
                        className={clasesInput} 
                        required 
                    />

                    <button type="submit" className="w-full py-4 mt-4 text-white font-bold bg-[#bd0026] rounded-full hover:bg-red-800 transition-all transform active:scale-95 shadow-lg uppercase tracking-wider"> 
                        Guardar Cambios 
                    </button>
                </form>
            </div>

            <div className="fixed bottom-10 right-10">
                <button onClick={() => navegar('/usuarios')} className="bg-black text-white px-10 py-3 rounded-full text-xl font-bold hover:bg-gray-800 shadow-xl transition-transform active:scale-95 cursor-pointer uppercase">
                    Volver
                </button>
            </div>
        </div>
    )
}

export default ModificarEncargado;