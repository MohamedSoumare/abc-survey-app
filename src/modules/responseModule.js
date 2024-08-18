const connectDB = require('../config/database');

async function getNextResponseId(db) {
    const collection = db.collection('responses');
    const lastResponse = await collection.find().sort({ responseId: -1 }).limit(1).toArray();
    return lastResponse.length > 0 ? lastResponse[0].responseId + 1 : 1;
}

async function createResponse(responseData) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('responses');
        const responseId = await getNextResponseId(db);
        responseData.responseId = responseId;
        const result = await collection.insertOne(responseData);
        return responseId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la réponse : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function getResponseById(responseId) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('responses');
        const response = await collection.findOne({ responseId: responseId });
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la lecture de la réponse : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function updateResponse(responseId, updateData) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('responses');
        const result = await collection.updateOne({ responseId: responseId }, { $set: updateData });
        console.log('Réponse mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la réponse : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function deleteResponse(responseId) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('responses');
        const result = await collection.deleteOne({ responseId: responseId });
        console.log('Réponse supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la réponse : ${error.message}`);
    } finally {
        await client.close();
    }
}

module.exports = {
    createResponse,
    getResponseById,
    updateResponse,
    deleteResponse,
};
