
# 🎬 JMDB — Julius Movie DataBase

> Gestionnaire de vidéothèque personnelle full stack permettant d'importer des films depuis l'API TMDB, de gérer sa collection et de l'explorer selon de nombreux critères : réalisateurs, acteurs, scénaristes, compositeurs, pays, genres, studios ou thématiques.

**JMDB** est une application web développée pour gérer et explorer une collection personnelle de films et de séries.

Le projet est né d'un besoin concret : disposer d'un outil plus complet qu'un tableur pour organiser une vidéothèque, retrouver facilement un film et explorer les liens entre les œuvres, les personnes et les différents éléments qui composent une collection.

Développé initialement comme projet d'apprentissage en février 2024, JMDB est progressivement devenu une application full stack déployée sur un serveur personnel. Il permet aujourd'hui de gérer une collection de plus de **4 000 films**.

L'application est en production, mais son accès reste réservé aux comptes autorisés : elle est conçue avant tout pour gérer ma propre collection.

**▶️ [Voir la vidéo de démonstration](https://youtu.be/EZSa4PsRp78)**

[![Vidéo de démonstration de JMDB sur YouTube](https://img.youtube.com/vi/EZSa4PsRp78/maxresdefault.jpg)](https://youtu.be/EZSa4PsRp78)

### Aperçu de l'application

<p align="center">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534623/git_Jmdb_01_iysbgj.jpg" width="32%" alt="JMDB - Capture 1">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534630/git_Jmdb_02_mkdqhy.jpg" width="32%" alt="JMDB - Capture 2">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534631/git_Jmdb_03_xqr1ao.jpg" width="32%" alt="JMDB - Capture 3">
</p>
<p align="center">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534624/git_Jmdb_04_hpjvar.jpg" width="32%" alt="JMDB - Capture 4">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534625/git_Jmdb_05_c2tvqx.jpg" width="32%" alt="JMDB - Capture 5">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534627/git_Jmdb_06_nkuydx.jpg" width="32%" alt="JMDB - Capture 6">
</p>
<p align="center">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534628/git_Jmdb_07_k5nv5f.jpg" width="32%" alt="JMDB - Capture 7">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534629/git_Jmdb_08_emvomr.jpg" width="32%" alt="JMDB - Capture 8">
  <img src="https://res.cloudinary.com/upynf7jw/image/upload/v1785534632/git_Jmdb_09_rs4drp.jpg" width="32%" alt="JMDB - Capture 9">
</p>

## ✨ Fonctionnalités

### Exploration de la collection

- Recherche multicritère : titre, genre, pays, langue, décennie, studio et mots-clés
- Pages dédiées aux réalisateurs, acteurs, scénaristes, compositeurs et studios, avec accès à leur filmographie dans la collection
- Exploration par thématiques : collections, festivals, focus sur un réalisateur ou un acteur
- Tri alphabétique et chronologique, compteurs et listes adaptées aux grandes collections
- Fiches détaillées des films : synopsis, bande-annonce YouTube, versions disponibles (VOSTFR, multi)
- Gestion des séries TV, avec saisons et épisodes
- Gestion des favoris par utilisateur

### Administration

*Fonctionnalités réservées au rôle administrateur.*

- Import de films depuis l'API TMDB : métadonnées, casting, équipe, affiche et mots-clés
- Création et modification des fiches de films et des entités associées : artistes, pays, studios, tags…
- Upload et remplacement d'images via Cloudinary
- Gestion des informations relatives aux supports physiques : emplacement, format vidéo et support
- Statistiques de la collection
- Export CSV

## 🛠️ Stack technique

### Frontend
- **React 18** — bibliothèque d'interface utilisateur
- **Vite 6** — outil de build et serveur de développement
- **React Router 6** — gestion de la navigation
- **Material UI 5** — composants d'interface
- **Axios** — communication avec l'API

### Backend
- **Node.js 20** — environnement d'exécution
- **Express 5** — framework API REST
- **MySQL2** — connexion à la base de données
- **JWT** — authentification
- **bcrypt** — hachage des mots de passe
- **Multer** — gestion des uploads
- **Helmet** et **express-rate-limit** — protections de l'API

### Base de données
- **MySQL 8** — stockage des films, séries, personnes, utilisateurs et données associées

### Services externes
- **TMDB API** — récupération des métadonnées des films et des séries
- **Cloudinary** — hébergement et gestion des images

### Infrastructure et outils
- **Docker Compose** — orchestration des conteneurs
- **Nginx** — serveur web frontend et reverse proxy
- **VPS Hetzner** — hébergement de l'application
- **GitHub Actions** — intégration continue (CI)
- **ESLint** et **Prettier** — qualité et formatage du code

## 🏗️ Architecture

JMDB repose sur une architecture full stack organisée autour de plusieurs services conteneurisés avec Docker Compose.

```text
Navigateur web
     │
     │ HTTPS
     ▼
Reverse proxy Nginx
     │
     ├──────────────► Frontend React
     │                 (Nginx + build Vite)
     │
     └──────────────► Backend Express
                       │
                       ├────────► Base de données MySQL
                       │
                       ├────────► API TMDB
                       │
                       └────────► Cloudinary
```

- **Frontend** : application React compilée par Vite et servie par Nginx.
- **Backend** : API REST développée avec Express, chargée de la logique applicative et des échanges avec les services externes.
- **Base de données** : MySQL assure le stockage des données de l'application.
- **Services externes** : TMDB fournit les métadonnées des films et séries ; Cloudinary héberge les images.

L'ensemble est déployé sur un VPS et accessible en HTTPS.

## 🔒 Sécurité

Plusieurs mécanismes sont mis en place pour protéger l'application et les données de la collection.

### Authentification et autorisations
- Authentification des utilisateurs à l'aide de **JWT**
- Hachage des mots de passe avec **bcrypt**
- Accès à l'application réservé aux utilisateurs authentifiés
- Gestion des rôles : utilisateur et administrateur
- Accès en lecture pour les utilisateurs ; fonctionnalités d'administration réservées aux administrateurs

### Protection de l'API
- **Helmet** pour renforcer les en-têtes HTTP de sécurité
- **express-rate-limit** pour limiter les requêtes
- Requêtes SQL paramétrées pour limiter les risques d'injection
- Gestion des erreurs sans exposer les détails internes au client

### Gestion des secrets
- Variables sensibles stockées dans des fichiers d'environnement
- Aucun secret destiné à la production n'est intégré au code source

## 🚀 Installation

### Prérequis

- Docker et Docker Compose
- Un [token d'accès TMDB](https://www.themoviedb.org/settings/api)
- Un compte [Cloudinary](https://cloudinary.com)

### Lancer le projet avec Docker

```bash
# Récupérer le dépôt
git clone https://github.com/JulienBonet/JMDB_project.git
cd JMDB_project

# 1. Préparer les variables d'environnement
cp backend/.env.example backend/.env.production
cp frontend/.env.example frontend/.env.production
cp docker-compose.example.yml docker-compose.yml

# Renseigner les valeurs nécessaires dans ces trois fichiers

# 2. Construire et démarrer les conteneurs
docker compose up -d --build

# 3. Créer les tables de la base de données
docker exec -i jmdb-mysql mysql -u root -p jmdb < backend/database/schema.sql

# 4. Créer le premier compte administrateur
docker exec -it jmdb-backend node scripts/create-admin.js
```

L'application est alors accessible à l'adresse `http://localhost:8080`.

### Lancer en mode développement

**Backend** — dans un premier terminal :

```bash
cd backend
npm install
npm run dev
```

Le backend utilise le fichier `backend/.env.development`.

**Frontend** — dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

### Principales variables d'environnement

| Variable | Rôle |
|---|---|
| `APP_PORT` | Port de l'API (3310 par défaut) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Connexion à MySQL |
| `JWT_SECRET` | Clé de signature des tokens |
| `TMDB_ACCESS_TOKEN` | Token d'accès à l'API TMDB |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Configuration Cloudinary |
| `VITE_BACKEND_URL` | URL du backend utilisée par le frontend |
| `VITE_CLOUDINARY_BASE_URL` | URL publique des images Cloudinary |

Pour générer un secret JWT :

```bash
openssl rand -hex 32
```

## 📁 Structure du dépôt

```text
JMDB_project/
├── backend/
│   ├── database/          # Schéma et configuration de la base de données
│   ├── scripts/           # Scripts d'administration
│   └── src/
│       ├── routes/        # Définition des routes de l'API
│       ├── controllers/   # Logique de traitement des requêtes
│       ├── models/        # Accès aux données et requêtes SQL
│       ├── services/      # Services applicatifs
│       ├── middlewares/   # Authentification et protections
│       └── utils/         # Fonctions utilitaires
│
├── frontend/
│   ├── public/            # Ressources statiques
│   └── src/
│       ├── api/           # Configuration du client HTTP
│       ├── components/    # Composants d'interface
│       ├── hooks/         # Hooks React personnalisés
│       ├── pages/         # Pages de l'application
│       ├── services/      # Communication avec l'API
│       └── utils/         # Fonctions utilitaires
│
├── docker-compose.example.yml
└── README.md
```

## 👤 Auteur

**Julien Bonet**
Développement web Full Stack JavaScript

Site professionnel : [julienbonet.fr](https://julienbonet.fr)

---

*JMDB — Projet personnel de conception et de développement web full stack.*
