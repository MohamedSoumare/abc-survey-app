const connectDB = require('../config/database');

let db = null; 

async function connectOnce() {
    if (!db) {
        const connection = await connectDB();
        db = connection.db;      
    }
    return db;
}

// Fonction pour obtenir le prochain ID d'enquête
async function getNextSurveyId() {
    try {
        const db = await connectOnce();
        const collection = db.collection('surveys');
        
        // Récupération de la dernière enquête triée par ID décroissant
        const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
        // Si une enquête existe, l'ID suivant est celui de la dernière enquête + 1, sinon 1
        return lastSurvey.length > 0 ? lastSurvey[0].surveyId + 1 : 1;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du prochain ID d'enquête : ${error.message}`);
    }
}

// Fonction pour créer une enquête
async function createSurvey(surveyData) {
    try {
        const db = await connectOnce();
        const collection = db.collection('surveys');

        // Vérification si une enquête avec le même ID existe déjà
        const existingSurvey = await collection.findOne({ surveyId: surveyData.surveyId });
        if (existingSurvey) {
            console.log(`Une enquête avec l'ID ${surveyData.surveyId} existe déjà`);
            throw new Error(`Une enquête avec l'ID ${surveyData.surveyId} existe déjà`);
        }

        // Génération d'un nouvel ID pour l'enquête
        const surveyId = await getNextSurveyId();
        surveyData.surveyId = surveyId;

        // Insertion de la nouvelle enquête dans la base de données
        const result = await collection.insertOne(surveyData);
        console.log('Nouvelle enquête créée avec succès :', result.insertedId);
        return result.insertedId;
    } catch (error) {
        console.error(`Erreur lors de la création de l'enquête : ${error.message}`);
        throw new Error(`Erreur lors de la création de l'enquête : ${error.message}`);
    }
}

// Fonction pour récupérer une enquête par ID
async function getBySurveyId(surveyId) {
    try {
        const db = await connectOnce();
        const collection = db.collection('surveys');

        // Vérification si l'enquête existe dans la base de données
        const survey = await collection.findOne({ surveyId: surveyId });
        if (!survey) {
            console.log(`Aucune enquête trouvée avec l'ID ${surveyId}`);
            throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
        }

        console.log('Enquête trouvée:', survey);
        return survey;
    } catch (error) {
        console.error(`Erreur lors de la lecture de l'enquête : ${error.message}`);
        throw new Error(`Erreur lors de la lecture de l'enquête : ${error.message}`);
    }
}

// Fonction pour mettre à jour une enquête
async function updateSurvey(surveyId, updateData) {
    try {
        const db = await connectOnce();
        const collection = db.collection('surveys');

        // Vérification si l'enquête à mettre à jour existe
        const existingSurvey = await collection.findOne({ surveyId: surveyId });
        if (!existingSurvey) {
            console.log(`Aucune enquête trouvée avec l'ID ${surveyId}`);
            throw new Error('Aucune enquête trouvée avec cet ID');
        }
        
        // Mise à jour des données de l'enquête
        const result = await collection.updateOne({ surveyId: surveyId }, { $set: updateData });
        console.log('Enquête mise à jour avec succès', result.modifiedCount);
        return result.modifiedCount;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'enquête : ${error.message}`);
        throw new Error(`Erreur lors de la mise à jour de l'enquête : ${error.message}`);
    }
}
// Fonction pour supprimer une enquête
async function deleteSurvey(surveyId) {
    try {
        const db = await connectOnce();
        const collection = db.collection('surveys');

        // Vérification si l'enquête avec l'ID spécifié existe
        const survey = await collection.findOne({ surveyId: surveyId });
        if (!survey) {
            console.log(`Aucune enquête trouvée avec l'ID ${surveyId}`);
            throw new Error(`Aucune enquête trouvée avec l'ID ${surveyId}`);
        }

        // Suppression de l'enquête de la base de données
        const result = await collection.deleteOne({ surveyId: surveyId });
        if (result.deletedCount === 0) {
            console.log(`Erreur lors de la suppression de l'enquête avec l'ID ${surveyId}`);
            throw new Error(`Erreur lors de la suppression de l'enquête avec l'ID ${surveyId}`);
        }

        console.log('Enquête supprimée avec succès', result.deletedCount);
        return result.deletedCount;
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'enquête : ${error.message}`);
        throw new Error(`Erreur lors de la suppression de l'enquête : ${error.message}`);
    }
}

// Exportation des fonctions relatives aux enquêtes
module.exports = {
    createSurvey,
    getBySurveyId,
    updateSurvey,
    deleteSurvey,
};
