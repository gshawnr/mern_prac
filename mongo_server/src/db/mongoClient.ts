import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_URI;
const client = new MongoClient(URL as string);

let db: Db;
export async function initMongo() {
  await client.connect();
  db = client.db(process.env.DB_NAME as string);
  console.log("Connected to DB");
}

export function getDB() {
  if (!db) {
    throw new Error("mongoClient error: DB not connected");
  }
  return db;
}
