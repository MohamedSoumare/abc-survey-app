const { ObjectId } = require('mongodb');

async function createSurvey(db, surveyData) {
    const collection = db.collection('surveys');
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

async function updateSurvey(db, surveyId, updateData) {
    const collection = db.collection('surveys');
    return collection.updateOne(
        { _id: new ObjectId(surveyId) },
        { $set: updateData }
    ).then(result => result.modifiedCount);
}

async function deleteSurvey(db, surveyId) {
    const collection = db.collection('surveys');
    return collection.deleteOne({ _id: new ObjectId(surveyId) })
        .then(result => result.deletedCount);
}

module.exports = {
    createSurvey,
    getSurveyById,
    getAllSurveys,
    updateSurvey,
    deleteSurvey
};
