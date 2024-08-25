const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        const connection = await connectDB();
        db = connection.db;
    }
    return db;
}

async function checkSurveyExists(surveyId) {
    await connectOnce();
    const survey = await db.collection('surveys').findOne({ surveyId: surveyId });
    if (!survey) {
        throw new Error(`L'enquête avec l'ID ${surveyId} est introuvable.`);
    }
}

async function checkQuestionExists(questionId) {
    await connectOnce();
    const question = await db.collection('questions').findOne({ questionId: questionId });
    if (!question) {
        throw new Error(`La question avec l'ID ${questionId} est introuvable.`);
    }
}

async function getNextResponseId() {
    await connectOnce();
    const collection = db.collection('responses');
    const lastResponse = await collection.find().sort({ responseId: -1 }).limit(1).toArray();
    return lastResponse.length > 0 ? lastResponse[0].responseId + 1 : 1;
}

async function createResponse(responseData) {
    await connectOnce();
    try {
        const collection = db.collection('responses');

        await checkSurveyExists(responseData.surveyId);
        await checkQuestionExists(responseData.questionId);

        const existingResponse = await collection.findOne({ surveyId: responseData.surveyId, questionId: responseData.questionId, responseId: responseData.responseId });
        if (existingResponse) {
            throw new Error(`Une réponse avec l'identifiant "${responseData.responseId}" existe déjà pour cette question.`);
        }

        const responseId = await getNextResponseId();
        responseData.responseId = responseId;

        const result = await collection.insertOne(responseData);
        console.log('Nouvelle réponse créée avec succès');
        return responseId;
    } catch (error) {
        console.error(`Erreur lors de la création de la réponse : ${error.message}`);
        throw error;
    }
}

async function getResponseById(responseId) {
    await connectOnce();
    try {
        const collection = db.collection('responses');
        const response = await collection.findOne({ responseId: responseId });
        if (!response) {
            throw new Error(`Aucune réponse trouvée avec l'ID ${responseId}`);
        }

        console.log('Réponse trouvée:', response);
        return response;
    } catch (error) {
        console.error(`Erreur lors de la lecture de la réponse : ${error.message}`);
        throw error;
    }
}

async function updateResponse(responseId, updateData) {
    await connectOnce();
    try {
        const collection = db.collection('responses');
        const response = await collection.findOne({ responseId: responseId });
        if (!response) {
            throw new Error(`Aucune réponse trouvée avec l'ID ${responseId}`);
        }

        const result = await collection.updateOne({ responseId: responseId }, { $set: updateData });
        if (result.modifiedCount === 0) {
            throw new Error(`Aucune mise à jour effectuée pour la réponse avec l'ID ${responseId}`);
        }

        console.log('Réponse mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la réponse : ${error.message}`);
        throw error;
    }
}

async function deleteResponse(responseId) {
    await connectOnce();
    try {
        const collection = db.collection('responses');
        const response = await collection.findOne({ responseId: responseId });
        if (!response) {
            throw new Error(`Aucune réponse trouvée avec l'ID ${responseId}`);
        }

        const result = await collection.deleteOne({ responseId: responseId });
        if (result.deletedCount === 0) {
            throw new Error(`Erreur lors de la suppression de la réponse avec l'ID ${responseId}`);
        }

        console.log('Réponse supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        console.error(`Erreur lors de la suppression de la réponse : ${error.message}`);
        throw error;
    }
}

module.exports = {
    createResponse,
    getResponseById,
    updateResponse,
    deleteResponse,
};
