const connectDB = require('../config/database');

async function getNextSurveyId(db) {
    try {
        const collection = db.collection('surveys');
        const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
        return lastSurvey.length > 0 ? lastSurvey[0].surveyId + 1 : 1;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du prochain ID d'enquête : ${error.message}`);
    }
}

async function createSurvey(surveyData) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('surveys');
        const surveyId = await getNextSurveyId(db);
        surveyData.surveyId = surveyId;
        const result = await collection.insertOne(surveyData);
        console.log('Nouvelle enquête créée avec succès');
        return result.insertedId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'enquête : ${error.message}`);
    } finally {
        await client.close();
    }
}
async function getBySurveyId(surveyId) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('surveys');
        const survey = await collection.findOne({ surveyId: surveyId });
        return survey;
    } catch (error) {
        throw new Error(`Erreur lors de la lecture de l'enquête : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function updateSurvey(surveyId, updateData) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('surveys');
        const existingSurvey = await collection.findOne({ surveyId: surveyId });
        
        if (!existingSurvey) {
            console.log('Aucune enquête trouvée avec cet ID');
            
        }
        
        const result = await collection.updateOne({ surveyId: surveyId }, { $set: updateData });
        console.log('Enquête mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'enquête : ${error.message}`);
    } finally {
        await client.close();
    }
}

async function deleteSurvey(surveyId) {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('surveys');
        const result = await collection.deleteOne({ surveyId: surveyId });
        console.log('Enquête supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'enquête : ${error.message}`);
    } finally {
        await client.close();
    }
}

module.exports = {
    createSurvey,
    getBySurveyId,
    updateSurvey,
    getAllSurveys,
    deleteSurvey,
};