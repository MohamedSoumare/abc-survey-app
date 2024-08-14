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
   git clone https://github.com/votre-nom-utilisateur/systeme-gestion-enquetes.git
   
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
- `surveyModule.js` : Gère les opérations CRUD pour les enquêtes
- `questionModule.js` : Gère les opérations CRUD pour les questions
- `responseModule.js` : Gère les opérations CRUD pour les réponses

Chaque module expose des méthodes pour interagir avec la base de données MongoDB.

## Contact
Mohamed Bakary Soumaré - soumare17763@gmail.com

Lien du projet : [https://github.com/votre-nom-utilisateur/systeme-gestion-enquetes](https://github.com/votre-nom-utilisateur/systeme-gestion-enquetes)


## Authors

ABC Corporation