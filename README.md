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

- `createSurvey(surveyData)` :Insère une nouvelle enquête dans la collection surveys. Retourne l'ID de l'enquête créée.
- `getSurveyById(surveyId)` : Récupère une enquête par son ID. Retourne un objet représentant l'enquête.
- `getAllSurveys()` : Récupère toutes les enquêtes. Retourne un tableau contenant les enquêtes.
- `updateSurvey(surveyId, updateData)` : Met à jour une enquête spécifique par son ID avec les données fournies. Retourne le nombre de documents modifiés.
- `deleteSurvey(surveyId)` : Supprime une enquête par son ID. Retourne le nombre de documents supprimés.

#### questionModule.js
Gère les opérations CRUD pour les questions.

- `createQuestion(questionData)` : Insère une nouvelle question dans la collection questions. Retourne l'ID de la question créée.
- `getQuestionById(questionId)` : Récupère une question par son ID. Retourne un objet représentant la question.
- `getQuestionsBySurveyId(surveyId)` : Récupère toutes les questions associées à une enquête spécifique. Retourne un tableau contenant les questions.
- `updateQuestion(questionId, updateData)` : Met à jour une question spécifique par son ID avec les données fournies. Retourne le nombre de documents modifiés.
- `deleteQuestion(questionId)` : Supprime une question par son ID. Retourne le nombre de documents supprimés.

#### responseModule.js
Gère les opérations CRUD pour les réponses.

- `createResponse(responseData)` : Insère une nouvelle réponse dans la collection answers. Retourne l'ID de la réponse créée.
- `getResponseById(responseId)` : Récupère une réponse par son ID. Retourne un objet représentant la réponse.
- `getResponsesByQuestionId(questionId)` : Récupère toutes les réponses associées à une question spécifique. Retourne un tableau contenant les réponses.
- `updateResponse(responseId, updateData)` : Met à jour une réponse spécifique par son ID avec les données fournies. Retourne le nombre de documents modifiés.
- `deleteResponse(responseId)` : Supprime une réponse par son ID. Retourne le nombre de documents supprimés.

## Contact
Mohamed Bakary Soumaré - soumare17763@gmail.com

Lien du projet : [https://github.com/MohamedSoumare/abc-survey-app.git]
## Authors

ABC Corporation