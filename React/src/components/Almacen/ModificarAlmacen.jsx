import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { apiFetch } from '../../utils/api';

const ModificarAlmacen = () =>{
      const [almacen,setAlmacen] = useState({
        direccion : '',
        capacidad : '',
        id_encargado: ''
    });
    const [encargados, setEncargados] = useState([]);
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDireccion = (e) =>{
        setAlmacen({...almacen, direccion : e.target.value})
    }
    const handleCapacidad = (e) =>{
        setAlmacen({...almacen, capacidad : e.target.value})
    }
    const handleEncargado = (e) =>{
        setAlmacen({...almacen, id_encargado : e.target.value})
    }

    useEffect(() => {
        const obtenerAlmacen = async () => {
            const response = await apiFetch(`http://localhost/api/almacenes/${id}`);
            const data = await response.json();
            
            const almacenRecibido = data.almacen[0];
            
            setAlmacen({
                direccion: almacenRecibido.direccion,
                capacidad: almacenRecibido.capacidad,
                id_encargado: almacenRecibido.id_encargado
            });
            
        };

       const obtenerEncargados = async () => {
        try {
            const response = await apiFetch('http://localhost/api/encargadoAlmacen');
            const data = await response.json();
            console.log(data);
            setEncargados(data.encargadoAlmacen);
        } catch (error) {
            console.error("Error al obtener encargados:", error);
        }
        };

        obtenerAlmacen();
        obtenerEncargados();
        },[id]);

    const handleSubmit = async (e) =>{
        console.log("a");
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost/api/almacenes/actualizar/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(almacen)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Funciona:", data);
                alert("Almacén actualizado con éxito");
                navigate('/GestionAlmacen');
            } else {
                alert("Hubo un error al modificar el almacén");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Hubo un error al modificar el almacén");
        }
    }


    const inputClasses = "w-full px-5 py-3 mb-10 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 appearance-none bg-white text-gray-700";
    
    return(
    
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-150 h-150 p-10 bg-white border border-gray-200 rounded-2rem shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Modificar Almacén</h2>
                <form onSubmit={handleSubmit}> 
                    <input type="text" name="direccion" placeholder={almacen.direccion} value={almacen.direccion} className={inputClasses} onChange={handleDireccion} required/>
                    <input type="number" name="capacidad" placeholder={almacen.capacidad} value={almacen.capacidad} className={inputClasses} onChange={handleCapacidad} min = "1" required/>
                    <div className="relative mb-4">
                        <select name="id_encargado" value={almacen.id_encargado} className={inputClasses} onChange={handleEncargado} onFocus={()=> setMenu(true)} required>
                            <option key="default" value="" disabled>{encargados.nombre}</option>
                                {encargados.map((encargado)=>(
                                    <option key={encargado.id_encargado} value={encargado.id_encargado}>{encargado.nombre}</option>
                                ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full py-4 mt-2 text-white font-bold bg-[#b3002d] rounded-full hover:bg-red-900 transition-all transform active:scale-95 shadow-lg"> MODIFICAR </button>
                </form>
            </div>

            <div className="absolute bottom-20 right-20">
                <button onClick={()=> navigate('/GestionAlmacen')} className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer">Volver</button>
            </div>
        </div>
    )
    

}
export default ModificarAlmacen;