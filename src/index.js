const { createSurvey, updateSurvey, deleteSurvey, getSurveyById } = require('./modules/surveyModule');
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
            question: [],
        };
        const surveyId = await createSurvey(newSurvey);

        // Lecture d'une enquête
        await getSurveyById(surveyId);
        // Mise à jour d'une enquête
        const updatedSurveyData = { title: 'Enquête mise à jour sur la satisfaction' };
        await updateSurvey(surveyId, updatedSurveyData);
        // Suppression d'une enquête
        await deleteSurvey(surveyId);

        // Création d'une question
        const newQuestion = {
            surveyId: surveyId,
            title: 'Comment évaluez-vous notre service ?',
            type: 'rating',
            options: {
                minValue: 1,
                maxValue: 5,
                step: 1
            },
            response: [],
        };
        const questionId = await createQuestion(newQuestion);

        // Lecture d'une question
        await getQuestionById(questionId);
        // Mise à jour d'une question
        const updatedQuestionData = { title: 'Comment évaluez-vous notre service mis à jour ?' };
        await updateQuestion(questionId, updatedQuestionData);

        // Suppression d'une question
        await deleteQuestion(questionId);

        // Création d'une réponse
        const newResponse = {
            surveyId: surveyId,
            questionId: questionId,
            title: 'Très satisfait',
        };
        const responseId = await createResponse(newResponse);
        // Lecture d'une réponse
        await getResponseById(responseId);
        // Mise à jour d'une réponse
        const updatedResponseData = { title: 'Qualité du service' };
        await updateResponse(responseId, updatedResponseData);
        // Suppression d'une réponse
        await deleteResponse(responseId);

    } catch (error) {
        console.error('Erreur :', error.message);
    }
}
main();
