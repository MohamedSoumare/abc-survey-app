const connectDB = require('./config/database');
const { createSurvey, getAllSurveys, updateSurvey, deleteSurvey } = require('./modules/surveyModule');

async function main() {
    try {
        console.log("Tentative de connexion à MongoDB...");
        const db = await connectDB();
        console.log("Connexion réussie à MongoDB !");

        // création d'une enquête
        const newSurveyId = await createSurvey(db, {
            name: "Enquête de Satisfaction 001",
            description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
            createdAt: new Date(),
            createdBy: {
                employeeName: "John Doe",
                employeeRole: "Analyste"
            }
        });
        console.log(`Nouvelle enquête créée avec l'ID : ${newSurveyId}`);

        // récupération de toutes les enquêtes
        const surveys = await getAllSurveys(db);
        console.log("Toutes les enquêtes : ", surveys);

        // mise à jour d'une enquête
        const updatedCount = await updateSurvey(db, newSurveyId, { name: "Enquête Modifiée" });
        console.log(`${updatedCount} enquête(s) mise(s) à jour.`);

        // suppression d'une enquête
        const deletedCount = await deleteSurvey(db, newSurveyId);
        console.log(`${deletedCount} enquête(s) supprimée(s).`);

    } catch (error) {
        console.error("Une erreur est survenue :", error);
    } finally {
        process.exit();
    }
}

main().then(() => console.log("Programme terminé."));
