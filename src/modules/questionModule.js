const connectDB = require('../config/database');

let db = null;  // Variable pour stocker la connexion à la base de données

async function connectOnce() {
    if (!db) {
        const connection = await connectDB();
        db = connection.db;
    }
    return db;
}

// Fonction pour obtenir le prochain ID de question
async function getNextQuestionId() {
    await connectOnce();  
    const collection = db.collection('questions');
    
    // Récupération de la dernière question triée par ID décroissant
    const lastQuestion = await collection.find().sort({ questionId: -1 }).limit(1).toArray();
    
    // Si une question existe, l'ID suivant est celui de la dernière question + 1, sinon 1
    return lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;
}

// Fonction pour créer une question
async function createQuestion(questionData) {
    await connectOnce();  
    try {
        const collection = db.collection('questions');
        
        // Génération d'un nouvel ID pour la question
        const questionId = await getNextQuestionId();
        questionData.questionId = questionId;
        
        // Insertion de la nouvelle question dans la base de données
        const result = await collection.insertOne(questionData);
        console.log('Nouvelle question créée avec succès');
        return questionId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la question : ${error.message}`);
    }
}

// Fonction pour récupérer une question par ID
async function getQuestionById(questionId) {
    await connectOnce();  
    try {
        const collection = db.collection('questions');
        
        // Recherche de la question par ID
        const question = await collection.findOne({ questionId: questionId });
        
        // Si aucune question n'est trouvée, une erreur est renvoyée
        if (!question) {
            console.log(`Aucune question trouvée avec l'ID ${questionId}`);
            throw new Error(`Aucune question trouvée avec l'ID ${questionId}`);
        }

        // Affichage de la question trouvée
        console.log('Question trouvée:', question);
        return question;
    } catch (error) {
        console.error(`Erreur lors de la lecture de la question : ${error.message}`);
        throw new Error(`Erreur lors de la lecture de la question : ${error.message}`);
    }
}

// Fonction pour mettre à jour une question
async function updateQuestion(questionId, updateData) {
    await connectOnce();  
    try {
        const collection = db.collection('questions');
        
        // Mise à jour des données de la question
        const result = await collection.updateOne({ questionId: questionId }, { $set: updateData });
        
        // Si aucune question n'est mise à jour, une erreur est renvoyée
        if (result.modifiedCount === 0) {
            throw new Error(`Aucune mise à jour effectuée pour la question avec l'ID ${questionId}`);
        }

        console.log('Question mise à jour avec succès');
        return result.modifiedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la question : ${error.message}`);
    }
}

// Fonction pour supprimer une question
async function deleteQuestion(questionId) {
    await connectOnce();  
    try {
        const collection = db.collection('questions');
        
        // Suppression de la question de la base de données
        const result = await collection.deleteOne({ questionId: questionId });
        
        // Si aucune question n'est supprimée, une erreur est renvoyée
        if (result.deletedCount === 0) {
            throw new Error(`Erreur lors de la suppression de la question avec l'ID ${questionId}`);
        }

        console.log('Question supprimée avec succès');
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la question : ${error.message}`);
    }
}

// Exportation des fonctions relatives aux questions
module.exports = {
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};
