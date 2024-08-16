const connectDB = require('./config/database');
const { createSurvey, getSurveyById, updateSurvey, deleteSurvey } = require('./modules/surveyModule');
const { createQuestion, getQuestionById, updateQuestion, deleteQuestion } = require('./modules/questionModule');
const { createResponse, getResponseById, updateResponse, deleteResponse } = require('./modules/responseModule');


async function main() {
    let db, client;

    try {
        const connection = await connectDB();
        db = connection.db;
        client = connection.client;

        // Création d'une enquête
        const newSurvey = {
            title: 'Enquête sur la satisfaction des clients',
            description: 'Veuillez répondre aux questions suivantes.',
            created_at: new Date(),
            createdBy: {
                employeeName: "Mohamed Diop",
                employeeRole: "Analyste"
            },
        };
        const surveyId = await createSurvey(db, newSurvey); 

        console.log('Nouvelle enquête créée avec l\'ID :', surveyId);

        // récupération de l'enquête par ID
        const survey = await getSurveyById(db, surveyId);
        console.log('Enquête récupérée:', survey);

        // mise à jour de l'enquête
        const updatedSurvey = { title: 'Enquête mise à jour' };
        await updateSurvey(db, surveyId, updatedSurvey);
        console.log('Enquête mise  à jour avec succès');

        //  création d'une question
        const newQuestion = {
            surveyId: surveyId, // Utilisez l'ID de l'enquête nouvellement créé
            title: "Comment évalueriez-vous notre service ?",
            type: "rating",
            options: {
                minValue: 1,
                maxValue: 5,
                step: 1
            }
        };
        const questionId = await createQuestion(db, newQuestion);

        console.log('Nouvelle question créée avec l\'ID :', questionId);

        // récupération d'une question par ID
        const question = await getQuestionById(db, questionId);
        console.log('Question récupérée:', question);

        // mise à jour d'une question
        const updatedQuestion = { title: 'Comment évalueriez-vous notre service (mis à jour)?' };
        await updateQuestion(db, questionId, updatedQuestion);
        console.log('Question mise à jour avec succès');

        // suppression d'une question
        await deleteQuestion(db, questionId);
        console.log('Question supprimée avec succès');

        // création d'une réponse
        const newResponse = {
            questionId: questionId, 
            surveyId: surveyId, 
            answer: '1',
            created_at: new Date(),
        };
        const responseId = await createResponse(db, newResponse);
        console.log('Nouvelle réponse créée avec l\'ID :', responseId);

        // récupération d'une réponse par ID
        const response = await getResponseById(db, responseId);
        console.log('Réponse récupérée:', response);

        // mise à jour d'une réponse
        const updatedResponse = { answer: '5' };
        await updateResponse(db, responseId, updatedResponse);
        console.log('Réponse mise à jour avec succès');

        // suppression d'une réponse
        await deleteResponse(db, responseId);
        console.log('Réponse supprimée avec succès');

        // Suppression de l'enquête
        await deleteSurvey(db, surveyId);
        console.log('Enquête supprimée avec succès, ainsi que toutes les questions et réponses associées.');


    } catch (error) {
        console.error('Erreur lors de l\'exécution des opérations CRUD:', error.message);
    } finally {
        if (client) {
            await client.close(); 
        }
    }
}

main().catch(console.error);
