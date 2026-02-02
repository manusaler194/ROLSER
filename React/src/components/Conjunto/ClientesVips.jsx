import React from 'react';
const VipsTable = ({ lista }) => (
    <div>
        <h2>Clientes VIP</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(u => (
                    <tr key={u.id_clientevip}>
                        <td>{u.id_clientevip}</td>
                        <td>{u.nombre}</td>
                        <td>{u.correo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default VipsTable;