import React from "react";
import { useParams } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";


const MostrarFactura = () => {
  const { user, role } = useAuth();
  const { id } = useParams(); 

  return (
    <div className="w-full h-screen  flex items-center justify-center p-4">
      
      <div className="w-full max-w-2xl h-[90vh] shadow-2xl rounded-xl overflow-hidden">
        <iframe src={`http://localhost/render-factura/${id}`} title={`Factura ${id}`}className="w-full h-full border-none"style={{ display: 'block' }}allowFullScreen/>
      </div>

    </div>
  );
}

export default MostrarFactura;