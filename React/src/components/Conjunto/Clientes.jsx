import React from 'react';
const ClientesTable = ({ lista }) => (
    <div>
        <h2>Clientes</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(u => (
                    <tr key={u.id_cliente}>
                        <td>{u.id_cliente}</td>
                        <td>{u.nombre}</td>
                        <td>{u.correo}</td>
                        <td>{u.telefono}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default ClientesTable;