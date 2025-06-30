import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

export default async function connectToDB() {

    const client = new MongoClient(process.env.MONGO_DB_URL)
    await client.connect()
    const db = client.db(process.env.MONGO_DB )
    const collection = db.collection(process.env.MONGO_DB_COLLECTION)

    return { db, collection, client }
}