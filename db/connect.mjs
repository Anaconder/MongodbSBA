import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

export async function connectToDB() {
  if (db) return db;

  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME || "ecommerceDB");
    console.log("✅ Connected to MongoDB:", db.databaseName);
    return db;
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
}


MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=ecommerceDB
PORT=5000