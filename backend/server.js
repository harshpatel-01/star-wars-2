import express from 'express'
import cors from 'cors'
import connectToDB from './config/connectToDB.js'
import planetsRoutes from './routes/planetRoutes.js'

const PORT = process.env.PORT
const app = express()

const { db } = await connectToDB()

app.use('/api/planets', planetsRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})