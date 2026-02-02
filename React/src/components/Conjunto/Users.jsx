
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [lista, setLista] = useState([]);

useEffect(() => {
    fetch("http://0.0.0.0/api/administradores")
      .then(res => res.json())
      .then(data => setLista(data))
      .catch(err => console.error("Error:", err));
  }, []);
  return (
    <div>
      {lista.map((persona) => (
        <p key={persona.id_administrador}>
          <strong>{persona.nombre} {persona.apellidos}</strong> - {persona.email}
        </p>
      ))}
    </div>
  );
};

export default Users;