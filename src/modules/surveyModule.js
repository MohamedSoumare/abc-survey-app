const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        const connection = await connectDB();
        db = connection.db;
    }
    return db;
}

// Fonction pour créer une enquête
async function createSurvey(surveyData) {
    await connectOnce();
    try {
        const collection = db.collection('surveys');

        // Attribuer un surveyId unique manuellement
        const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
        const newSurveyId = lastSurvey.length > 0 ? lastSurvey[0].surveyId + 1 : 1;
        surveyData.surveyId = newSurveyId;

        // Vérification si l'enquête existe déjà par surveyId
        const existingSurvey = await collection.findOne({ surveyId: surveyData.surveyId });
        if (existingSurvey) {
            throw new Error(`Une enquête avec le surveyId "${surveyData.surveyId}" existe déjà.`);
        }

        // Insertion de la nouvelle enquête
        const result = await collection.insertOne(surveyData);
        console.log('Nouvelle enquête créée avec succès avec surveyId:', surveyData.surveyId);
        return surveyData.surveyId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'enquête : ${error.message}`);
    }
}

// Fonction pour récupérer une enquête par surveyId
async function getSurveyById(surveyId) {
    await connectOnce();
    try {
        const collection = db.collection('surveys');

        // Recherche de l'enquête par surveyId
        const survey = await collection.findOne({ surveyId: surveyId });
        if (!survey) {
            throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
        }

        console.log('Enquête trouvée:', survey);
        return survey;
    } catch (error) {
        throw new Error(`Erreur lors de la lecture de l'enquête : ${error.message}`);
    }
}

// Fonction pour mettre à jour une enquête par surveyId
async function updateSurvey(surveyId, updateData) {
    await connectOnce();
    try {
        const collection = db.collection('surveys');

        // Mise à jour de l'enquête par surveyId
        const result = await collection.updateOne({ surveyId: surveyId }, { $set: updateData });
        if (result.modifiedCount === 0) {
            throw new Error(`Aucune mise à jour effectuée pour l'enquête avec l'ID ${surveyId}`);
        }

        console.log('Enquête mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'enquête : ${error.message}`);
    }
}

// Fonction pour supprimer une enquête par surveyId
async function deleteSurvey(surveyId) {
    await connectOnce();
    try {
        const collection = db.collection('surveys');

        // Suppression de l'enquête par surveyId
        const result = await collection.deleteOne({ surveyId: surveyId });
        if (result.deletedCount === 0) {
            throw new Error(`Erreur lors de la suppression de l'enquête avec l'ID ${surveyId}`);
        }

        console.log('Enquête supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'enquête : ${error.message}`);
    }
}

module.exports = {
    createSurvey,
    getSurveyById,
    updateSurvey,
    deleteSurvey,
};
