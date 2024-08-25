const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        db = await connectDB();
    }
    return db;
}

async function getNextQuestionId() {
    await connectOnce();
    const collection = db.collection('questions');
    const lastQuestion = await collection.find().sort({ questionId: -1 }).limit(1).toArray();
    return lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;
}

async function insertQuestion(questionData) {
    await connectOnce();
    const questionsCollection = db.collection('questions');
    const surveysCollection = db.collection('surveys');

    // Vérification si l'ID de la question ou de l'enquête existe déjà
    const existingQuestion = await questionsCollection.findOne({ questionId: questionData.questionId });
    if (existingQuestion) {
        throw new Error(`Une question avec l'ID ${questionData.questionId} existe déjà.`);
    }

    const existingSurvey = await surveysCollection.findOne({ surveyId: questionData.surveyId });
    if (!existingSurvey) {
        throw new Error(`Aucune enquête trouvée avec l'ID ${questionData.surveyId}`);
    }

    const questionId = await getNextQuestionId();
    questionData.questionId = questionId;
    await questionsCollection.insertOne(questionData);
    console.log('Nouvelle question créée avec succès');
}

async function getQuestionById(questionId) {
    await connectOnce();
    const collection = db.collection('questions');
    const question = await collection.findOne({ questionId });
    if (!question) {
        throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
    }
    return question;
}

async function getAllQuestions() {
    await connectOnce();
    const collection = db.collection('questions');
    const questions = await collection.find().sort({ questionId: 1 }).toArray(); 
    if (questions.length === 0) {
        console.log('Aucune question trouvée.');
    } else {
        console.log('Liste des questions :', questions);
    }
    return questions;
}

async function updateQuestion(questionId, updatedQuestionData) {
    await connectOnce();
    const questionsCollection = db.collection('questions');
    const surveysCollection = db.collection('surveys');

    // Vérification si l'ID de la question ou de l'enquête existe
    const existingQuestion = await questionsCollection.findOne({ questionId });
    if (!existingQuestion) {
        throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
    }

    if (updatedQuestionData.surveyId) {
        const existingSurvey = await surveysCollection.findOne({ surveyId: updatedQuestionData.surveyId });
        if (!existingSurvey) {
            throw new Error(`Aucune enquête trouvée avec l'ID ${updatedQuestionData.surveyId}`);
        }
    }

    await questionsCollection.updateOne({ questionId }, { $set: updatedQuestionData });
    console.log('Question mise à jour avec succès');
}

async function deleteQuestion(questionId) {
    await connectOnce();
    const collection = db.collection('questions');

    // Vérification si l'ID de la question existe
    const existingQuestion = await collection.findOne({ questionId });
    if (!existingQuestion) {
        throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
    }

    await collection.deleteOne({ questionId });
    console.log('Question supprimée avec succès');
}

module.exports = {
    insertQuestion,
    getQuestionById,
    getAllQuestions, 
    updateQuestion,
    deleteQuestion
};
