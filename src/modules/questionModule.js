const { ObjectId } = require('mongodb');

async function createQuestion(db, questionData) {
    const collection = db.collection('questions');
    return collection.insertOne(questionData).then(result => result.insertedId);
}

async function getQuestionById(db, questionId) {
    const collection = db.collection('questions');
    return collection.findOne({ _id: new ObjectId(questionId) });
}

async function getQuestionsBySurveyId(db, surveyId) {
    const collection = db.collection('questions');
    return collection.find({ surveyId: new ObjectId(surveyId) }).toArray();
}

async function updateQuestion(db, questionId, updateData) {
    const collection = db.collection('questions');
    return collection.updateOne(
        { _id: new ObjectId(questionId) },
        { $set: updateData }
    ).then(result => result.modifiedCount);
}

async function deleteQuestion(db, questionId) {
    const collection = db.collection('questions');
    return collection.deleteOne({ _id: new ObjectId(questionId) })
        .then(result => result.deletedCount);
}

module.exports = {
    createQuestion,
    getQuestionById,
    getQuestionsBySurveyId,
    updateQuestion,
    deleteQuestion
};
