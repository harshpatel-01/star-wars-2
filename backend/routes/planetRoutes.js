import express from 'express'
import connectToDB from '../config/connectToDB.js'
import { ObjectId } from 'mongodb'

const { db } = await connectToDB()

const planetsCollection = db.collection('planets')
const fp_collection = db.collection('films_planets')
const fc_collection = db.collection('films_characters')

const router = express.Router()



router.get('/', async (req, res) => {

    try {
        
        const planets = await planetsCollection.find({}).toArray()
 
        if (!planets) {
            return res.status(404).json({ message: 'Planets not found' });
        }
 
        res.json(planets)

    } catch (err) {
        console.error('Error fetching all planets :', err); 
        res.status(500).json({ message: 'Error fetching', error: err });
    }
    
})

router.get('/:id', async (req, res) => {

    const { id } = req.params
    try {

        const planet = await planetsCollection.findOne({id: parseInt(id)})
        
        if (!planet) {
            return res.status(404).json({ message: 'Planet not found' });
        }
 
        res.json(planet)

    } catch (err) {
        console.error('Error fetching planet by ID :', err); 
        res.status(500).json({ message: 'Error fetching', error: err });
    }
})

router.get('/:id/films', async (req, res) =>{

    const { id } = req.params

    try{

        const planetToFilmsMapping = await fp_collection.find({planet_id : parseInt(id)}).toArray()       
        const allFilms = await db.collection('films').find().toArray();

        // Extracts filmID into 1D array
        const filmIds = planetToFilmsMapping.map(item => item.film_id);
        // Matches list of filmId to films database
        const matchingFilms = allFilms.filter(film => filmIds.includes(film.id));

        res.json(matchingFilms)

    }catch(err){
        console.error("Error fetching films to planets", err)
        res.status(500).json({message: "Error fetching", Error: err})
    }

})

router.get('/:id/characters', async (req, res) =>{

    const { id } = req.params

    try{

        const planetToFilmsMapping = await fp_collection.find({planet_id : parseInt(id)}).toArray()       

        // Extracts filmID into 1D array
        const filmIds = planetToFilmsMapping.map(item => item.film_id);
        
        // Map filmId to charcter film mapping
        const films = await fc_collection.find({ film_id: { $in: filmIds } }).toArray();

        // character_ID from mapping
        const charIds = films.map(item => item.character_id);

        const allCharcters = await db.collection('characters').find().toArray();

        // // Matches list of filmId to films database
        const matchingCharacter = allCharcters.filter(film => charIds.includes(film.id));

        res.json({matchingCharacter})

    }catch(err){
        console.error("Error fetching character to planets", err)
        res.status(500).json({message: "Error fetching", Error: err})
    }

})

export default router