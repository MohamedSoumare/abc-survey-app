const { createSurvey, updateSurvey, deleteSurvey, getSurveyById } = require('./modules/surveyModule');
const { createQuestion, getQuestionById, updateQuestion, deleteQuestion } = require('./modules/questionModule');
const { createResponse, getResponseById, updateResponse, deleteResponse } = require('./modules/responseModule');

async function main() {
    try {
        // Création d'une enquête
        const surveyId = await createSurvey({
            title: 'Enquête sur la satisfaction des clients',
            description: 'Veuillez répondre aux questions suivantes.',
            createdAt: new Date(),
            createdBy: {
                employeeName: "Mohamed Soumaré",
                employeeRole: "Analyste"
            },
        });

        // Lecture d'une enquête
        await getSurveyById(1);
        
        // Mise à jour d'une enquête
        await updateSurvey(1, {
            title: 'Enquête mise à jour sur la satisfaction',
            description: 'Veuillez corriger les questions suivantes.',
            createdAt: new Date(),
            createdBy: {
                employeeName: "Oumar Ba",
                employeeRole: "Consultant",
            }
        });
        
        // Création d'une question
        const questionId = await createQuestion({
            surveyId: surveyId,
            title: 'Comment évaluez-vous notre service ?',
            type: 'rating',
            options: {
                minValue: 1,
                maxValue: 5,
                step: 1
            },
        });
        
        // Lecture d'une question
        await getQuestionById(1);

        // Mise à jour d'une question
        await updateQuestion(1, {
            title: 'Comment évaluez-vous notre service mis à jour?',
            type: 'rating',
            options: {
                minValue: 1,
                maxValue: 5,
                step: 1
            },
        });
        
        // Création d'une réponse
        await createResponse({
            surveyId: surveyId,
            questionId: questionId,
            title: 'Très satisfait',
        });
        
        // Lecture d'une réponse
        await getResponseById(1);
       
        // Mise à jour d'une réponse
        await updateResponse(1, {
            title: 'Satisfait Ali',
        });
      
        // Suppression des données créées

        await deleteResponse(1);

        await deleteQuestion(1);
        
        await deleteSurvey(1);
       
    } catch (error) {
        console.error('Erreur :', error.message);
    }
}

main();
