import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORTAR ESTO

import AdminsTable from "./AdminsTable";
import ClientesTable from './ClientesTable';
import VipsTable from './ClientesVips';
import EncargadosTable from './Encargado';
import ComercialesTable from './Comercial';

const GestionUsuarios = () => {
    // Configuración
    const API_URL = 'http://127.0.0.1/api/users';
    
    // Hook para navegación
    const navigate = useNavigate(); // <--- 2. INICIALIZAR EL HOOK

    // Estados
    const [vista, setVista] = useState('MENU'); 
    const [categoriaActiva, setCategoriaActiva] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [formulario, setFormulario] = useState(null); 
    
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const categorias = [
        { id: 'admins', titulo: 'Administradores' },
        { id: 'clientes', titulo: 'Clientes' },
        { id: 'vips', titulo: 'Clientes VIP' },
        { id: 'encargados', titulo: 'Encargados' },
        { id: 'comerciales', titulo: 'Comerciales' }
    ];

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Error de conexión");
                const result = await response.json();
                setDatos(result);
            } catch (err) {
                console.error(err);
                setError("No se pudo conectar con el servidor.");
            } finally {
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, []);

    const parsearUsuario = (u) => ({
        id: u.id, // Asegúrate de que tu API devuelve el ID aquí
        nombre: u.nombre || '',
        apellidos: u.apellidos || '',
        email: u.email || u.correo || '',
        telefono: u.telefono || u.tel || u.contacto || '',
        direccion: u.direccion || '', 
        original: u 
    });

    // Lógica para el formulario genérico (para los que no son Admins todavía)
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleGuardar = () => {
        console.log("Guardando datos...", formulario);
        alert("Datos guardados (Simulación)");
        setVista('LISTA');
    };

    if (cargando) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-600">Cargando recursos...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

    // --- VISTAS ---

    // 1. MENU
    if (vista === 'MENU') {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-widest">Gestión de Usuarios</h1>
                    <div className="h-1 w-24 bg-[#bd0026] mx-auto mt-4"></div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {categorias.map((cat) => (
                        <BotonCategoria 
                            key={cat.id} 
                            categoria={cat} 
                            cantidad={datos?.[cat.id]?.length || 0}
                            onClick={() => {
                                if (datos?.[cat.id]) {
                                    setCategoriaActiva(cat.id);
                                    setVista('LISTA');
                                    setBusqueda('');
                                } else {
                                    alert(`Sin datos para ${cat.titulo}`);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // 2. LISTA
    if (vista === 'LISTA') {
        const listaRaw = datos[categoriaActiva] || [];
        const usuarios = listaRaw.map(parsearUsuario).filter(u => {
            const term = busqueda.toLowerCase();
            return u.nombre.toLowerCase().includes(term) || 
                   u.apellidos.toLowerCase().includes(term) ||
                   u.email.toLowerCase().includes(term);
        });

        const tituloSeccion = categorias.find(c => c.id === categoriaActiva)?.titulo;

        return (
            <div className="min-h-screen bg-gray-100 p-8 font-sans">
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => setVista('MENU')} className="text-[#bd0026] font-bold mb-8 hover:underline flex items-center gap-2">
                        ← VOLVER AL MENÚ
                    </button>

                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-3xl font-bold text-black uppercase">{tituloSeccion}</h2>
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">Total: {usuarios.length}</span>
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        className="w-full mb-8 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        {usuarios.length > 0 ? (
                            usuarios.map((u, i) => (
                                <ItemLista 
                                    key={i} 
                                    usuario={u} 
                                    onVer={() => { setUsuarioSeleccionado(u); setVista('FICHA'); }} 
                                    
                                    // 3. AQUÍ ESTÁ EL CAMBIO IMPORTANTE:
                                    onEditar={() => { 
                                        if (categoriaActiva === 'admins') {
                                            // Si es admin, vamos a la NUEVA RUTA que creamos antes
                                            navigate(`/modificar-admin/${u.id}`);
                                        } else {
                                            // Si es otro, usamos el formulario genérico antiguo
                                            setUsuarioSeleccionado(u); 
                                            setFormulario(u); 
                                            setVista('EDITAR'); 
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400">No hay resultados.</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 3. FICHA
    if (vista === 'FICHA' && usuarioSeleccionado) {
        
        if (categoriaActiva === 'admins') {
            return <AdminsTable usuario={usuarioSeleccionado} onVolver={() => setVista('LISTA')} />;
        }
        else if (categoriaActiva === 'clientes') {
             return <ClientesTable usuario={usuarioSeleccionado} onVolver={() => setVista('LISTA')} />;
        }
        else if (categoriaActiva === 'vips') { 
            return <VipsTable usuario={usuarioSeleccionado} onVolver={() => setVista('LISTA')} />;
        }
        else if (categoriaActiva === 'encargados') {
            return <EncargadosTable usuario={usuarioSeleccionado} onVolver={() => setVista('LISTA')} />;
        }
        else if (categoriaActiva === 'comerciales') {
            return <ComercialesTable usuario={usuarioSeleccionado} onVolver={() => setVista('LISTA')} />;
        }

        // Fallback genérico
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
                {/* ... tu ficha genérica antigua ... */}
            </div>
        );
    }

    // 4. EDITAR GENÉRICO (Solo se usará para usuarios que NO sean Admins por ahora)
    if (vista === 'EDITAR' && formulario) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
                <div className="w-full max-w-lg bg-white p-10 shadow-2xl rounded-sm border-t-4 border-black">
                    <h2 className="text-2xl font-bold mb-8 text-center text-black uppercase tracking-wider border-b pb-4">
                        Modificar Usuario (Genérico)
                    </h2>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <InputEditable label="Nombre" name="nombre" value={formulario.nombre} onChange={handleChange} />
                            <InputEditable label="Apellidos" name="apellidos" value={formulario.apellidos} onChange={handleChange} />
                        </div>
                        
                        <InputEditable label="Email" name="email" value={formulario.email} onChange={handleChange} type="email" />
                        <InputEditable label="Teléfono" name="telefono" value={formulario.telefono} onChange={handleChange} />
                        <InputEditable label="Dirección" name="direccion" value={formulario.direccion} onChange={handleChange} />

                        <div className="flex justify-center pt-8 gap-3">
                            <button
                                onClick={() => setVista('LISTA')}
                                className="w-1/2 border border-gray-400 text-gray-600 font-bold py-3 px-4 rounded shadow hover:bg-gray-50 transition duration-300 uppercase"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardar}
                                className="w-1/2 bg-black text-white font-bold py-3 px-4 rounded shadow-lg hover:bg-gray-800 transition duration-300 uppercase"
                            >
                                Guardar (Simulado)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

// --- Componentes Auxiliares ---
const BotonCategoria = ({ categoria, cantidad, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white group p-8 rounded-xl border border-gray-300 shadow-sm hover:border-[#bd0026] hover:shadow-xl transition-all duration-300 flex flex-col items-center"
    >
        <span className="text-xl font-bold text-gray-700 group-hover:text-[#bd0026] uppercase tracking-wide">
            {categoria.titulo}
        </span>
        <span className="text-sm text-gray-400 mt-2">
            {cantidad} Registros
        </span>
    </button>
);

const ItemLista = ({ usuario, onVer, onEditar }) => (
    <div className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors group">
        <div className='flex flex-col'>
            <span className="text-lg font-bold text-gray-800 group-hover:text-[#bd0026] transition-colors">
                {usuario.nombre} {usuario.apellidos}
            </span>
            <span className="text-sm text-gray-500">{usuario.email}</span>
        </div>
        <div className="flex gap-2">
            <button
                onClick={onEditar}
                className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm uppercase tracking-wider"
            >
                Modificar
            </button>
            <button
                onClick={onVer}
                className="bg-white border border-[#bd0026] text-[#bd0026] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#bd0026] hover:text-white transition-all shadow-sm uppercase tracking-wider"
            >
                Ver Ficha
            </button>
        </div>
    </div>
);

const InputSoloLectura = ({ label, value }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">{label}</label>
        <input 
            readOnly 
            value={value} 
            className="w-full bg-[#f2f2f2] border border-gray-400 p-3 text-gray-800 text-center font-medium focus:outline-none cursor-default" 
        />
    </div>
);

const InputEditable = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">{label}</label>
        <input 
            type={type}
            name={name}
            value={value} 
            onChange={onChange}
            className="w-full bg-white border border-gray-400 p-3 text-gray-800 font-medium focus:outline-none focus:border-[#bd0026] focus:ring-1 focus:ring-[#bd0026] transition-all rounded-sm" 
        />
    </div>
);

export default GestionUsuarios;