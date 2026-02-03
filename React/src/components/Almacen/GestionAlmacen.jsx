import React, { useState } from 'react';
// Importamos el icono
import iconoDesplegable from '/src/assets/desplegable.svg';

const GestionAlmacen = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const almacenes = [
    { id: 1, nombre: 'almacén 1' },
    { id: 2, nombre: 'almacén 2' },
    { id: 3, nombre: 'almacén 3' },
    { id: 4, nombre: 'almacén 1' },
    { id: 5, nombre: 'almacén 2' },
    { id: 6, nombre: 'almacén 3' },
    { id: 7, nombre: 'almacén 1' },
    { id: 8, nombre: 'almacén 2' },
    { id: 9, nombre: 'almacén 3' },
  ];

  return (
    <div className="p-10 flex flex-col h-full">
      <div className="flex flex-col gap-6 w-72">
        {almacenes.map((almacen) => (
          <div key={almacen.id} className="relative flex items-center">

            <button 
              onClick={() => setOpenMenu(openMenu === almacen.id ? null : almacen.id)}
              className="flex items-center justify-between w-full bg-[#757575] text-white px-5 py-3 rounded-2xl hover:bg-gray-600 cursor-pointer">
              <span className="text-xl font-medium">{almacen.nombre}</span>
              
              <img src={iconoDesplegable} className={`w-6 h-6 transition-transform duration-500  invert ${openMenu === almacen.id ? 'rotate-180' : 'rotate-0'}`}/>
            </button>

            {openMenu === almacen.id && (
              <div className="absolute left-full ml-10 bg-white border-2 border-gray-400">
                <div className="flex flex-col text-xl">
                  <button className="px-6 py-2 border-b-2 border-gray-400 hover:bg-gray-100 text-left cursor-pointer">Modificar</button>
                  <button className="px-6 py-2 border-b-2 border-gray-400 hover:bg-gray-100 text-left cursor-pointer">Eliminar</button>
                  <button className="px-6 py-2 hover:bg-gray-100 text-left cursor-pointer">Ver datos</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 right-20">
        <button className="bg-[#bc002d] text-white px-12 py-4 rounded-3xl text-2xl font-bold hover:bg-red-800 shadow-lg transition-transform active:scale-95 cursor-pointer">Crear</button>
      </div>
    </div>
  );
};

export default GestionAlmacen;