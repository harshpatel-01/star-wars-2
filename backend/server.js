import express from 'express'
import cors from 'cors'
import connectToTB from './config/connectToDB.js'

const PORT = process.env.PORT
const app = express()

const { db, collection } = await connectToTB()


app.get("/", async (req,res) => {
    res.json({ message: 'GET request successful!' });
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})