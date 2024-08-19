const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        const connection = await connectDB();
        db = connection.db;
    }
    return db;
}

// Fonction pour obtenir le prochain ID de question
async function getNextQuestionId() {
    await connectOnce();
    const collection = db.collection('questions');
    const lastQuestion = await collection.find().sort({ questionId: -1 }).limit(1).toArray();
    return lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;
}

// Fonction pour créer une question
async function createQuestion(questionData) {
    await connectOnce();
    try {
        const collection = db.collection('questions');

        // Vérification si la question existe déjà pour cette enquête
        const existingQuestion = await collection.findOne({ surveyId: questionData.surveyId, questionId: questionData.questionId });
        if (existingQuestion) {
            throw new Error(`Une question avec l'identifiant "${questionData.questionId}" existe déjà pour cette enquête.`);
        }

        // Génération d'un nouvel ID pour la question
        const questionId = await getNextQuestionId();
        questionData.questionId = questionId;

        // Insertion de la nouvelle question
        const result = await collection.insertOne(questionData);
        console.log('Nouvelle question créée avec succès');
        return questionId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la question : ${error.message}`);
    }
}

// Fonction pour récupérer une question par ID
async function getQuestionById(questionId) {
    await connectOnce();
    try {
        const collection = db.collection('questions');

        const question = await collection.findOne({ questionId: questionId });
        if (!question) {
            throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
        }

        console.log('Question trouvée:', question);
        return question;
    } catch (error) {
        throw new Error(`Erreur lors de la lecture de la question : ${error.message}`);
    }
}

// Fonction pour mettre à jour une question
async function updateQuestion(questionId, updateData) {
    await connectOnce();
    try {
        const collection = db.collection('questions');

        const question = await collection.findOne({ questionId: questionId });
        if (!question) {
            throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
        }

        const result = await collection.updateOne({ questionId: questionId }, { $set: updateData });
        if (result.modifiedCount === 0) {
            throw new Error(`Aucune mise à jour effectuée pour la question avec l'ID ${questionId}`);
        }

        console.log('Question mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la question : ${error.message}`);
    }
}

// Fonction pour supprimer une question
async function deleteQuestion(questionId) {
    await connectOnce();
    try {
        const collection = db.collection('questions');

        const question = await collection.findOne({ questionId: questionId });
        if (!question) {
            throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
        }

        const result = await collection.deleteOne({ questionId: questionId });
        if (result.deletedCount === 0) {
            throw new Error(`Erreur lors de la suppression de la question avec l'ID ${questionId}`);
        }

        console.log('Question supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la question : ${error.message}`);
    }
}

module.exports = {
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};
