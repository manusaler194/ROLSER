import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ModificarAdministrador = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    console.log("ID RECIBIDO EN LA URL:", id);
    
    const [admin, setAdmin] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: ''
    });
    
    const [cargando, setCargando] = useState(true);

   
    useEffect(() => {
        const cargarAdmin = async () => {
            try {
                const response = await fetch(`http://localhost/api/administradores/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("Datos recibidos:", data);

               
                const usuario = Array.isArray(data) ? data[0] : data;

                setAdmin({
                    nombre: usuario.nombre || '',
                    apellidos: usuario.apellidos || '',
                    email: usuario.email || '',
                    telefono: usuario.telefono || ''
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

    // 3. Guardar cambios (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost/api/administradores/actualizar/${id}`, admin); 
            alert("Administrador modificado con éxito");
            navigate('/usuarios'); // Asegúrate que esta ruta lleva a tu menú principal
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al guardar los cambios.");
        }
    }

    const inputClasses = "w-full px-5 py-3 mb-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#bd0026] appearance-none bg-white text-gray-700 placeholder-gray-500 font-medium";

    if (cargando) {
        return <div className="flex h-screen justify-center items-center">Cargando datos del administrador...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-2xl p-10 bg-white border border-gray-200 rounded-[2rem] shadow-lg">
                <h2 className="text-3xl font-bold text-center text-black mb-8 uppercase tracking-wide">
                    Modificar Administrador
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={admin.nombre} // El valor viene del estado
                                onChange={handleChange} 
                                className={inputClasses} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Apellidos</label>
                            <input 
                                type="text" 
                                name="apellidos" 
                                value={admin.apellidos} 
                                onChange={handleChange} 
                                className={inputClasses} 
                                required 
                            />
                        </div>
                    </div>

                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Correo Electrónico</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={admin.email} 
                        onChange={handleChange} 
                        className={inputClasses} 
                        required 
                    />

                    <label className="ml-4 mb-1 block text-xs font-bold text-gray-500 uppercase">Teléfono</label>
                    <input 
                        type="text" 
                        name="telefono" 
                        value={admin.telefono} 
                        onChange={handleChange} 
                        className={inputClasses} 
                        required 
                    />

                    <button type="submit" className="w-full py-4 mt-4 text-white font-bold bg-[#bd0026] rounded-full hover:bg-red-800 transition-all transform active:scale-95 shadow-lg uppercase tracking-wider"> 
                        Guardar Cambios 
                    </button>
                </form>
            </div>

            <div className="fixed bottom-10 right-10">
                <button onClick={() => navigate('/usuarios')} className="bg-black text-white px-10 py-3 rounded-full text-xl font-bold hover:bg-gray-800 shadow-xl transition-transform active:scale-95 cursor-pointer uppercase">
                    Volver
                </button>
            </div>
        </div>
    )
}

export default ModificarAdministrador;