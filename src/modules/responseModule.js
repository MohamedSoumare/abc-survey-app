// const { ObjectId } = require('mongodb');

// class ResponseModule {
//     constructor(db) {
//         this.collection = db.collection('answers');
//     }

//     async createResponse(responseData) {
//         const result = await this.collection.insertOne(responseData);
//         return result.insertedId;
//     }

//     async getResponseById(responseId) {
//         return await this.collection.findOne({ _id: new ObjectId(responseId) });
//     }

//     async getResponsesByQuestionId(questionId) {
//         return await this.collection.find({ questionId: new ObjectId(questionId) }).toArray();
//     }

//     async updateResponse(responseId, updateData) {
//         const result = await this.collection.updateOne(
//             { _id: new ObjectId(responseId) },
//             { $set: updateData }
//         );
//         return result.modifiedCount;
//     }

//     async deleteResponse(responseId) {
//         const result = await this.collection.deleteOne({ _id: new ObjectId(responseId) });
//         return result.deletedCount;
//     }
// }

// module.exports = ResponseModule;

const { ObjectId } = require('mongodb');

function createResponse(db, responseData) {
    const collection = db.collection('answers');
    return collection.insertOne(responseData).then(result => result.insertedId);
}

function getResponseById(db, responseId) {
    const collection = db.collection('answers');
    return collection.findOne({ _id: new ObjectId(responseId) });
}

function getResponsesByQuestionId(db, questionId) {
    const collection = db.collection('answers');
    return collection.find({ questionId: new ObjectId(questionId) }).toArray();
}

function updateResponse(db, responseId, updateData) {
    const collection = db.collection('answers');
    return collection.updateOne(
        { _id: new ObjectId(responseId) },
        { $set: updateData }
    ).then(result => result.modifiedCount);
}

function deleteResponse(db, responseId) {
    const collection = db.collection('answers');
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
