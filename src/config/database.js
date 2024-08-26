const { MongoClient } = require('mongodb');

async function connectDB() {
    const uri = 'mongodb://localhost:27017/'; 
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connexion à la base de données établie avec MongoDB');
    const db = client.db('abc_survapp'); 
    return db;
}

module.exports = connectDB;
