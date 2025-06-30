import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);  // State to store characters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:3000/api/characters')  
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data); 
        setLoading(false);  
      })
      .catch((error) => {
        setError('Error fetching characters');
        setLoading(false);
      });
  }, []); 

  // Handle click event to navigate to character details page
  const handleCharacterClick = (id) => {
    navigate(`/character/${id}`);  
  };

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Characters</h2>
      <div>
        {characters.length === 0 ? (
          <div>No characters available</div>
        ) : (
          characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}  
              style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' }}
            >
              {character.name}  {}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CharactersList;
