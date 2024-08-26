const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        db = await connectDB();
    }
    return db;
}

async function insertQuestion(questionData) {
    try {

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

        await questionsCollection.insertOne(questionData);
        console.log('Nouvelle question créée avec succès');
    } catch (error) {
        console.error(`Erreur lors de l'insertion de la question : ${error.message}`);
        throw error;
    }
}

async function getQuestionById(questionId) {
    try {
        await connectOnce();
        const collection = db.collection('questions');
        const question = await collection.findOne({ questionId });
        if(!question) {
            throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
        }
        console.log('Question trouvée :', question);
        return question;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la question : ${error.message}`);
        throw error;
    }
}

async function getAllQuestions() {
    try {
        await connectOnce();
        const collection = db.collection('questions');
        const questions = await collection.find().sort({ questionId: 1 }).toArray();
        if (questions.length === 0) {
            console.log('Aucune question trouvée.');
        } else {
            console.log('Liste des questions :', questions);
        }
        return questions;
    } catch (error) {
        console.error(`Erreur lors de la récupération des questions : ${error.message}`);
        throw error;
    }
}

async function updateQuestion(questionId, updatedQuestionData) {
    try {
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
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la question : ${error.message}`);
        throw error;
    }
}

async function deleteQuestion(questionId) {
    try {
        await connectOnce();
        const collection = db.collection('questions');

        // Vérification si l'ID de la question existe
        const existingQuestion = await collection.findOne({ questionId });
        if (!existingQuestion) {
            throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
        }

        await collection.deleteOne({ questionId });
        console.log('Question supprimée avec succès');
    } catch (error) {
        console.error(`Erreur lors de la suppression de la question : ${error.message}`);
        throw error;
    }
}


module.exports = {
    insertQuestion,
    getQuestionById,
    getAllQuestions, 
    updateQuestion,
    deleteQuestion
};
