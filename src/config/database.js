const { MongoClient } = require('mongodb');

async function connectDB() {
    const uri = 'mongodb://localhost:27017/'; 
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connecté à la base de données');
    const db = client.db('survey_app'); 
    return { db, client };
}

module.exports = connectDB;
