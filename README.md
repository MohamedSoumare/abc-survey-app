# Survey App
                     
## Description

Survey App est une application JavaScript simple permettant de gérer les fiches d'enquêtes de satisfaction des clients. L'application utilise une base de données MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur ces fiches.

## Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

   ```
     git clone https://github.com/MohamedSoumare/abc-survey-app.git
   
   ```
2. **Naviguez dans le répertoire du projet :**

    ```bash
       cd  abc-survey-app
    ```
3. **Installez les dépendances :**
   
    ```bash
       npm install
    ```
   
## Configuration

1.  **Configurez la base de données :**

  - Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale.
  - Mettez les paramètres de connexion dans `config/database.js`.


## Structure du Projet
```
systeme-gestion-enquetes/
│
├── config/
│   └── database.js
│
├── modules/
│   ├── surveyModule.js
│   ├── questionModule.js
│   └── answerModule.js
│
├── index.js
├── package.json
└── README.md

```

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
   npm start
```

L'application se connectera à MongoDB et exécutera un exemple de création d'enquête, de question et response.


## Développement
### Modules et type des Objets

#### surveyModule.js
Gère les opérations CRUD pour les enquêtes(survey).

- `insertSurvey(surveyData)` 
  - Permet de Créer une nouvelle enquête avec des détails comme le nom, la description, la date de création et creer par l'employé.
  - surveyData: Objet contenant les informations (parametre) de la creation l'enquête.

    ### Exemple d'utilisation
     ```javascript
       const surveyData = {
            name: "Enquête de satisfaction 001",
            description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
            createdAt: new Date().toISOString(),
            createdBy: {
                employeeName: "Abdrahmane Sy",
                employeeRole: "Responsable du service client"
            }
        };
        await insertSurvey(surveyData);
      ```

- `getSurveyById(surveyId: int)`
   - Permet de récupérer une enquête par son identifiant.
    - surveyId: ID de l'enquête à récupérer. 
  - Retourne: l'enquête trouvé ou un message d'erreur est affiché si ce n'est pas le cas.

 ### Exemple d'utilisation
  ```javascript
     const surveyId = 1;
     await getSurveyById(surveyId);
  ```     

- `getAllSurveys()`
  - Permet de récupérer la liste de toutes les enquêtes.
  - Retourne: la liste des enquêtes.
  
 ### Exemple d'utilisation
  ```javascript
    await getAllSurveys();
  ```     

- `updateSurvey(surveyId: int, updatedQuestionData)`
  - Permet de mettre à jour l'enquête d'une enquete existant en utilisant son ID.
  - Retourne: l'enquete modifier.
  - surveyId: ID de l'enquête à modifier.
  - updatedQuestionData: Objet contenant les informations (parametre) de mise à jour de l'enquête.

  ### Exemple d'utilisation
  ```javascript
        const updatedQuestionData = {
            name: "Enquête de nos satisfaction 001",
            description: "Enquête visant à évaluer experience et la satisfaction des clients concernant nos services.",
            createdBy: {
                employeeName: "Kalidou Diop",
                employeeRole: "Chef de projet"
            }
        };
        await updateSurvey(1, updatedQuestionData);
   ```

- `deleteSurvey(surveyId: int)`
  - Permet de supprimer une enquête à partir de son ID.
  - Retourne: L'enquete supprimés.
  - surveyId: ID de l'enquête à supprimer.
   ### Exemple d'utilisation
  ```javascript
      await deleteSurvey(1);
  ```     
  

#### questionModule.js
Gère les opérations CRUD pour les questions.

- `insertQuestion(questionData)`
  - Permet de créer une nouvelle question en récuperant l'identifiant d'une enquête existante.
  - questionData: Objet contenant les informations (parametre) de la question.

  ###  Exemple d'utilisation
       ```javascript
      const questionData = {
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
      ```

- `getQuestionById(questionId: int)`
  - Permet de récuperer  une question spécifique en utilisant son ID.
  - questionId: ID de la question à récupérer.
  - Retourne: La question récupérée.
  
  ### Exemple d'utilisation
  ```javascript
        const questionId = 1;
        await getQuestionById(questionId);
  ```     

- `getAllQuestions()`
  - Permet de récupérer toutes les questions d'une enquête.
  - Retourne: Toutes les questions.
  
  ### Exemple d'utilisation
  ```javascript
         await getAllQuestions();
  ```     

- `updateQuestion(questionId: int, updatedQuestionData)`
  - Permet de mettre à jour  une question existante d'un objet en utilisant son ID.
  - Retourne: question modifiés.
  - questionId: ID de la question à mettre à jour.
  - updatedQuestionData: l'Objet contenant les informations (parametre) de mise à jour de la question.

 ### Exemple d'utilisation
    ```javascript
      const updatedQuestionData = {
            title: "Comment Vouliez vous que nous corrigons notre service ?"
        };
      await updateQuestion(1, updatedQuestionData);
    ```

- `deleteQuestion(questionId: int)`
- Permet de supprimer une question en utilisant son ID.
- Retourne: La question supprimée.
- questionId: ID de la question à supprimer.

### Exemple d'utilisation
```javascript
      await deleteQuestion(1);
  ```     

#### responseModule.js

Gère les opérations CRUD pour les réponses.

- `insertAnswer(answerData)`
  - Créer une réponse spécifique avec des informations telles que l'ID de l'enquête, l'ID de la question, la réponse donnée.
  - answerData: Objet contenant les informations (parametre) de la réponse.

    ### Exemple d'utilisation
       ```javascript
        const answerData ={
            surveyId: 1,
            questionId: 1,
           title : 'Neutre'
        };
        await insertAnswer(answerData);
       ```

- `getAnswerById(answerId: int)`
  - Permet récupère une réponse spécifique en utilisant son ID.
  - Retourne: La réponse spécifique.
  - answerId: ID de la réponse à récupérer.

   ### Exemple d'utilisation
     ```javascript
        const answerId = 1;
        await getAnswerById(answerId);
       ```

- `getAllAnswers()`
  - Permet de récupérer toutes les réponses d'une enquête.
  - Retourne: Toutes les réponses.

 ### Exemple d'utilisation
    ```javascript
        await getAllAnswers();
    ```

- `updateAnswer(answerId: int, updatedAnswerData)`
- Met à jour une réponse spécifique en utilisant son ID.
- Retourne: La réponse mise à jour.
- answerId: ID de la réponse à mettre à jour.
- updatedAnswerData: Objet contenant les informations (paramètres) de la réponse mise à jour.

  ### Exemple d'utilisation

    ```javascript
      const updatedAnswerData = {
          title : 'Satisfait'
        };
        await updateAnswer(1, updatedAnswerData);
    ```
- `deleteAnswer(answerId: int)`
- Supprime une réponse spécifique en utilisant son ID.
- Retourne: La réponse supprimée.
- answerId: ID de la réponse à supprimer.
 
 ### Exemple  d'utilisation
    ```javascript
     await deleteAnswer(1);
    ```

## Contact
Mohamed Bakary Soumaré - mohamedsoumare17763@gmail.com

Lien du projet :[https://github.com/MohamedSoumare/abc-survey-app.git]

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Mohamed Bakary Soumaré](https://github.com/MohamedSoumare/)


 ```
Ce README fournit une documentation exhaustive sur l'ensemble des fonctionnalités disponibles dans les modules surveyModule, questionModule, et responseModule.
 ```
