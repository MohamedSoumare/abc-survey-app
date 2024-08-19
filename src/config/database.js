const { MongoClient } = require('mongodb');

async function connectDB() {
    const uri = 'mongodb://localhost:27017/'; 
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connexion à la base de données établie avec mongodb');
    const db = client.db('abc_survey_app'); 
    return { db, client };
}

module.exports = connectDB;

