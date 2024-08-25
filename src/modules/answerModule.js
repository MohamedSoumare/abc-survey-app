const connectDB = require('../config/database');

let db = null;

async function connectOnce() {
    if (!db) {
        db = await connectDB();
    }
    return db;
}

async function getNextAnswerId() {
    await connectOnce();
    const collection = db.collection('answers');
    const lastResponse = await collection.find().sort({ answerId: -1 }).limit(1).toArray();
    return lastResponse.length > 0 ? lastResponse[0].answerId + 1 : 1;
}

async function insertAnswer(answerData) {
    await connectOnce();
    const answersCollection = db.collection('answers');
    const surveysCollection = db.collection('surveys');
    const questionsCollection = db.collection('questions');

    // Vérification si le surveyId et le questionId existent
    const existingSurvey = await surveysCollection.findOne({ surveyId: answerData.surveyId });
    if (!existingSurvey) {
        throw new Error(`Aucune enquête trouvée avec l'ID ${answerData.surveyId}`);
    }

    const existingQuestion = await questionsCollection.findOne({ questionId: answerData.questionId });
    if (!existingQuestion) {
        throw new Error(`Aucune question trouvée avec l'ID ${answerData.questionId}`);
    }

    const answerId = await getNextAnswerId();
    answerData.answerId = answerId;
    await answersCollection.insertOne(answerData);
    console.log('Nouvelle réponse créée avec succès');
}

async function getAnswerById(answerId) {
    await connectOnce();
    const collection = db.collection('answers');
    const answer = await collection.findOne({ answerId });
    if (!answer) {
        throw new Error(`Aucune réponse trouvée avec l'ID ${answerId}`);
    }
    return answer;
}

async function getAllAnswers() {
    await connectOnce();
    const collection = db.collection('answers');
    const answers = await collection.find().sort({ answerId: 1 }).toArray(); 
    if (answers.length === 0) {
        console.log('Aucune réponse trouvée.');
    } else {
        console.log('Liste des réponses :', answers);
    }
    return answers;
}

async function updateAnswer(answerId, updatedAnswerData) {
    await connectOnce();
    const answersCollection = db.collection('answers');
    const surveysCollection = db.collection('surveys');
    const questionsCollection = db.collection('questions');

    // Vérification si l'ID de la réponse, du survey et de la question existent
    const existingAnswer = await answersCollection.findOne({ answerId });
    if (!existingAnswer) {
        throw new Error(`Aucune réponse trouvée avec l'ID ${answerId}`);
    }

    if (updatedAnswerData.surveyId) {
        const existingSurvey = await surveysCollection.findOne({ surveyId: updatedAnswerData.surveyId });
        if (!existingSurvey) {
            throw new Error(`Aucune enquête trouvée avec l'ID ${updatedAnswerData.surveyId}`);
        }
    }

    if (updatedAnswerData.questionId) {
        const existingQuestion = await questionsCollection.findOne({ questionId: updatedAnswerData.questionId });
        if (!existingQuestion) {
            throw new Error(`Aucune question trouvée avec l'ID ${updatedAnswerData.questionId}`);
        }
    }

    await answersCollection.updateOne({ answerId }, { $set: updatedAnswerData });
    console.log('Réponse mise à jour avec succès');
}

async function deleteAnswer(answerId) {
    await connectOnce();
    const collection = db.collection('answers');

    // Vérification si l'ID de la réponse existe
    const existingAnswer = await collection.findOne({ answerId });
    if (!existingAnswer) {
        throw new Error(`Aucune réponse trouvée avec l'ID ${answerId}`);
    }
    await collection.deleteOne({ answerId });
    console.log('Réponse supprimée avec succès');
}

module.exports = {
    insertAnswer,
    getAnswerById,
    getAllAnswers, 
    updateAnswer,
    deleteAnswer
};
