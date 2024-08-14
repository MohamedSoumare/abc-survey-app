const connectDB = require('./config/database');
const { createSurvey, getSurveyById, getAllSurveys } = require('./modules/surveyModule');
const { createQuestion, getQuestionById, getQuestionsBySurveyId } = require('./modules/questionModule');
const { createResponse, getResponseById, getResponsesByQuestionId } = require('./modules/responseModule');

async function main() {
    try {
        console.log("Tentative de connexion à MongoDB...");
        const db = await connectDB();
        console.log("Connexion réussie à MongoDB !");

        // JSON Data
        const surveyJsonData = {
            "surveys": [
                {
                    "name": "Enquête de Satisfaction 001",
                    "description": "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
                    "createdAt": "2024-07-25T08:00:00Z",
                    "createdBy": {
                        "employeeName": "Jane Smith",
                        "employeeRole": "Responsable du service client"
                    },
                    "questions": [
                        {
                            "title": "Comment évalueriez-vous notre service ?",
                            "type": "rating",
                            "options": {
                                "minValue": 1,
                                "maxValue": 5,
                                "step": 1
                            },
                            "answers": [
                                { "title": "Très satisfait" },
                                { "title": "Satisfait" },
                                { "title": "Neutre" },
                                { "title": "Insatisfait" },
                                { "title": "Très insatisfait" }
                            ]
                        }
                    ]
                }
            ]
        };

        // Insertion des données dans la base de données
        for (const survey of surveyJsonData.surveys) {
            let newSurveyId = await createSurvey(db, {
                name: survey.name,
                description: survey.description,
                createdAt: new Date(survey.createdAt),
                createdBy: survey.createdBy
            });
            console.log(`Enquête créée avec l'ID : ${newSurveyId}`);

            for (const question of survey.questions) {
                let newQuestionId = await createQuestion(db, {
                    surveyId: newSurveyId,
                    title: question.title,
                    type: question.type,
                    options: question.options
                });
                console.log(`Question créée avec l'ID : ${newQuestionId}`);

                if (question.answers) {
                    for (const answer of question.answers) {
                        let newAnswerId = await createResponse(db, {
                            questionId: newQuestionId,
                            answer: answer.title,
                            createdAt: new Date()
                        });
                        console.log(`Réponse créée avec l'ID : ${newAnswerId}`);
                    }
                }
            }
        }

        // Récupération et affichage des résultats
        console.log("\nAffichage des résultats insérés :\n");

        const surveys = await getAllSurveys(db);
        for (const survey of surveys) {
            console.log(`Enquête : ${survey.name}`);
            console.log(`Description : ${survey.description}`);
            console.log(`Créée par : ${survey.createdBy.employeeName} (${survey.createdBy.employeeRole})`);

            const questions = await getQuestionsBySurveyId(db, survey._id);
            for (const question of questions) {
                console.log(`  Question : ${question.title}`);
                console.log(`  Type : ${question.type}`);

                const responses = await getResponsesByQuestionId(db, question._id);
                for (const response of responses) {
                    console.log(`    Réponse : ${response.answer}`);
                }
            }
        }

    } catch (error) {
        console.error("Une erreur est survenue :", error);
    } finally {
        process.exit();
    }
}

main().then(() => console.log("Programme terminé."));
