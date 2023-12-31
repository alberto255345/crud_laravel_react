import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SelectView({ chave, name, handleDDIChange, select }) {
  const [paises, setPaises] = useState([]);
  const apiUrl = import.meta.env.APP_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pais`);
        setPaises(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos países:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const novoDDI = event.target.value;
    // Chame a função handleDDIChange com o novo valor do DDI
    handleDDIChange(novoDDI);
  };

  return (
    <>
      <select name={name} value={select} onChange={handleChange}>
        {paises.map(pais => (
          <option key={pais.ID} value={pais.ID}>
            {pais.NOME_PAIS}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectView;
