const { insertSurvey, getSurveyById, getAllSurveys, updateSurvey, deleteSurvey } = require('./modules/surveyModule');
const { insertQuestion, getQuestionById, getAllQuestions, updateQuestion, deleteQuestion } = require('./modules/questionModule');
const { insertAnswer, getAnswerById, getAllAnswers, updateAnswer, deleteAnswer } = require('./modules/answerModule');

async function main() {
    try {
             
        const surveyData = {
            surveyId: 1,
            name: "Enquête de satisfaction 001",
            description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
            createdAt: new Date().toISOString(),
            createdBy: {
                employeeName: "Abdrahmane Sy",
                employeeRole: "Responsable du service client"
            }
        };
        await insertSurvey(surveyData);
       // Get all surveys
        await getAllSurveys();
        // Get a survey by ID
        const surveyId = 1;
        await getSurveyById(surveyId);
        // Update a survey
        const updateData = {
            name: "Enquête de nos satisfaction 001",
            description: "Enquête visant à évaluer experience et la satisfaction des clients concernant nos services.",
            createdBy: {
                employeeName: "Kalidou Diop",
                employeeRole: "Chef de projet"
            }
        };
        await updateSurvey(1, updateData);
    
    
        // Create a new question for the survey
        const questionData = {
            questionId: 1,
            surveyId: 1,
            title: "Comment évalueriez-vous notre service ?",
            type: "rating",
            options: {
                minValue: 1,
                maxValue: 5,
                step: 1
            }
        };
        await insertQuestion(questionData);
        // Get all questions
        await getAllQuestions();

        // Get a question by ID
        const questionId = 1;
        await getQuestionById(questionId);
        // Update a question
        const updatedQuestionData = {
            title: "Comment Vouliez vous que nous corrigons notre service ?"
        };
        await updateQuestion(1, updatedQuestionData);
     
       
        // Create a new answer to the question
        const answerData = {
            answerId: 1,
            questionId: 1,
           title : 'Neutre'
        };
        await insertAnswer(answerData);
        // Get all answers
        await getAllAnswers();
        // Get a answer by ID
        const answerId = 1;
        await getAnswerById(answerId);
        // Update a answer
        const updatedAnswerData = {
          title : 'Satisfait'
        };
        await updateAnswer(1, updatedAnswerData);

        // Delete a answer
        await deleteAnswer(1);
        // Delete a question
        await deleteQuestion(1);
        // Delete a survey
        await deleteSurvey(1);
        
    } catch (error) {
        console.error("Erreur de message :", error.message);
    }
}
main();
