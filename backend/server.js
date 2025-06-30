import express from 'express';
import cors from 'cors';
import connectToDB from './config/connectToDB.js'; 
import characterRoutes from './routes/charactersRoutes.js'; 

const PORT = process.env.PORT || 5000; 
const app = express();

app.use(cors()); 
app.use(express.json());  

const { db } = await connectToDB();

app.get("/", (req, res) => {
    res.send("Welcome to the Star Wars API!");
});

app.use('/api/characters', characterRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
