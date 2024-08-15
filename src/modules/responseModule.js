const { ObjectId } = require('mongodb');

async function createResponse(db, responseData) {
    const collection = db.collection('responses');
    return collection.insertOne(responseData).then(result => result.insertedId);
}

async function getResponseById(db, responseId) {
    const collection = db.collection('responses');
    return collection.findOne({ _id: new ObjectId(responseId) });
}

async function getResponsesByQuestionId(db, questionId) {
    const collection = db.collection('responses');
    return collection.find({ questionId: new ObjectId(questionId) }).toArray();
}

async function updateResponse(db, responseId, updateData) {
    const collection = db.collection('responses');
    return collection.updateOne(
        { _id: new ObjectId(responseId) },
        { $set: updateData }
    ).then(result => result.modifiedCount);
}

async function deleteResponse(db, responseId) {
    const collection = db.collection('responses');
    return collection.deleteOne({ _id: new ObjectId(responseId) })
        .then(result => result.deletedCount);
}

module.exports = {
    createResponse,
    getResponseById,
    getResponsesByQuestionId,
    updateResponse,
    deleteResponse
};