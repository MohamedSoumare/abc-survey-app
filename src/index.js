const connectDB = require('./config/database');
const { createSurvey } = require('./modules/surveyModule');
const { createQuestion} = require('./modules/questionModule');
const { createResponse} = require('./modules/responseModule');

async function main() {
    try {
        console.log("Tentative de connexion à MongoDB...");
        const db = await connectDB();
        console.log("Connexion réussie à MongoDB !");

        // Création d'une nouvelle enquête
        const newSurveyId = await createSurvey(db, {
            name: "Enquête de Satisfaction 001",
            description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
            createdAt: new Date(),
            createdBy: {
                employeeName: "Mohamed Diop",
                employeeRole: "Analyste"
            }
        });

        // Attribution d'une ID spécifique pour les questions et les réponses
        const customQuestionId1 = 1; 
        const customQuestionId2 = 2; 

        // Création et ajout de questions à l'enquête
        if (newSurveyId) {

            // Question 1
            await createQuestion(db, {
                questionId: customQuestionId1,
                surveyId: newSurveyId,
                title: "Comment évalueriez-vous notre service ?",
                type: "rating",
                options: {
                    minValue: 1,
                    maxValue: 5,
                    step: 1
                }
            });

            // Question 2
            await createQuestion(db, {
                questionId: customQuestionId2,
                surveyId: newSurveyId,
                title: "Recommanderiez-vous notre service à d'autres personnes ?",
                type: "boolean"
            });

            console.log(`Questions créées avec des IDs spécifiques: ${customQuestionId1}, ${customQuestionId2}`);

            // Réponses pour la question 1
            await createResponse(db, {
                responseId: 1,
                questionId: customQuestionId1,
                title: "Très satisfait"
            });

            await createResponse(db, {
                responseId: 2, 
                questionId: customQuestionId1,
                title: "Satisfait"
            });

            // Réponses pour la question 2
            await createResponse(db, {
                responseId: 3,
                questionId: customQuestionId2,
                title: "Oui"
            });

            await createResponse(db, {
                responseId: 4, 
                questionId: customQuestionId2,
                title: "Non"
            });

            console.log("Réponses ajoutées aux questions avec des IDs spécifiques.");
        } else {
            console.log("Échec de la création de l'enquête.");
        }

    } catch (error) {
        console.error("Une erreur est survenue :", error);
    } finally {
        process.exit();
    }
}

main().then(() => console.log("Programme terminé."));