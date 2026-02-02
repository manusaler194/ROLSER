import React from 'react';
const EncargadosTable = ({ lista }) => (
    <div>
        <h2>Encargados de Almacén</h2>
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
                    <tr key={u.id_encargado}>
                        <td>{u.id_encargado}</td>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default EncargadosTable;