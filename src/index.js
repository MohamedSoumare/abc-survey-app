const connectDB = require('./config/database');
const { createSurvey, getSurveyById,updateSurvey, deleteSurvey } = require('./modules/surveyModule');


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
                employeeName: "Mohmaed Diop",
                employeeRole: "Analyste"
            }
        });


        // Récupération d'une enquête par ID
        const surveyIdToFind = 1;
        const survey = await getSurveyById(db, surveyIdToFind);

        if (!survey) {
            console.log(`Enquête avec l'ID ${surveyIdToFind} non trouvée.`);
        } else {
            console.log("Enquête trouvée : ", survey);
        }

        // Mise à jour d'une enquête
        const updatedSurveyId = 1; 
        const updateData = { name: "Enquête Modifiée Pour Aujourd'hui", description: "Nouvelle Enquête visant à évaluer la satisfaction des clients concernant nos services."};

        const updateCount = await updateSurvey(db, updatedSurveyId, updateData);
        if (updateCount > 0) {
            console.log(`${updateCount} enquête(s) mise(s) à jour avec succès.`);
        } else {
            console.log(`Aucune enquête mise à jour pour l'ID : ${updatedSurveyId}`);
        }

        // Suppression d'une enquête
        const surveyIdToDelete = 1; 
        const deleteCount = await deleteSurvey(db, surveyIdToDelete);

        if (deleteCount > 0) {
            console.log(`Enquête avec l'ID ${surveyIdToDelete} supprimée avec succès.`);
        } else {
            console.log(`Aucune enquête trouvée pour suppression avec l'ID : ${surveyIdToDelete}`);
        }

    } catch (error) {
        console.error("Une erreur est survenue :", error);
    } finally {
        process.exit();
    }
}

main().then(() => console.log("Programme terminé."));
