
// Fonction pour obtenir la collection 'questions'
function getQuestionsCollection(db) {
    if (!db) {
        throw new Error("La connexion à la base de données n'est pas établie.");
    }
    return db.collection('questions');
}

// Créer une nouvelle question
async function createQuestion(db, questionData) {
    try {
        const collection = getQuestionsCollection(db);

        // Générer un ID de question numérique unique
        const lastQuestion = await collection.find().sort({ questionId: -1 }).limit(1).toArray();
        const newQuestionId = lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;

        questionData.questionId = newQuestionId;

        const result = await collection.insertOne(questionData);
        console.log('Nouvelle question créée avec l\'ID :', newQuestionId);
        return newQuestionId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la question : ${error.message}`);
    }
}

// Récupérer une question par ID
async function getQuestionById(db, questionId) {
    try {
        const collection = getQuestionsCollection(db);
        const question = await collection.findOne({ questionId });
        if (!question) {
            throw new Error(`Aucune question trouvée avec l'ID : ${questionId}`);
        }
        return question;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la question: ${error.message}`);
        throw error;
    }
}

// Récupérer les questions par ID d'enquête
async function getQuestionsBySurveyId(db, surveyId) {
    try {
        const collection = getQuestionsCollection(db);
        const questions = await collection.find({ surveyId }).toArray();
        if (questions.length === 0) {
            console.log(`Aucune question trouvée pour l'enquête avec l'ID : ${surveyId}`);
        }
        return questions;
    } catch (error) {
        console.error(`Erreur lors de la récupération des questions par surveyId: ${error.message}`);
        throw error;
    }
}

// Mettre à jour une question
async function updateQuestion(db, questionId, updateData) {
    try {
        const collection = getQuestionsCollection(db);
        const existingQuestion = await collection.findOne({ questionId });
        if (!existingQuestion) {
            throw new Error(`Aucune question trouvée avec l'ID : ${questionId}`);
        }

        const result = await collection.updateOne(
            { questionId },
            { $set: updateData }
        );
        console.log(`Question avec l'ID ${questionId} mise à jour.`);
        return result.modifiedCount;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la question: ${error.message}`);
        throw error;
    }
}

// Supprimer une question
async function deleteQuestion(db, questionId) {
    try {
        const collection = getQuestionsCollection(db);
        const existingQuestion = await collection.findOne({ questionId });
        if (!existingQuestion) {
            throw new Error(`Aucune question trouvée avec l'ID : ${questionId}`);
        }

        const result = await collection.deleteOne({ questionId });
        console.log(`Question avec l'ID ${questionId} supprimée.`);
        return result.deletedCount;
    } catch (error) {
        console.error(`Erreur lors de la suppression de la question: ${error.message}`);
        throw error;
    }
}

module.exports = {
    getQuestionsCollection, 
    createQuestion,
    getQuestionById,
    getQuestionsBySurveyId,
    updateQuestion,
    deleteQuestion,
};
