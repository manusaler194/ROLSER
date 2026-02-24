import React from "react";
const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  if (totalPaginas <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button 
        disabled={paginaActual === 1}
        onClick={() => cambiarPagina(paginaActual - 1)}
        className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-300 transition-colors cursor-pointer"
      >
        Anterior
      </button>
      <span className="text-lg font-medium">Página {paginaActual} de {totalPaginas}</span>
      <button 
        disabled={paginaActual === totalPaginas}
        onClick={() => cambiarPagina(paginaActual + 1)}
        className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-300 transition-colors cursor-pointer"
      >
        Siguiente
      </button>
    </div>
  );
};
export default Paginacion;