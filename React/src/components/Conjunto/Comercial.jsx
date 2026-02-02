import React from 'react';
const ComercialesTable = ({ lista }) => (
    <div>
        <h2>Comerciales</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Contacto</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(u => (
                    <tr key={u.id_comercial}>
                        <td>{u.id_comercial}</td>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.contacto}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default ComercialesTable;