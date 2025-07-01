import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FilmPage = () => {
  const [film, setFilm] = useState(null);
  const [filmCharacters, setfilmCharacters] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {

        const filmRes = await fetch(
          `http://localhost:3000/api/films/${id}`
        );
        const filmData = await filmRes.json();
        setFilm(characterData);

        const filmsCharacterRes = await fetch(
          `http://localhost:3000/api/films/${id}/characters`
        );
        const filmsCharacterData = await filmsCharacterRes.json();
        setfilmCharacters(filmsCharacterData);
      };

      fetchData();
      
    } catch (error) {
      console.error("Failed to fetch films data : ", error);
    }
  }, []);

  return <div>FILM</div>;
};

export default FilmPage;
