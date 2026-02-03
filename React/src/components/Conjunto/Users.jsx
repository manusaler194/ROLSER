
import React, { useState, useEffect } from 'react';

import AdminsTable from "./Admins";
import ClientesTable from "./Clientes";
import VipsTable from "./ClientesVips";
import EncargadosTable from "./Encargado";
import ComercialesTable from "./Comercial";
import GestionUsuarios from './GestionUsuarios';
const Users = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
        // CAMBIO IMPORTANTE: Usar '127.0.0.1' o 'localhost' en lugar de '0.0.0.0'
        // para evitar errores de conexión en Windows/Navegadores modernos.
        fetch('http://127.0.0.1:8008/api/users')
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then(json => {
                console.log("Datos cargados correctamente:", json); // Para depurar
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando datos:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Cargando datos...</div>;

    return (
        <div>
            {/* Pasamos 'data' al componente hijo */}
            <GestionUsuarios data={data} />
        </div>
    );
}
  /*<AdminsTable lista={data.admins} />
  <ClientesTable lista={data.clientes} />
  <VipsTable lista={data.vips} />
  <EncargadosTable lista={data.encargados} />
  <ComercialesTable lista={data.comerciales} />*/

export default Users;