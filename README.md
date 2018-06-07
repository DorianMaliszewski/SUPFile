# SUPFile

Projet de fin d'année SUPInfo

## Introduction

Le but du projet étant de faire une interface d'upload se rapprochant d'un Google Drive ou Dropbox.

## Prérequis

Il faut installer :

- NodeJS version LTS 8.x
- Docker pour mettre en place la base de données MongoDB


## Mise en place de l'environnement de développement

- Aller dans le dossier server et faire `npm install`
- Démarrer le docker mongo : `docker run -p 27017:27017 -d mongo`
- Vérifier les paramètres dans le fichier .env (Vérifier l'existence du dossier de stockage STORAGE_PATH)
- Lancer le serveur en mode dev : `npm run dev`
- Aller dans le dossier client et faire `npm install`
- Vérifier l'url d'atteinte de l'API dans le fichier client/constants/index.js : SERVER_URL
- Lancer le client `npm start`

## Information supplémentaire

Pour avoir plus d'information sur le projet consulter le wiki du projet