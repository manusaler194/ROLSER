import React from "react";
import { useParams } from "react-router-dom"; 

const MostrarFactura = () => {
const { id } = useParams(); 

return (
  <div style={{ width: '100%', height: '600px' }}>
    <iframe
      src={`http://localhost/render-factura/${id}`} 
      style={{ border: 'none', width: '100%', height: '100%' }}
    />
  </div>
);
}

export default MostrarFactura;