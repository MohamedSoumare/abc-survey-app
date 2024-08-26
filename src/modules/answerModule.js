const connectDB = require('../config/database');

let db = null;
async function connectOnce() {
    if (!db) {
        db = await connectDB();
    }
    return db;
}

async function insertAnswer(answerData) {
    try {
        await connectOnce();
        const answersCollection = db.collection('answers');
        const questionsCollection = db.collection('questions');

        // Vérification si le questionId existe
        const existingQuestion = await questionsCollection.findOne({ questionId: answerData.questionId });
        if (!existingQuestion) {
            throw new Error(`Aucune question trouvée avec l'ID ${answerData.questionId}`);
        }

        // Vérifier si un answerId existe déjà
        const existingAnswer = await answersCollection.findOne({ answerId: answerData.answerId });
        if (existingAnswer) {
            throw new Error(`Une réponse avec l'ID ${answerData.answerId} existe déjà.`);
        }

        // Insérer la nouvelle réponse
        await answersCollection.insertOne(answerData);
        console.log('Nouvelle réponse créée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la réponse:', error.message);
    }
}

async function getAnswerById(answerId) {
    try {
        await connectOnce();
        const collection = db.collection('answers');
        const answer = await collection.findOne({ answerId });
        if (!answer) {
            throw new Error(`Aucune réponse trouvée avec l'ID ${answerId}`);
        }
        console.log('Reponse trouvée :', answer);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération de la réponse par ID:', error.message);
    }
}

async function getAllAnswers() {
    try {
        await connectOnce();
        const collection = db.collection('answers');
        const answers = await collection.find().sort({ answerId: 1 }).toArray();
        if (answers.length === 0) {
            console.log('Aucune réponse trouvée.');
        } else {
            console.log('Liste des réponses :', answers);
        }
        return answers;
    } catch (error) {
        console.error('Erreur lors de la récupération de toutes les réponses:', error.message);
    }
}

async function updateAnswer(answerId, updatedAnswerData) {
    try {
        await connectOnce();
        const answersCollection = db.collection('answers');
        const questionsCollection = db.collection('questions');

        // Vérification si l'ID de la réponse et de la question existent
        const existingAnswer = await answersCollection.findOne({ answerId });
        if (!existingAnswer) {
            throw new Error(`Aucune réponse trouvée avec l'ID ${answerId}`);
        }

        if (updatedAnswerData.questionId) {
            const existingQuestion = await questionsCollection.findOne({ questionId: updatedAnswerData.questionId });
            if (!existingQuestion) {
                throw new Error(`Aucune question trouvée avec l'ID ${updatedAnswerData.questionId}`);
            }
        }

        await answersCollection.updateOne({ answerId }, { $set: updatedAnswerData });
        console.log('Réponse mise à jour avec succès');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réponse:', error.message);
    }
}

async function deleteAnswer(answerId) {
    try {
        await connectOnce();
        const collection = db.collection('answers');

        // Vérification si l'ID de la réponse existe
        const existingAnswer = await collection.findOne({ answerId });
        if (!existingAnswer) {
            throw new Error(`Aucune réponse trouvée avec l'ID ${answerId}`);
        }
        await collection.deleteOne({ answerId });
        console.log('Réponse supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de la réponse:', error.message);
    }
}

module.exports = {
    insertAnswer,
    getAnswerById,
    getAllAnswers,
    updateAnswer,
    deleteAnswer
};
