import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/charactersRoutes.js'; 
import filmRoutes from './routes/filmRoutes.js'; 
import planetRoutes from './routes/planetRoutes.js'; 

const PORT = process.env.PORT;
const app = express();

app.use(cors()); 
app.use(express.json());  

app.get("/", (req, res) => {
    res.send("Welcome to the Star Wars API!");
});

// Use the routes
app.use('/api/characters', characterRoutes);  
app.use('/api/films', filmRoutes);  
app.use('/api/planets', planetRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
