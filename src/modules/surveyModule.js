function getSurveysCollection(db) {
    if (!db) {
        throw new Error("La connexion à la base de données n'est pas établie.");
    }
    return db.collection('surveys');
}

async function getNextSurveyId(db) {
    try {
        const collection = getSurveysCollection(db);
        const lastSurvey = await collection.find().sort({ surveyId: -1 }).limit(1).toArray();
        return lastSurvey.length > 0 ? lastSurvey[0].surveyId + 1 : 1;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du prochain ID d'enquête : ${error.message}`);
    }
}

async function createSurvey(db, surveyData) {
    try {
        const collection = getSurveysCollection(db);
        const newSurveyId = await getNextSurveyId(db);
        surveyData.surveyId = newSurveyId;

        const result = await collection.insertOne(surveyData);
        console.log(`Nouvelle enquête créée avec l'ID : ${newSurveyId}`);
        return newSurveyId; 
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'enquête : ${error.message}`);
    }
}

async function getSurveyById(db, surveyId) {
    try {
        const collection = getSurveysCollection(db);
        const survey = await collection.findOne({ surveyId }); 

        if (!survey) {
            throw new Error(`Aucune enquête trouvée avec l'ID : ${surveyId}`);
        }

        console.log(`Enquête trouvée avec l'ID : ${surveyId}`);
        return survey;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'enquête : ${error.message}`);
    }
}

async function getAllSurveys(db) {
    try {
        const collection = getSurveysCollection(db);
        return await collection.find({}).toArray();
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de toutes les enquêtes : ${error.message}`);
    }
}

async function updateSurvey(db, surveyId, updatedData) {
    try {
        const collection = getSurveysCollection(db);

        const result = await collection.updateOne(
            { surveyId },
            { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
            throw new Error(`Aucune enquête trouvée avec l'ID : ${surveyId}`);
        }

        console.log(`Enquête avec l'ID ${surveyId} mise à jour.`);
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'enquête : ${error.message}`);
    }
}

async function deleteSurvey(db, surveyId) {
    try {
        const collection = getSurveysCollection(db);

        const result = await collection.deleteOne({ surveyId });

        if (result.deletedCount === 0) {
            throw new Error(`Aucune enquête trouvée avec l'ID : ${surveyId}`);
        }

        console.log(`Enquête avec l'ID ${surveyId} supprimée.`);
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'enquête : ${error.message}`);
    }
}

module.exports = {
    createSurvey,
    getSurveyById,
    getAllSurveys,
    updateSurvey,
    deleteSurvey,
};