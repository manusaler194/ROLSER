
import React, { useState, useEffect } from 'react';

import AdminsTable from "./AdminsTable";
import ClientesTable from "./ClientesTable";
import VipsTable from "./ClientesVips";
import EncargadosTable from "./Encargado";
import ComercialesTable from "./Comercial";
import GestionUsuarios from './GestionUsuarios';
const Users = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

   

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