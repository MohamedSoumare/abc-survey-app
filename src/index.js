// // Importation des modules nécessaires
// const connectDB = require('./config/database');
// const SurveyModule = require('./modules/surveyModule');
// const QuestionModule = require('./modules/questionModule');
// const ResponseModule = require('./modules/responseModule');

// // Fonction principale asynchrone
// async function main() {
//     try {
//         // Connexion à la base de données
//         console.log("Tentative de connexion à MongoDB...");
//         const db = await connectDB();
//         console.log("Connexion réussie à MongoDB !");

//         // Initialisation des modules
//         const surveyModule = new SurveyModule(db);
//         const questionModule = new QuestionModule(db);
//         const responseModule = new ResponseModule(db);

//         // Exemple d'utilisation des modules
//         // Création d'une nouvelle enquête
//         const newSurveyId = await surveyModule.createSurvey({
//             name: "Nouvelle Enquête",
//             description: "Une description de la nouvelle enquête",
//             createdAt: new Date(),
//             createdBy: {
//                 employeeName: "John Doe",
//                 employeeRole: "Analyste de données"
//             }
//         });
//         console.log(`Nouvelle enquête créée avec l'ID : ${newSurveyId}`);

//         // Ajout d'une question à l'enquête
//         const newQuestionId = await questionModule.createQuestion({
//             surveyId: newSurveyId,
//             title: "Quelle est votre opinion sur notre service ?",
//             type: "text"
//         });
//         console.log(`Nouvelle question créée avec l'ID : ${newQuestionId}`);

//         // Vous pouvez ajouter d'autres exemples d'utilisation ici

//     } catch (error) {
//         console.error("Une erreur est survenue :", error);
//     }
// }

// // Exécution de la fonction principale
// main().then(() => console.log("Programme terminé."));

const connectDB = require('./config/database');
const { createSurvey, getSurveyById } = require('./modules/surveyModule');
const { createQuestion, getQuestionById } = require('./modules/questionModule');
const { createResponse, getResponseById } = require('./modules/responseModule');

async function main() {
    try {
        console.log("Tentative de connexion à MongoDB...");
        const db = await connectDB();
        console.log("Connexion réussie à MongoDB !");

        // Création d'une nouvelle enquête
        const surveyData = {
            name: "Nouvelle Enquête",
            description: "Une description de la nouvelle enquête",
            createdAt: new Date(),
            createdBy: {
                employeeName: "John Doe",
                employeeRole: "Analyste de données"
            }
        };

        let newSurveyId;
        const existingSurvey = await getSurveyById(db, surveyData._id);
        if (!existingSurvey) {
            newSurveyId = await createSurvey(db, surveyData);
            console.log(`Nouvelle enquête créée avec l'ID : ${newSurveyId}`);
        } else {
            newSurveyId = existingSurvey._id;
            console.log("L'enquête existe déjà, aucune insertion effectuée.");
        }

        // Ajout d'une question à l'enquête
        const newQuestionId = await createQuestion(db, {
            surveyId: newSurveyId,
            title: "Quelle est votre opinion sur notre service ?",
            type: "text"
        });
        console.log(`Nouvelle question créée avec l'ID : ${newQuestionId}`);

        // Ajout d'une réponse à la question
        const newResponseId = await createResponse(db, {
            questionId: newQuestionId,
            respondent: "Jane Doe",
            answer: "Le service est excellent.",
            createdAt: new Date()
        });
        console.log(`Nouvelle réponse créée avec l'ID : ${newResponseId}`);

        // Vous pouvez ajouter d'autres exemples d'utilisation ici

    } catch (error) {
        console.error("Une erreur est survenue :", error);
    }
}

main().then(() => console.log("Programme terminé."));
