const { ObjectId } = require('mongodb');

// Fonction pour obtenir le prochain ID d'enquête
async function getNextSurveyId(db) {
    const collection = db.collection('surveys');
    const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
    if (lastSurvey.length > 0) {
        return lastSurvey[0].surveyId + 1;
    } else {
        return 1;
    }
}

// Fonction pour créer une nouvelle enquête
async function createSurvey(db, surveyData) {
    const collection = db.collection('surveys');
    const newSurveyId = await getNextSurveyId(db);

    surveyData.surveyId = newSurveyId; 
    return collection.insertOne(surveyData).then(result => result.insertedId);
}

// Fonction pour obtenir une enquête par ID
async function getSurveyById(db, surveyId) {
    const collection = db.collection('surveys');
    return collection.findOne({ surveyId: surveyId });
}

// Fonction pour obtenir toutes les enquêtes
async function getAllSurveys(db) {
    const collection = db.collection('surveys');
    return collection.find({}).toArray();
}

// Fonction pour mettre à jour une enquête
async function updateSurvey(db, surveyId, updatedData) {
    const collection = db.collection('surveys');
    const result = await collection.updateOne({ surveyId: surveyId }, { $set: updatedData });
    return result.modifiedCount;
}

// Fonction pour supprimer une enquête
async function deleteSurvey(db, surveyId) {
    const collection = db.collection('surveys');
    return collection.deleteOne({ surveyId: surveyId }).then(result => result.deletedCount);
}

module.exports = {
    createSurvey,
    getSurveyById,
    getAllSurveys,
    updateSurvey,
    deleteSurvey,
};
