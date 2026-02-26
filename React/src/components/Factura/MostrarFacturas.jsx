import React from "react";
import { useAuth } from "../../context/AuthContext";

const MostrarFacturas = () => {
  const { user, role } = useAuth();

  const userId = role === 'clientevip' ? user.id_clientevip : role === "cliente" ? user.id_cliente : user.id_comercial;

  const urlIframe = `http://localhost/mostrar/facturas/${role}/${userId}`;
  console.log("Cargando iframe en:", urlIframe);

  return (
    <div className="w-full h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl h-[85vh] shadow-2xl rounded-2xl overflow-hidden bg-white">
        <iframe 
            src={urlIframe}
            width="100%" 
            height="100%"
            title="Facturas PDF"
            style={{ border: 'none' }}
        />  
      </div>
    </div>
  );
};

export default MostrarFacturas;