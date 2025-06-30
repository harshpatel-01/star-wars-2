import express from 'express';
import connectToDB from '../config/connectToDB.js';  

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { db } = await connectToDB();  
        const characters = db.collection('characters');  
        const data = await characters.find({}).toArray(); 
        res.json(data); 
    } catch (err) {
        console.error('Error fetching characters:', err); 
        res.status(500).json({ message: 'Error fetching characters', error: err });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;  
    try {
        const { db } = await connectToDB();  
        const characters = db.collection('characters');
        const character = await characters.findOne({ id: parseInt(id) });

        if  (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json(character);  
    } catch (err) {
        console.error('Error fetching character by ID:', err); 
        res.status(500).json({ message: 'Error fetching character', error: err });
    }
});


router.get('/:id/films', async (req, res) => {
    const { id } = req.params;  
    try {
        const { db } = await connectToDB();  
        const filmCharacters = db.collection('films_characters'); // Junction table for films and characters
        const films = db.collection('films'); 

        // Find all film mappings where 'character_id' matches the character's 'id'
        const filmMappings = await filmCharacters.find({ character_id: parseInt(id) }).toArray();

        if (filmMappings.length === 0) {
            return res.status(404).json({ message: 'No films found for this character' });
        }

        // Extract all the film_ids from the filmMappings
        const filmIds = filmMappings.map(mapping => mapping.film_id);

        // Query the films collection for each film_id
        const filmsData = [];
        for (const filmId of filmIds) {
            const film = await films.findOne({ id: filmId });
            if (film) {
                filmsData.push(film); // Add film to the array if found
            }
        }

    res.json(filmsData);
    } catch (err) {
        console.error('Error fetching films for character:', err);
        res.status(500).json({ message: 'Error fetching films', error: err });
    }
});

export default router;


