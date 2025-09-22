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

// choose database & export
let DB = connectToDB.db('sample_training');

export default DB;