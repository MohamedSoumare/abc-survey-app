const { getQuestionsCollection } = require('./questionModule');


// Fonction pour obtenir la collection 'responses'
function getResponsesCollection(db) {
    if (!db) {
        throw new Error("La connexion à la base de données n'est pas établie.");
    }
    return db.collection('responses');
}

// Créer une nouvelle réponse
async function createResponse(db, responseData) {
    try {
        const collection = getResponsesCollection(db);
        const questionCollection = getQuestionsCollection(db);

        // Vérifier si la question existe
        const questionExists = await questionCollection.findOne({ questionId: responseData.questionId });
        if (!questionExists) {
            throw new Error(`Aucune question trouvée avec l'ID : ${responseData.questionId}`);
        }

        // Générer un ID de réponse numérique unique
        const lastResponse = await collection.find().sort({ responseId: -1 }).limit(1).toArray();
        const newResponseId = lastResponse.length > 0 ? lastResponse[0].responseId + 1 : 1;

        responseData.responseId = newResponseId;

        await collection.insertOne(responseData);
        console.log(`Nouvelle réponse créée avec l'ID : ${newResponseId}`);
        return newResponseId;
    } catch (error) {
        console.error(`Erreur lors de la création de la réponse: ${error.message}`);
        throw error;
    }
}

// Récupérer une réponse par ID
async function getResponseById(db, responseId) {
    try {
        const collection = getResponsesCollection(db);
        const response = await collection.findOne({ responseId });
        if (!response) {
            throw new Error(`Aucune réponse trouvée avec l'ID : ${responseId}`);
        }
        return response;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la réponse: ${error.message}`);
        throw error;
    }
}

// Récupérer les réponses par ID de question
async function getResponsesByQuestionId(db, questionId) {
    try {
        const collection = getResponsesCollection(db);
        const responses = await collection.find({ questionId }).toArray();
        if (responses.length === 0) {
            console.log(`Aucune réponse trouvée pour la question avec l'ID : ${questionId}`);
        }
        return responses;
    } catch (error) {
        console.error(`Erreur lors de la récupération des réponses par questionId: ${error.message}`);
        throw error;
    }
}

// Mettre à jour une réponse
async function updateResponse(db, responseId, updateData) {
    try {
        const collection = getResponsesCollection(db);
        const existingResponse = await collection.findOne({ responseId });
        if (!existingResponse) {
            throw new Error(`Aucune réponse trouvée avec l'ID : ${responseId}`);
        }

        const result = await collection.updateOne(
            { responseId },
            { $set: updateData }
        );
        console.log(`Réponse avec l'ID ${responseId} mise à jour.`);
        return result.modifiedCount;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la réponse: ${error.message}`);
        throw error;
    }
}

// Supprimer une réponse
async function deleteResponse(db, responseId) {
    try {
        const collection = getResponsesCollection(db);
        const existingResponse = await collection.findOne({ responseId });
        if (!existingResponse) {
            throw new Error(`Aucune réponse trouvée avec l'ID : ${responseId}`);
        }

        const result = await collection.deleteOne({ responseId });
        console.log(`Réponse avec l'ID ${responseId} supprimée.`);
        return result.deletedCount;
    } catch (error) {
        console.error(`Erreur lors de la suppression de la réponse: ${error.message}`);
        throw error;
    }
}

module.exports = {
    createResponse,
    getResponseById,
    getResponsesByQuestionId,
    updateResponse,
    deleteResponse,
};
