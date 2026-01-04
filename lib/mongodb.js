// lib/mongodb.js
// Simplified MongoDB connection for better compatibility

import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Simplified options using the Stable API
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the connection is preserved across hot reloads
  let globalWithMongo = global;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, create a new client for each serverless function invocation
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;