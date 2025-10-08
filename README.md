# FieldTrack

FieldTrack est une API REST pour gérer les utilisateurs, rôles et interventions.

Installation minimale

1. Cloner le dépôt

```bash
git clone <repo-url>
cd FieldTrack
```

2. Installer les dépendances

```powershell
npm install
```

Configuration

Créer un fichier `.env` à la racine (exemple minimal) :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fieldtrack
PORT=5000
DB_PORT=3306
```

Préparer la base de données (dev)

```powershell
node ./src/sync.js
```

Attention : ce script exécute `sequelize.sync({ alter: true })`. Ne pas utiliser en production sans sauvegarde.

Lancer

```powershell
npm run dev   # dev
npm start     # prod
```

Doc interactive

Swagger UI : `http://localhost:<PORT>/api-docs`

Endpoints principaux (résumé)

- Auth : `/auth/register`, `/auth/login`, `/auth/refresh`
- Utilisateurs : `/utilisateur` (POST, GET, GET /:id, PUT /:id, DELETE /:id)
- Interventions : `/interventions` (GET, POST, GET /:id, PUT /:id, DELETE /:id)

Architecture (très bref)

- Models : `src/model/`
- Controllers : `src/controller/`
- Routes : `src/route/`

Contact

Ouvre une issue pour toute question ou demande d'ajout (seed, migrations, diagramme ER, tests).
