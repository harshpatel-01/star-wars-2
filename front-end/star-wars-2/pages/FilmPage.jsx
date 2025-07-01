import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

const FilmPage = () => {

  const [film, setFilm] = useState(null);
  const [filmCharacters, setfilmCharacters] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); 


   // Handle click event to navigate to character details page
   const handleCharacterClick = (id) => {
    navigate(`/character/${id}`);  
  };

  useEffect(() => {
    try {
      const fetchData = async () => {

        const filmRes = await fetch(
          `http://localhost:3000/api/films/${id}`
        );
        const filmData = await filmRes.json();
        setFilm(filmData);
    

        const filmsCharacterRes = await fetch(
          `http://localhost:3000/api/films/${id}/characters`
        );
        const filmsCharacterData = await filmsCharacterRes.json();
        setfilmCharacters(filmsCharacterData);
        // console.log(filmsCharacterData)
      };

      fetchData();
      
    } catch (error) {
      console.error("Failed to fetch films data : ", error);
    }
  }, []);

  return (

    <div>
      
    <div>
      <h5>{film?.opening_crawl}</h5>

      <div className="flex justify-between p-8">
          <div>
            {film?.director}
          </div>
          <div>
            {film?.release_date}
          </div>
      </div>
    </div>

    <div>

      <h5>Appearing Characters: </h5>

      <div>
        {filmCharacters.map((item) => (
          <button onClick={() => handleCharacterClick(item.id)}> {item.name} </button>
        ))}
      </div>
    </div>
  </div>

  )
  
 
};

export default FilmPage;
