import React from "react";
import { useAuth } from "../../context/AuthContext";

const MostrarPerfil = () => {
  const { user, role } = useAuth();

  // 1. PROTECCIÓN CONTRA NULL: Si el contexto aún está cargando, mostramos un mensaje
  // Esto evita que React explote al intentar leer user.id_administrador
  if (!user || !role) {
      return (
          <div className="w-full h-screen flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 font-bold text-xl animate-pulse">Cargando perfil...</p>
          </div>
      );
  }

  // 2. Normalizamos el rol por si tiene mayúsculas o espacios
  const rolNormalizado = role.toLowerCase().trim();

  // 3. Asignación del ID correcta para todos los roles
  // ... resto del código ...
  let userId;
  if (rolNormalizado === 'clientevip') userId = user.id_clientevip;
  else if (rolNormalizado === 'cliente') userId = user.id_cliente;
  else if (rolNormalizado === 'comercial') userId = user.id_comercial;
  else if (rolNormalizado === 'administrador' || rolNormalizado === 'admin') userId = user.id_administrador;
  
  // ✅ AÑADIMOS 'encargadoalmacen' AQUÍ
  else if (rolNormalizado === 'encargado_almacen' || rolNormalizado === 'encargado' || rolNormalizado === 'encargadoalmacen') userId = user.id_encargado; 
  
  else userId = user.id;
  // ... resto del código ...

  console.log("Datos Listos -> Rol:", rolNormalizado, "| ID:", userId);

  const urlIframe = `http://54.221.244.244/mostrar/perfil/${rolNormalizado}/${userId}`;

  return (
    <div className="w-full h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl h-[85vh] shadow-2xl rounded-2xl overflow-hidden bg-white">
        <iframe 
            src={urlIframe}
            width="100%" 
            height="100%"
            title="Mi Perfil"
            style={{ border: 'none' }}
        />  
      </div>
    </div>
  );
};

export default MostrarPerfil;