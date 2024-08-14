const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        console.log("Tentative de connexion à MongoDB...");
        await client.connect();
        const db = client.db('surveys_app'); 
        return db;
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        throw error;
    }
}

module.exports = connectDB;
