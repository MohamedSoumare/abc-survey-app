const { createSurvey,updateSurvey, deleteSurvey, getBySurveyId } = require('./modules/surveyModule');
const { createQuestion, getQuestionById, updateQuestion, deleteQuestion } = require('./modules/questionModule');
const { createResponse, getResponseById, updateResponse, deleteResponse } = require('./modules/responseModule');

async function main() {
    try {
        // Création d'une enquête
        const newSurvey = {
            title: 'Enquête sur la satisfaction des clients',
            description: 'Veuillez répondre aux questions suivantes.',
            createdAt: new Date(),
            createdBy: {
                employeeName: "Mohamed Soumaré",
                employeeRole: "Analyste"
            },
        };
         await createSurvey(newSurvey);
        // Lecture d'une enquête
         await getBySurveyId(1);
        // Mise à jour d'une enquête
        const updatedSurveyData = { title: 'Enquête mise à jour sur la satisfaction' };
        await updateSurvey(1, updatedSurveyData);
        // Suppression d'une enquête
         await deleteSurvey(1);
       
        // Création d'une question
        const newQuestion = {
            surveyId: 1,
            title: 'Comment évaluez-vous notre service ?',
            type: 'rating',
            options:{
                minValue: 1,
                maxValue: 5,
                step: 1
            },
            createdAt: new Date(),
        };
        await createQuestion(newQuestion);
        // Lecture d'une question
        await getQuestionById(1);
        // Mise à jour d'une question
        const updatedQuestionData = { title: 'Comment évaluez-vous notre service mis à jour ?' };
        await updateQuestion(1, updatedQuestionData);
        //Suppression d'une question
        await deleteQuestion(1);

        // Création d'une réponse
        const newResponse = {
            surveyId: 1,
            questionId: 1,
            title: 'Très satisfait',
            createdAt: new Date()
        };
        await createResponse(newResponse);
        // Lecture d'une réponse
        await getResponseById(1);
        // Mise à jour d'une réponse
        const updatedResponseData = {title: 'Qualité du service' };
         await updateResponse(1, updatedResponseData);
        // Suppression d'une réponse
        await deleteResponse(1);
       
    } catch (error) {
        console.error('Erreur :', error.message);
    }
}
main();
