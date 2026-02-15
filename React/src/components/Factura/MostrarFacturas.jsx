import React from "react";

const MostrarFacturas = () => {
  return (
    /* flex, items-center y justify-center para que la tabla flote en el centro */
    <div className="w-full h-screen flex items-center justify-center p-6">
      
      {/* max-w-4xl para que el listado sea un poco más ancho que la ficha individual, pero no total */}
      <div className="w-full max-w-4xl h-[85vh] shadow-2xl rounded-2xl overflow-hidden">
        <iframe 
          src="http://localhost/mostrar/facturas" 
          title="Contenido de Laravel" 
          className="w-full h-full border-none" 
          allowFullScreen
        />
      </div>
      
    </div>
  );
};

export default MostrarFacturas;