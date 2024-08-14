const connectDB = require('./config/database');
const { createSurvey, getAllSurveys, deleteSurvey, updateSurvey } = require('./modules/surveyModule');
const { createQuestion, getQuestionsBySurveyId } = require('./modules/questionModule');
const { createResponse, getResponsesByQuestionId } = require('./modules/responseModule');

async function main() {
    try {
        console.log("Tentative de connexion à MongoDB...");
        const db = await connectDB();
        console.log("Connexion réussie à MongoDB !");

    } catch (error) {
        console.error("Une erreur est survenue :", error);
    } finally {
        process.exit();
    }
}

main().then(() => console.log("Programme terminé."));
