const connectDB = require('../config/database');

let db = null;
async function connectOnce() {
    if (!db) {
        db = await connectDB();
    }
    return db;
}

async function insertSurvey(surveyData) {
    await connectOnce();
    const collection = db.collection('surveys');
    const existingSurvey = await collection.findOne({ surveyId: surveyData.surveyId });
    if (existingSurvey) {
        throw new Error(`Une enquête avec l'ID ${surveyData.surveyId} existe déjà.`);
    }
    const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
    const newSurveyId = lastSurvey.length > 0 ? lastSurvey[0].surveyId + 1 : 1;
    surveyData.surveyId = newSurveyId;
    await collection.insertOne(surveyData);
    console.log('Nouvelle enquête créée avec succès');
}

async function getSurveyById(surveyId) {
    await connectOnce();
    const collection = db.collection('surveys');
    const survey = await collection.findOne({ surveyId });
    if (!survey) {
        throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
    }
    return survey;
}

async function getAllSurveys() {
    await connectOnce();
    const collection = db.collection('surveys');
    const surveys = await collection.find().sort({ surveyId: 1 }).toArray(); 
    return surveys;
}

async function updateSurvey(surveyId, updateData) {
    await connectOnce();
    const collection = db.collection('surveys');
    const existingSurvey = await collection.findOne({ surveyId });
    if (!existingSurvey) {
        throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
    }
    const result = await collection.updateOne({ surveyId }, { $set: updateData });
    console.log('Enquête mise à jour avec succès');
    return result.modifiedCount;
}

async function deleteSurvey(surveyId) {
    await connectOnce();
    const collection = db.collection('surveys');
    const existingSurvey = await collection.findOne({ surveyId });
    if (!existingSurvey) {
        throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
    }
    const result = await collection.deleteOne({ surveyId });
    console.log('Enquête supprimée avec succès');
    return result.deletedCount;
}

module.exports = {
    insertSurvey,
    getSurveyById,
    getAllSurveys, 
    updateSurvey,
    deleteSurvey
};
