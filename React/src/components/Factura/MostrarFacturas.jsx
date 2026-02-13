import React from "react";
const MostrarFacturas = () =>{
return (
    <div style={{ width: '100%', height: '500px' }}>
      <h2>Vista desde Laravel</h2>
      <iframe
        src="http://localhost/mostrar/facturas"
        title="Contenido de Laravel"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
}
export default MostrarFacturas;