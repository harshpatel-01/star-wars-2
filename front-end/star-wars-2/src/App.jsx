import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CharactersList from './components/CharacterList';
import PlanetPage from '../pages/PlanetPage';
import FilmPage from '../pages/FilmPage';
import CharacterPage from '../pages/CharacterPage';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/film/:id" element={<FilmPage />} />
        <Route path="/planet/:id" element={<PlanetPage />} />
      </Routes>
    </Router>
  );
}


export default App;
