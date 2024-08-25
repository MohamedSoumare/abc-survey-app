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
       cd abc-survey-app
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

- `getSurveyById(surveyId: number)`
  - Permet récupère le détail d'une enquête spécifique en utilisant son ID.
  - Retourne: L'objet représentant l'enquête est trouvé ou un message d'erreur est affiché si ce n'est pas le cas.

- `getAllSurveys()`
  - Permet de récupérer la liste de toutes les enquêtes.

- `updateSurvey(surveyId: number, updatedQuestionData)`
  - Permet de mettre à jour l'enquête d'une enquete existant en utilisant son ID.
  - Retourne: l'enquete modifier.
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

- `deleteSurvey(surveyId: number)`
  - Permet de supprimer une enquête à partir de son ID.
  - Retourne: L'enquete supprimés.

#### questionModule.js
Gère les opérations CRUD pour les questions.

- `insertQuestion(questionData)`
  - Permet de créer une nouvelle question en récuperant l'identifiant d'une enquête existante avec les informations nécessaires, telles que le titre de la question, le type de question, etc.
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

- `getQuestionById(questionId: number)`
  - Permet de récuperer  une question spécifique en utilisant son ID.
  - Retourne L'objet représentant la question est trouvé ou un message d'erreur est affiché si ce n'est pas le cas.

- `getAllQuestions()`
  - Permet de récupérer toutes les questions d'une enquête.

- `updateQuestion(questionId: number, updatedQuestionData)`
  - Permet de mettre à jour  une question existante d'un objet en utilisant son ID.
  - Retourne: question modifiés.
  - updatedQuestionData: l'Objet contenant les informations (parametre) de mise à jour de la question.

 ### Exemple d'utilisation

    ```javascript
      const updatedQuestionData = {
            title: "Comment Vouliez vous que nous corrigons notre service ?"
        };
      await updateQuestion(1, updatedQuestionData);
    ```

- `deleteQuestion(questionId: number)`
- Permet de supprimer une doccument en utilisant son ID.
- Retourne:  la question supprimés.
  
#### responseModule.js

Gère les opérations CRUD pour les réponses.

- `insertAnswer(answerData)`
  - Créer une réponse spécifique avec des informations telles que l'ID de l'enquête, l'ID de la question, la réponse donnée.
  - answerData: Objet contenant les informations de la réponse.

    ### Exemple
       ```javascript
        const answerData ={
            surveyId: 1,
            questionId: 1,
           title : 'Neutre'
        };
        await insertAnswer(answerData);
       ```
      
- `getAnswerById(answerId: number)`
  - Permet récupère une réponse spécifique en utilisant son ID.
  - Retourne: L'objet représentant la réponse.

- `getAllAnswers()`
  - Permet de récupérer toutes les réponses d'une enquête.

- `updateAnswer(answerId: number, updatedAnswerData)`
  - Permet de mettre à jour une réponse existante.
  - Retourne: respnse modifiés.
  - updatedAnswerData: L'Objet contenant les informations (parametre) de mise à jour de la réponse.

  ### Exemple

    ```javascript
      const updatedAnswerData = {
          title : 'Satisfait'
        };
        await updateAnswer(1, updatedAnswerData);
    ```
- `deleteAnswer(answerId: number)`
  - Permet de supprimer une réponse d'un document.
  - Retourne: la response supprimés.

## Contact
Mohamed Bakary Soumaré - mohamedsoumare17763@gmail.com

Lien du projet : [https://github.com/MohamedSoumare/abc-survey-app.git]

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Mohamed Bakary Soumaré](https://github.com/MohamedSoumare/)


 ```
Ce README fournit une documentation exhaustive sur l'ensemble des fonctionnalités disponibles dans les modules surveyModule, questionModule, et responseModule.
 ```
