# Survey App

## Description

Survey App est une application JavaScript conçue pour gérer les fiches d'enquêtes de satisfaction des clients.
Elle utilise MongoDB comme base de données et permet d'effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les enquêtes, questions et réponses.

## Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0 ou supérieure)

## Installation

1. Clonez le repository :
   ```
   git clone https://github.com/MohamedSoumare/abc-survey-app.git
   ```

2. Naviguez dans le répertoire du projet :
   ```bash
   cd abc-survey-app
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

## Configuration

Configurez la base de données dans `config/database.js`. 
Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale.

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

Pour démarrer l'application :

```bash
npm start
```

L'application se connectera à MongoDB et exécutera un exemple de création d'enquête, de question et de réponse.

## Fonctionnalités

- Gestion complète des enquêtes, questions et réponses (CRUD)

## Architecture et Développement

### Modules

1. **surveyModule.js** : Gère les enquêtes
   - `createSurvey(db, surveyData)`
   - `getSurveyById(db, surveyId)`
   - `getAllSurveys(db)`
   - `updateSurvey(db, surveyId, updatedData)`
   - `deleteSurvey(db, surveyId)`

2. **questionModule.js** : Gère les questions
   - `createQuestion(db, questionData)`
   - `getQuestionById(db, questionId)`
   - `getQuestionsBySurveyId(db, surveyId)`
   - `updateQuestion(db, questionId, updateData)`
   - `deleteQuestion(db, questionId)`

3. **responseModule.js** : Gère les réponses
   - `createResponse(db, responseData)`
   - `getResponseById(db, responseId)`
   - `getResponsesByQuestionId(db, questionId)`
   - `updateResponse(db, responseId, updateData)`
   - `deleteResponse(db, responseId)`

### Structure des Objets

#### Objet Survey
- `surveyId` (Number): Identifiant unique
- `name` (String): Nom de l'enquête
- `description` (String): Description
- `createdAt` (Date): Date de création
- `createdBy` (Object):
  - `employeeName` (String): Nom de l'employé créateur
  - `employeeRole` (String): Rôle de l'employé

#### Objet Question
- `questionId` (Number): Identifiant unique
- `surveyId` (Number): ID de l'enquête parente
- `title` (String): Énoncé de la question
- `type` (String): Type de question (ex: "rating")
- `options` (Object): Options spécifiques
  - Pour type "rating":
    - `minValue` (Number): Valeur minimale
    - `maxValue` (Number): Valeur maximale
    - `step` (Number): Pas entre les valeurs

#### Objet Response
- `responseId` (Number): Identifiant unique
- `questionId` (Number): ID de la question associée
- `title` (String): Contenu de la réponse

## Contact

Mohamed Bakary Soumaré - soumare17763@gmail.com

Projet : [https://github.com/MohamedSoumare/abc-survey-app.git](https://github.com/MohamedSoumare/abc-survey-app.git)

## Auteur

[Mohamed Bakary Soumaré](https://github.com/MohamedSoumare/)

```
