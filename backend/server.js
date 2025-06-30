import express from 'express'
import cors from 'cors'
import connectToDB from './config/connectToDB.js'

const PORT = process.env.PORT
const app = express()

const { db } = await connectToDB()


app.get("/", async (req,res) => {

    const characters =  db.collection('characters')
    const name = await characters.find({}).toArray()

    res.json(name);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})