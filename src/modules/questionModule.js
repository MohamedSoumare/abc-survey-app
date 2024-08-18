const connectDB = require('../config/database');

async function getNextQuestionId(db) {
    const collection = db.collection('questions');
    const lastQuestion = await collection.find().sort({ questionId: -1 }).limit(1).toArray();
    return lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;
}

async function createQuestion(questionData) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('questions');
        const questionId = await getNextQuestionId(db);
        questionData.questionId = questionId;
        const result = await collection.insertOne(questionData);
        return questionId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la question : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function getQuestionById(questionId) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('questions');
        const question = await collection.findOne({ questionId: questionId });
        return question;
    } catch (error) {
        throw new Error(`Erreur lors de la lecture de la question : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function updateQuestion(questionId, updateData) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('questions');
        const result = await collection.updateOne({ questionId: questionId }, { $set: updateData });
        console.log('Question mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la question : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function deleteQuestion(questionId) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('questions');
        const result = await collection.deleteOne({ questionId: questionId });
        console.log('Question supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la question : ${error.message}`);
    } finally {
        await client.close();
    }
}

module.exports = {
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};
