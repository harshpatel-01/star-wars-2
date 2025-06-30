import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from './components/CharacterList';

function App() {
  return (
    <Router>
      <div>
        <h1>Star Wars Characters</h1>

        <Routes>  {}
          <Route path="/" element={<CharactersList />} />  {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
