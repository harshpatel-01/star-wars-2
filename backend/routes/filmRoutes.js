import express from 'express';
import connectToDB from '../config/connectToDB.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const { db } = await connectToDB();  
        const films = db.collection('films');
        const data = await films.find({}).toArray();  
        res.json(data); 
    } catch (err) {
        console.error('Error fetching films:', err); 
        res.status(500).json({ message: 'Error fetching films', error: err });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;  
    try {
        const { db } = await connectToDB();
        const films = db.collection('films');
        const film = await films.findOne({ id: parseInt(id) }); 

        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }

        res.json(film);  
    } catch (err) {
        console.error('Error fetching film by ID:', err);
        res.status(500).json({ message: 'Error fetching film', error: err });
    }
});


router.get('/:id/characters', async (req, res) => {
    const { id } = req.params; 
    try {
        const { db } = await connectToDB();  
        const filmCharacters = db.collection('films_characters');  // Junction table for the films and characters
        const characters = db.collection('characters');  

        // Find all entries in the film_characters table that match the film's ID
        const filmCharacterMappings = await filmCharacters.find({ film_id: parseInt(id) }).toArray();

        if (filmCharacterMappings.length === 0) {
            return res.status(404).json({ message: 'No characters found for this film' });
        }

        // Extract all the character_ids from the junction table
        const characterIds = filmCharacterMappings.map(mapping => mapping.character_id);

        // Query the characters table for all characters with the corresponding character_ids
        const characterData = await characters.find({ id: { $in: characterIds } }).toArray();

        res.json(characterData);
    } catch (err) {
        console.error('Error fetching characters for the film:', err);
        res.status(500).json({ message: 'Error fetching characters', error: err });
    }
});


router.get('/:id/planets', async (req, res) => {
    const { id } = req.params;  
    try {
        const { db } = await connectToDB();  
        const filmPlanets = db.collection('films_planets');  // Junction table for films and planets
        const planets = db.collection('planets'); 

        // Find all entries in the films_planets table that match the film's ID
        const filmPlanetMappings = await filmPlanets.find({ film_id: parseInt(id) }).toArray();

        if (filmPlanetMappings.length === 0) {
            return res.status(404).json({ message: 'No planets found for this film' });
        }

        // Extract all the planet_ids from the junction table
        const planetIds = filmPlanetMappings.map(mapping => mapping.planet_id);

        // Query the planets table for each planet_id 
        const planetData = [];
        for (const planetId of planetIds) {
            const planet = await planets.findOne({ id: planetId });
            if (planet) {
                planetData.push(planet);  // Add planet to the result array if found
            }
        }

        res.json(planetData);
    } catch (err) {
        console.error('Error fetching planets for the film:', err);
        res.status(500).json({ message: 'Error fetching planets', error: err });
    }
});

export default router;

