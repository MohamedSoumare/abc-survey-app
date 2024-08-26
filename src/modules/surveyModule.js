const connectDB = require('../config/database');

let db = null;
async function connectOnce() {
    if (!db) {
        db = await connectDB();
    }
    return db;
}

async function insertSurvey(surveyData) {
    try {

        await connectOnce();
        const collection = db.collection('surveys');
        
        // Vérifier si un surveyId existe déjà
        const existingSurvey = await collection.findOne({ surveyId: surveyData.surveyId });
        if (existingSurvey) {
            throw new Error(`Une enquête avec l'ID ${surveyData.surveyId} existe déjà.`);
        }

        // Insérer la nouvelle enquête
        const result = await collection.insertOne(surveyData);
        console.log('Nouvelle enquête créée avec succès');

    } catch (error) {
        console.error(`Erreur lors de l'insertion de l'enquête : ${error.message}`);
        throw error;
    }
}

async function getSurveyById(surveyId) {
    try {
        await connectOnce();
        const collection = db.collection('surveys');
        const survey = await collection.findOne({ surveyId });
        if (!survey) {
            throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
        }
        console.log('Enquête trouvée :', survey);
        return survey;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'enquête : ${error.message}`);
        throw error;
    }
}

async function getAllSurveys() {
    try {

        await connectOnce();
        const collection = db.collection('surveys');
        const surveys = await collection.find().sort({ surveyId: 1 }).toArray();
        console.log('Liste des enquêtes :', surveys); 
        return surveys;

    } catch (error) {
        console.error(`Erreur lors de la récupération des enquêtes : ${error.message}`);
        throw error;
    }
}

async function updateSurvey(surveyId, updateData) {
    try{

        await connectOnce();
        const collection = db.collection('surveys');

        // Vérification si l'enquête existe
        const existingSurvey = await collection.findOne({ surveyId });
        if (!existingSurvey) {
            throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
        }
        // Mise à jour de l'enquête
        const result = await collection.updateOne({ surveyId }, { $set: updateData });
        console.log('Enquête mise à jour avec succès');
        return result.modifiedCount;

    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'enquête : ${error.message}`);
        throw error;
    }
}

async function deleteSurvey(surveyId) {
    try {
        await connectOnce();
        const collection = db.collection('surveys');

        // Vérification si l'enquête existe
        const existingSurvey = await collection.findOne({ surveyId });
        if (!existingSurvey) {
            throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
        }
        // Suppression de l'enquête
        const result = await collection.deleteOne({ surveyId });
        console.log('Enquête supprimée avec succès');
        return result.deletedCount;

    } catch (error) {
        console.error(`Erreur lors de la suppression de l'enquête : ${error.message}`);
        throw error;
    }
}

module.exports = {
    insertSurvey,
    getSurveyById,
    getAllSurveys,
    updateSurvey,
    deleteSurvey
};
