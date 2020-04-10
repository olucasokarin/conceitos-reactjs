import React, { useState, useEffect } from "react";
import axios from 'axios';
import api from './services/api';
import "./styles.css";



function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    try{
      console.log(id);
      
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id))

    }catch(err){
       alert('erro ao deletar ' + err)
      }
  }

  useEffect(()=>{
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}>{repository.title}
        
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        
        </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
