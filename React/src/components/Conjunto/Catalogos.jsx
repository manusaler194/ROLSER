import React from 'react';

const Catalogos = () => {
  // Datos simulados (Reemplaza las URLs con tus imágenes importadas de /assets)
  const productos = [
    {
      id: 1,
      titulo: "Escaleras",
      // Ejemplo: import imgEscalera from '../assets/escalera.png'
      img: "https://placehold.co/200x300/png?text=Escalera", 
    },
    {
      id: 2,
      titulo: "Carros de Compra",
      img: "https://placehold.co/200x300/png?text=Carro",
    },
    {
      id: 3,
      titulo: "Bolsos",
      img: "https://placehold.co/200x300/png?text=Bolso",
    },
    {
      id: 4,
      titulo: "Tablas de Planchar",
      img: "https://placehold.co/200x300/png?text=Tabla",
    },
  ];

  return (
    <div className="w-full h-full bg-white p-10 overflow-y-auto">
      {/* Título de la sección */}
      <h2 className="text-center text-4xl text-black mb-12 tracking-wide uppercase font-normal mt-4">
        Catálogos
      </h2>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-10 max-w-5xl mx-auto">
        {productos.map((producto) => (
          <div key={producto.id} className="flex flex-col items-center group">
            
            {/* Contenedor de Imagen */}
            <div className="h-64 w-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
              <img 
                src={producto.img} 
                alt={producto.titulo} 
                className="max-h-full object-contain drop-shadow-xl"
              />
            </div>
            
            {/* Texto "Informacion" */}
            <span className="text-gray-800 text-lg mb-3">
              Informacion
            </span>

            {/* Botón Acceder (Rojo Rolser) */}
            <button className="bg-[#C8102E] hover:bg-[#a00c24] text-white px-10 py-1.5 rounded-full text-sm font-medium shadow-md transition-colors cursor-pointer">
              Acceder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogos;