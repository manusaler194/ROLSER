import React, { useState } from 'react';

const GestionUsuarios = ({ data }) => {
  const [vista, setVista] = useState('MENU'); 
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const categorias = [
    { id: 'admins', titulo: 'Administradores' },
    { id: 'clientes', titulo: 'Clientes' },
    { id: 'vips', titulo: 'Clientes VIP' },
    { id: 'encargados', titulo: 'Encargados' },
    { id: 'comerciales', titulo: 'Comerciales' }
  ];

  // --- VISTA 1: MENÚ PRINCIPAL ---
  if (vista === 'MENU') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Tipo de Usuario</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { 
                setCategoriaActiva(cat.id); 
                setVista('LISTA'); 
                setBusqueda(''); // Limpiar búsqueda al cambiar de rol
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

  // --- VISTA 2: LISTA DE USUARIOS ---
  if (vista === 'LISTA') {
    // Obtenemos la lista segura
    const listaOriginal = (data && data[categoriaActiva]) ? data[categoriaActiva] : [];
    
    // Filtramos aquí mismo para que React detecte el cambio de 'busqueda'
    const filtrados = listaOriginal.filter(u => {
      const nombreCompleto = `${u.nombre} ${u.apellidos || ''}`.toLowerCase();
      return nombreCompleto.includes(busqueda.toLowerCase());
    });

    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
        <div className="w-full max-w-xl">
          <button 
            onClick={() => setVista('MENU')} 
            className="text-[#bd0026] font-bold mb-6 hover:underline flex items-center"
          >
            ← Volver al menú
          </button>
          
          <h2 className="text-2xl font-bold mb-6 text-black uppercase">
            {categorias.find(c => c.id === categoriaActiva)?.titulo}
          </h2>

          <input
            type="text"
            placeholder="Escribe para buscar..."
            className="w-full mb-6 p-4 rounded-full border border-gray-400 px-6 focus:ring-2 focus:ring-[#bd0026] outline-none shadow-sm bg-white"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="bg-white rounded-[30px] border border-gray-300 shadow-lg overflow-hidden">
            {filtrados.length > 0 ? (
              filtrados.map((u, i) => (
                <div key={i} className="flex justify-between items-center p-5 border-b last:border-none hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-800">
                    {u.nombre} {u.apellidos || ''}
                  </span>
                  <button 
                    onClick={() => { setUsuarioSeleccionado(u); setVista('FICHA'); }}
                    className="bg-[#bd0026] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-800 transition-all active:scale-95"
                  >
                    Ver más
                  </button>
                </div>
              ))
            ) : (
              <p className="p-10 text-center text-gray-400 italic">No se encontraron resultados en esta categoría.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA 3: FICHA DE DATOS ---
  if (vista === 'FICHA') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <h2 className="text-2xl font-bold mb-6 text-black font-sans">Datos del usuario</h2>
        <div className="bg-white p-10 rounded-[30px] border border-gray-400 shadow-2xl w-full max-w-lg">
          <div className="space-y-6">
            
            <Fila label="Nombre" value={`${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellidos || ''}`} />
            <Fila label="Email" value={usuarioSeleccionado.email || usuarioSeleccionado.correo} />
            <Fila label="Teléfono" value={usuarioSeleccionado.telefono || usuarioSeleccionado.contacto || 'N/A'} />

            <div className="flex items-center justify-between">
              <label className="text-xl w-1/3 text-right pr-4 font-normal">Rol</label>
              <div className="relative w-2/3">
                <select disabled className="w-full appearance-none border border-gray-500 rounded-full py-2 px-4 text-center bg-white opacity-100 font-medium">
                  <option className="capitalize">{categoriaActiva.slice(0, -1)}</option>
                </select>
                <div className="absolute right-4 top-2.5 pointer-events-none">▼</div>
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
};

const Fila = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <label className="text-xl w-1/3 text-right pr-4 font-normal font-sans">{label}</label>
    <input readOnly value={value} className="w-2/3 border border-gray-500 rounded-full py-2 px-4 text-center bg-white outline-none font-sans" />
  </div>
);
export default GestionUsuarios;