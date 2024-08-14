const { ObjectId } = require('mongodb');

async function getNextSurveyId(db) {
    const collection = db.collection('surveys');
    const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
    if (lastSurvey.length > 0) {
        return lastSurvey[0].surveyId + 1;
    } else {
        return 1;
    }
}

async function createSurvey(db, surveyData) {
    const collection = db.collection('surveys');
    const newSurveyId = await getNextSurveyId(db);

    // Vérifier si l'identifiant existe déjà
    const existingSurvey = await collection.findOne({ surveyId: newSurveyId });
    if (existingSurvey) {
        console.log(`L'enquête avec l'ID ${newSurveyId} existe déjà. Aucun ajout effectué.`);
        return null;
    }

    surveyData.surveyId = newSurveyId; 
    return collection.insertOne(surveyData).then(result => result.insertedId);
}

async function getSurveyById(db, surveyId) {
    const collection = db.collection('surveys');
    return collection.findOne({ _id: new ObjectId(surveyId) });
}

async function getAllSurveys(db) {
    const collection = db.collection('surveys');
    return collection.find({}).toArray();
}

// modules/surveyModule.js

async function updateSurvey(db, surveyId, updatedData) {
    const collection = db.collection('surveys');
    const result = await collection.updateOne({ _id: surveyId }, { $set: updatedData });
    return result.modifiedCount;
}

async function deleteSurvey(db, surveyId) {
    const collection = db.collection('surveys');
    return collection.deleteOne({ _id: new ObjectId(surveyId) })
        .then(result => result.deletedCount);
}


module.exports = {
    createSurvey,
    getAllSurveys,
    deleteSurvey,
    updateSurvey,
};

