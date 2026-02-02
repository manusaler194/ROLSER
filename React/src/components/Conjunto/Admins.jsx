import React from 'react';
const AdminsTable = ({ lista }) => (
    <div>
        <h2>Administradores</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(u => (
                    <tr key={u.id_administrador}>
                        <td>{u.id_administrador}</td>
                        <td>{u.nombre} {u.apellidos}</td>
                        <td>{u.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default AdminsTable;