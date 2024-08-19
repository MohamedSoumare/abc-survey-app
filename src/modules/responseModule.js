const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        const connection = await connectDB();
        db = connection.db;
    }
    return db;
}

// Fonction pour obtenir le prochain ID de réponse
async function getNextResponseId() {
    await connectOnce();
    const collection = db.collection('responses');
    const lastResponse = await collection.find().sort({ responseId: -1 }).limit(1).toArray();
    return lastResponse.length > 0 ? lastResponse[0].responseId + 1 : 1;
}

// Fonction pour créer une réponse
async function createResponse(responseData) {
    await connectOnce();
    try {
        const collection = db.collection('responses');

        // Vérification si la réponse existe déjà pour cette question
        const existingResponse = await collection.findOne({ surveyId: responseData.surveyId, questionId: responseData.questionId, responseId: responseData.responseId });
        if (existingResponse) {
            throw new Error(`Une réponse avec l'identifiant "${responseData.responseId}" existe déjà pour cette question.`);
        }

        // Génération d'un nouvel ID pour la réponse
        const responseId = await getNextResponseId();
        responseData.responseId = responseId;

        // Insertion de la nouvelle réponse
        const result = await collection.insertOne(responseData);
        console.log('Nouvelle réponse créée avec succès');
        return responseId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la réponse : ${error.message}`);
    }
}

// Fonction pour récupérer une réponse par ID
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
        throw new Error(`Erreur lors de la lecture de la réponse : ${error.message}`);
    }
}

// Fonction pour mettre à jour une réponse
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
        throw new Error(`Erreur lors de la mise à jour de la réponse : ${error.message}`);
    }
}

// Fonction pour supprimer une réponse
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
        throw new Error(`Erreur lors de la suppression de la réponse : ${error.message}`);
    }
}

module.exports = {
    createResponse,
    getResponseById,
    updateResponse,
    deleteResponse,
};
