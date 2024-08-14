// const { ObjectId } = require('mongodb');

// class QuestionModule {
//     constructor(db) {
//         this.collection = db.collection('questions');
//     }

//     async createQuestion(questionData) {
//         const result = await this.collection.insertOne(questionData);
//         return result.insertedId;
//     }

//     async getQuestionById(questionId) {
//         return await this.collection.findOne({ _id: new ObjectId(questionId) });
//     }

//     async getQuestionsBySurveyId(surveyId) {
//         return await this.collection.find({ surveyId: new ObjectId(surveyId) }).toArray();
//     }

//     async updateQuestion(questionId, updateData) {
//         const result = await this.collection.updateOne(
//             { _id: new ObjectId(questionId) },
//             { $set: updateData }
//         );
//         return result.modifiedCount;
//     }

//     async deleteQuestion(questionId) {
//         const result = await this.collection.deleteOne({ _id: new ObjectId(questionId) });
//         return result.deletedCount;
//     }
// }

// module.exports = QuestionModule;

const { ObjectId } = require('mongodb');

function createQuestion(db, questionData) {
    const collection = db.collection('questions');
    return collection.insertOne(questionData).then(result => result.insertedId);
}

function getQuestionById(db, questionId) {
    const collection = db.collection('questions');
    return collection.findOne({ _id: new ObjectId(questionId) });
}

function getQuestionsBySurveyId(db, surveyId) {
    const collection = db.collection('questions');
    return collection.find({ surveyId: new ObjectId(surveyId) }).toArray();
}

function updateQuestion(db, questionId, updateData) {
    const collection = db.collection('questions');
    return collection.updateOne(
        { _id: new ObjectId(questionId) },
        { $set: updateData }
    ).then(result => result.modifiedCount);
}

function deleteQuestion(db, questionId) {
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
