// const { ObjectId } = require('mongodb');

// class SurveyModule {
//     constructor(db) {
//         this.collection = db.collection('surveys');
//     }

//     async createSurvey(surveyData) {
//         const result = await this.collection.insertOne(surveyData);
//         return result.insertedId;
//     }

//     async getSurveyById(surveyId) {
//         return await this.collection.findOne({ _id: new ObjectId(surveyId) });
//     }

//     async getAllSurveys() {
//         return await this.collection.find({}).toArray();
//     }

//     async updateSurvey(surveyId, updateData) {
//         const result = await this.collection.updateOne(
//             { _id: new ObjectId(surveyId) },
//             { $set: updateData }
//         );
//         return result.modifiedCount;
//     }

//     async deleteSurvey(surveyId) {
//         const result = await this.collection.deleteOne({ _id: new ObjectId(surveyId) });
//         return result.deletedCount;
//     }
// }

// module.exports = SurveyModule;

const { ObjectId } = require('mongodb');

function createSurvey(db, surveyData) {
    const collection = db.collection('surveys');
    return collection.insertOne(surveyData).then(result => result.insertedId);
}

function getSurveyById(db, surveyId) {
    const collection = db.collection('surveys');
    return collection.findOne({ _id: new ObjectId(surveyId) });
}

function getAllSurveys(db) {
    const collection = db.collection('surveys');
    return collection.find({}).toArray();
}

function updateSurvey(db, surveyId, updateData) {
    const collection = db.collection('surveys');
    return collection.updateOne(
        { _id: new ObjectId(surveyId) },
        { $set: updateData }
    ).then(result => result.modifiedCount);
}

function deleteSurvey(db, surveyId) {
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
