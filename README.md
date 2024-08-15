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

L'application se connectera à MongoDB et exécutera un exemple de création d'enquête et de question.

## Fonctionnalités

- Gestion des enquêtes (création, lecture, mise à jour, suppression)
- Gestion des questions (création, lecture, mise à jour, suppression)
- Gestion des réponses (création, lecture, mise à jour, suppression)

## Développement
### Modules

#### surveyModule.js
Gère les opérations CRUD pour les enquêtes.

- `createSurvey(db, surveyData)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `surveyData`: Un objet contenant les détails de l'enquête (nom, description, date de création, créateur).
  - Retourne: L'ID de l'enquête créée.

- `getSurveyById(db, surveyId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `surveyId`: L'ID numérique de l'enquête à récupérer.
  - Retourne: L'objet représentant l'enquête ou null si non trouvé.

- `getAllSurveys(db)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - Retourne: Un tableau contenant toutes les enquêtes.

- `updateSurvey(db, surveyId, updatedData)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `surveyId`: L'ID numérique de l'enquête à mettre à jour.
  - `updatedData`: Un objet contenant les champs à mettre à jour.
  - Retourne: Le nombre de documents modifiés.

- `deleteSurvey(db, surveyId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `surveyId`: L'ID numérique de l'enquête à supprimer.
  - Retourne: Le nombre de documents supprimés.

#### questionModule.js
Gère les opérations CRUD pour les questions.

- `createQuestion(db, questionData)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `questionData`: Un objet contenant les détails de la question (ID de l'enquête, titre, type, options).
  - Retourne: L'ID de la question créée.

- `getQuestionById(db, questionId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `questionId`: L'ID de la question à récupérer (ObjectId).
  - Retourne: L'objet représentant la question.

- `getQuestionsBySurveyId(db, surveyId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `surveyId`: L'ID de l'enquête dont on veut récupérer les questions (ObjectId).
  - Retourne: Un tableau contenant toutes les questions de l'enquête.

- `updateQuestion(db, questionId, updateData)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `questionId`: L'ID de la question à mettre à jour (ObjectId).
  - `updateData`: Un objet contenant les champs à mettre à jour.
  - Retourne: Le nombre de documents modifiés.

- `deleteQuestion(db, questionId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `questionId`: L'ID de la question à supprimer (ObjectId).
  - Retourne: Le nombre de documents supprimés.

#### responseModule.js
Gère les opérations CRUD pour les réponses.

- `createResponse(db, responseData)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `responseData`: Un objet contenant les détails de la réponse (ID de la question, titre).
  - Retourne: L'ID de la réponse créée.

- `getResponseById(db, responseId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `responseId`: L'ID de la réponse à récupérer (ObjectId).
  - Retourne: L'objet représentant la réponse.

- `getResponsesByQuestionId(db, questionId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `questionId`: L'ID de la question dont on veut récupérer les réponses (ObjectId).
  - Retourne: Un tableau contenant toutes les réponses à la question.

- `updateResponse(db, responseId, updateData)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `responseId`: L'ID de la réponse à mettre à jour (ObjectId).
  - `updateData`: Un objet contenant les champs à mettre à jour.
  - Retourne: Le nombre de documents modifiés.

- `deleteResponse(db, responseId)`
  - `db`: L'objet de connexion à la base de données MongoDB.
  - `responseId`: L'ID de la réponse à supprimer (ObjectId).
  - Retourne: Le nombre de documents supprimés.


## Contact
Mohamed Bakary Soumaré - soumare17763@gmail.com

Lien du projet : [https://github.com/MohamedSoumare/abc-survey-app.git]

## Authors

ABC Corporation