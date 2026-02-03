import React, { useState } from 'react';

const GestionUsuarios = ({ data }) => {
    const [vista, setVista] = useState('MENU');
    const [categoriaActiva, setCategoriaActiva] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    // Tus categorías coinciden con el JSON, así que esto está perfecto
    const categorias = [
        { id: 'admins', titulo: 'Administradores' },
        { id: 'clientes', titulo: 'Clientes' },
        { id: 'vips', titulo: 'Clientes VIP' },
        { id: 'encargados', titulo: 'Encargados' },
        { id: 'comerciales', titulo: 'Comerciales' }
    ];

    // FUNCIÓN PARA UNIFICAR DATOS (Tu API usa nombres distintos para lo mismo)
    const normalizarUsuario = (u) => {
        return {
            nombre: u.nombre,
            apellidos: u.apellidos || '', // Clientes y VIPs no tienen apellidos en tu JSON
            // Aquí detectamos si viene como 'email' o 'correo'
            email: u.email || u.correo || 'No especificado',
            // Aquí detectamos si viene como 'telefono' o 'contacto'
            telefono: u.telefono || u.contacto || 'No especificado',
            direccion: u.direccion || null,
            original: u // Guardamos el objeto original por si acaso
        };
    };

    // --- VISTA: MENÚ ---
    if (vista === 'MENU') {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans">
                <h1 className="text-3xl font-bold mb-10 text-gray-800">Panel de Control de Usuarios</h1>
                
                {/* Debug rápido: Si data es null aquí, es que el fetch falló */}
                {!data && <p className="text-red-500 mb-4">⚠ No hay datos cargados.</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                    {categorias.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setCategoriaActiva(cat.id);
                                setVista('LISTA');
                                setBusqueda('');
                            }}
                            className="bg-white p-10 rounded-[30px] border border-gray-300 shadow-sm hover:border-[#bd0026] hover:shadow-md transition-all text-xl font-bold text-gray-700 active:scale-95"
                        >
                            {cat.titulo}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // --- VISTA: LISTA ---
    if (vista === 'LISTA') {
        // Obtenemos el array crudo del JSON
        const rawList = (data && data[categoriaActiva]) ? data[categoriaActiva] : [];
        
        // Convertimos cada usuario a un formato unificado
        const listaNormalizada = rawList.map(normalizarUsuario);

        const filtrados = listaNormalizada.filter(u => {
            const textoBusqueda = busqueda.toLowerCase();
            return (
                u.nombre.toLowerCase().includes(textoBusqueda) || 
                u.email.toLowerCase().includes(textoBusqueda)
            );
        });

        return (
            <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
                <div className="w-full max-w-xl">
                    <button onClick={() => setVista('MENU')} className="text-[#bd0026] font-bold mb-6 hover:underline flex items-center">
                        ← Volver al menú
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-black uppercase">
                        {categorias.find(c => c.id === categoriaActiva)?.titulo}
                    </h2>

                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        className="w-full mb-6 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <div className="bg-white rounded-[30px] border border-gray-300 shadow-lg overflow-hidden">
                        {filtrados.length > 0 ? (
                            filtrados.map((u, i) => (
                                <div key={i} className="flex justify-between items-center p-5 border-b last:border-none hover:bg-gray-50 transition-colors">
                                    <div className='flex flex-col'>
                                        <span className="text-lg font-medium text-gray-800">
                                            {u.nombre} {u.apellidos}
                                        </span>
                                        <span className="text-xs text-gray-500">{u.email}</span>
                                    </div>
                                    <button
                                        onClick={() => { setUsuarioSeleccionado(u); setVista('FICHA'); }}
                                        className="bg-[#bd0026] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-800 transition-all active:scale-95"
                                    >
                                        Ver más
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center">
                                <p className="text-gray-400 italic mb-2">No se encontraron resultados.</p>
                                <p className="text-xs text-gray-400">
                                    (Datos recibidos: {rawList.length} registros)
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- VISTA: FICHA ---
    if (vista === 'FICHA' && usuarioSeleccionado) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
                <h2 className="text-2xl font-bold mb-6 text-black font-sans">Ficha de Usuario</h2>
                <div className="bg-white p-10 rounded-[30px] border border-gray-400 shadow-2xl w-full max-w-lg">
                    <div className="space-y-6">

                        <Fila label="Nombre" value={`${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellidos}`} />
                        <Fila label="Email" value={usuarioSeleccionado.email} />
                        <Fila label="Teléfono" value={usuarioSeleccionado.telefono} />
                        
                        {/* Mostrar dirección solo si existe (Clientes y VIPs) */}
                        {usuarioSeleccionado.direccion && (
                            <div className="flex flex-col mb-2">
                                <label className="text-sm text-gray-500 mb-1 ml-4">Dirección</label>
                                <div className="border border-gray-500 rounded-2xl py-2 px-4 bg-gray-50 text-sm">
                                    {usuarioSeleccionado.direccion}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                            <label className="text-xl w-1/3 text-right pr-4 font-normal">Rol</label>
                            <div className="relative w-2/3">
                                <select disabled className="w-full appearance-none border border-gray-500 rounded-full py-2 px-4 text-center bg-gray-200 font-medium">
                                    <option className="capitalize">{categoriaActiva}</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-center pt-6">
                            <button
                                onClick={() => setVista('LISTA')}
                                className="bg-[#bd0026] text-white font-bold py-3 px-20 rounded-full hover:bg-red-800 shadow-md active:scale-95 transition-all"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

// Componente Fila simple
const Fila = ({ label, value }) => (
    <div className="flex items-center justify-between">
        <label className="text-xl w-1/3 text-right pr-4 font-normal font-sans">{label}</label>
        <input readOnly value={value} className="w-2/3 border border-gray-500 rounded-full py-2 px-4 text-center bg-white outline-none font-sans" />
    </div>
);
export default GestionUsuarios;