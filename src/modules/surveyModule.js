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

    // Vérifier si une enquête avec cet ID existe déjà
    const existingSurvey = await collection.findOne({ surveyId: surveyData.surveyId });
    if (existingSurvey) {
        console.log(`Une enquête avec l'ID ${surveyData.surveyId} existe déjà.`);
        return null; 
    }

    const newSurveyId = await getNextSurveyId(db);
    surveyData.surveyId = newSurveyId;

    const result = await collection.insertOne(surveyData);
    console.log(`Nouvelle enquête créée avec l'ID : ${newSurveyId}`);
    return result.insertedId;
}

async function getSurveyById(db, surveyId) {
    const collection = db.collection('surveys');
    const survey = await collection.findOne({ surveyId: surveyId });

    if (!survey) {
        console.log(`Aucune enquête trouvée avec l'ID : ${surveyId}`);
        return null;
    }

    console.log(`Enquête trouvée avec l'ID : ${surveyId}`);
    return survey;
}

async function getAllSurveys(db) {
    const collection = db.collection('surveys');
    return collection.find({}).toArray();
}

async function updateSurvey(db, surveyId, updatedData) {
    const collection = db.collection('surveys');
    const result = await collection.updateOne({ surveyId: surveyId }, { $set: updatedData });
    return result.modifiedCount;
}

async function deleteSurvey(db, surveyId) {
    const collection = db.collection('surveys');
    // return collection.deleteOne({ surveyId: surveyId }).then(result => result.deletedCount);
    const result = await collection.deleteOne({ surveyId: surveyId });
    return result.deletedCount;    
}

module.exports = {
    createSurvey,
    getSurveyById,
    getAllSurveys,
    updateSurvey,
    deleteSurvey,
};
