import  { useState, useEffect } from 'react';
import UserCard from '../components/UserCard/UserCard';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const mappedData = data.map(user => ({
          id: user.id,
          name: user.name,
          role: user.id % 2 === 0 ? 'Senior Developer' : 'Junior Analyst', // MOCK
          status: user.id % 3 === 0 ? 'Active' : 'Away', // MOCK
          avatarUrl: `https://i.pravatar.cc/150?img=${user.id}`, // MOCK
        }));
        
        setUsers(mappedData);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <h2>Cargando usuarios...</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red' }}>Error al cargar los datos: {error}</h2>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      
      <input
        type="text"
        placeholder="Filtrar usuarios por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
        aria-label="Filtro de nombres"
      />

      <div className="user-list-container">
        {filteredUsers.length === 0 && <p>No se encontraron usuarios que coincidan con la búsqueda.</p>}
        
        {filteredUsers.map(user => (
          <UserCard 
            key={user.id} 
            {...user} 
            layout="full" 
          />
        ))}
      </div>
    </div>
  );
};

export default Users;