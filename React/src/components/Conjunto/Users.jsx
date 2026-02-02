
import React, { useState, useEffect } from 'react';

import AdminsTable from "./Admins";
import ClientesTable from "./Clientes";
import VipsTable from "./ClientesVips";
import EncargadosTable from "./Encargado";
import ComercialesTable from "./Comercial";

const Users = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Asegúrate de que esta URL sea la de tu API en PHP
        fetch('http://0.0.0.0/api/users')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => console.error("Error cargando datos:", err));
    }, []);

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            
            <h1>Panel de Control de Usuarios</h1>

            {/* Renderizamos cada componente pasando su lista correspondiente */}
            <AdminsTable lista={data.admins} />
            <ClientesTable lista={data.clientes} />
            <VipsTable lista={data.vips} />
            <EncargadosTable lista={data.encargados} />
            <ComercialesTable lista={data.comerciales} />
        </div>
    );
}

export default Users;