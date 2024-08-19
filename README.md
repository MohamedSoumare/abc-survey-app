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
4. **Installez le module mongodb :**
    
    ```bash
       npm install mongodb
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
│   └── responseModule.js
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

## Fonctionnalités

- Gestion des enquêtes (création, lecture, mise à jour, suppression)
- Gestion des questions (création, lecture, mise à jour, suppression)
- Gestion des réponses (création, lecture, mise à jour, suppression)

## Développement
### Modules et type des Objets

#### surveyModule.js
Gère les opérations CRUD pour les enquêtes.

- `createSurvey(surveyData)` 
  - Permet de Créer une nouvelle enquête avec des détails comme le titre, la description, la date de création, et l'employé responsable.
  - Retourne L'ID de la nouvelle enquête créer.
  - surveyData: Objet contenant les informations (parametre) de l'enquête.

    ### Exemple
      ```javascript
        createSurvey({
            surveyId: number,
            name: string,
            description: string,
            createdAt: Date,
            createdBy: {
                employeeName: string,
                employeeRole: string,
            },
            questions: []
        });
      ```

- `getSurveyById(surveyId: number)`
  - Permet récupère les détails d'une enquête spécifique en utilisant son ID.
  - Retourne: L'objet représentant l'enquête est trouvé ou un message d'erreur est affiché si ce n'est pas le cas.

- `updateSurvey(surveyId: number, updateData)`
  - Permet de mettre à jour l'enquête d'une doccument existant en utilisant son ID.
  - Retourne: Le nombre de documents modifiés.
  - updateData: Objet contenant les informations (parametre) de mise à jour de l'enquête.
    ### Exemple
  ```javascript
      updateSurvey(1, {
            name: string,
            description: string,
            createdAt: Date,
            createdBy: {
                employeeName: string,
                employeeRole: string
            },
            questions: []
        });
  ```

- `deleteSurvey(surveyId: number)`
  - Permet de supprimer une enquête à partir de son ID.
  - Retourne: Le nombre de documents supprimés.

#### questionModule.js
Gère les opérations CRUD pour les questions.

- `createQuestion(questionData)`
  - Permet de créer une nouvelle question en ajoutant à l'identifiant d'une enquête existante avec les informations nécessaires, telles que le titre de la question, le type de question, etc.
  - Retourne: L'ID de la question créée ou affiche une message en cas non trouvé.
  - questionData: Objet contenant les informations (parametre) de la question.

      ### Exemple
       ```javascript
        createQuestion({
            surveyId: number,
            title: string,
            type: string,
            options: {
                minValue: 1,
                maxValue: 5,
                step: 1
            },
            response: []
        });
      ```

- `getQuestionById(questionId: number)`
  - Permet de récuperer  une question spécifique en utilisant son ID.
  - Retourne L'objet représentant la question est trouvé ou un message d'erreur est affiché si ce n'est pas le cas.

- `updateQuestion(questionId: number, updateData)`
  - Permet de mettre à jour  une question existante d'un doccument en utilisant son ID.
  - Retourne: Le nombre de documents modifiés.
  - updateData: Objet contenant les informations (parametre) de mise à jour de la question.
  
    ### Exemple
    ```javascript
      updateQuestion(1, {
          title: string,
          type: string,
          options: {
            minValue: 1,
            maxValue: 5,
            step: 1
            },
            response: []
      });
    ```

- `deleteQuestion(questionId: number)`
  - Permet de supprimer une doccument en utilisant son ID.
  - Retourne: Le nombre de documents supprimés.
  
#### responseModule.js
Gère les opérations CRUD pour les réponses.

- `createResponse(responseData)`
  - Créer une réponse à une question spécifique avec des informations telles que l'ID de l'enquête, l'ID de la question, la réponse donnée.
  - Retourne: L'ID de la réponse créée ou affiche une message si non trouvé.
  - responseData: Objet contenant les informations de la réponse.

      ### Exemple
       ```javascript
          createResponse({
                serverId: number,
                questionId: number,
                title: string,
            });
       ```
- `getResponseById(responseId: number)`
  - Permet récupère une réponse spécifique en utilisant son ID.
  - Retourne: L'objet représentant la réponse.

- `updateResponse(responseId: number, updateData)`
  - Permet de mettre à jour une réponse existante.
  - Retourne: Le nombre de documents modifiés.
  - updateData: Objet contenant les informations (parametre) de mise à jour de la réponse.
  ### Exemple
    ```javascript
      updateResponse(1, {
      title: string,
      response: []
      });
    ```
- `deleteResponse(responseId: number)`
  - Permet de supprimer une réponse d'un document.
  - Retourne: Le nombre de documents supprimés.

## Contact
Mohamed Bakary Soumaré - soumare17763@gmail.com

Lien du projet : [https://github.com/MohamedSoumare/abc-survey-app.git]

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Mohamed Bakary Soumaré](https://github.com/MohamedSoumare/)
