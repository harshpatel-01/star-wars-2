import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from './components/CharacterList';
import PlanetPage from '../pages/PlanetPage';
import FilmPage from '../pages/FilmPage';
import CharacterPage from '../pages/CharacterPage';

function App() {
  return (
    <Router>
      <div>
        <h1>Star Wars Characters</h1>

        <Routes>  {}
          <Route path="/" element={<CharactersList />} />  {}

          <Route path="/character/:id" element={<CharacterPage/>} />
          <Route path="/film/:id" element = {<FilmPage/>} />
          <Route path="/planet/:id" element = {<PlanetPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
