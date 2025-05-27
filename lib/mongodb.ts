import { MongoClient, type Db, type Collection, MongoClientOptions } from "mongodb"

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "web_scraper"
const collectionName = "structured_articles"

const options: MongoClientOptions = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 50,
  retryWrites: true,
  retryReads: true,
}

let clientPromise: Promise<MongoClient>
let client: MongoClient
let db: Db
let collection: Collection

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export async function connectToDatabase() {
  try {
    if (!client) {
      client = await clientPromise
    }

    if (!db) {
      db = client.db(dbName)
    }

    if (!collection) {
      collection = db.collection(collectionName)
    }

    // Test the connection
    await db.command({ ping: 1 })
    console.log("Connected successfully to MongoDB server")

    return { client, db, collection }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Failed to connect to the database. Please check if MongoDB is running.")
  }
}

export interface Article {
  _id: string
  original_id: string
  title: string
  url: string
  structured_blog: string
  processed_at: Date
  keywords: string[]
  metadata?: any
}
