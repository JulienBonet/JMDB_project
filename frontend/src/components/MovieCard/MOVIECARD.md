# Documentation technique de MovieCard

## Table des matières

* [1. Rôle du composant](#1-rôle-du-composant)
* [2. Philosophie actuelle du composant](#2-philosophie-actuelle-du-composant)
* [3. Architecture actuelle](#3-architecture-actuelle)
* [4. Les deux grands modes d'affichage](#4-les-deux-grands-modes-daffichage)
* [5. Gestion des données principales du film](#5-gestion-des-données-principales-du-film)
* [6. Service principal des films](#6-service-principal-des-films)
* [7. Client HTTP commun](#7-client-http-commun)
* [8. Gestion des relations du film](#8-gestion-des-relations-du-film)
* [9. Gestion des favoris](#9-gestion-des-favoris)
* [10. Gestion du trailer](#10-gestion-du-trailer)
* [11. Gestion de l'affiche](#11-gestion-de-laffiche)
* [12. Gestion des fichiers vidéo](#12-gestion-des-fichiers-vidéo)
* [13. Gestion des séries TV](#13-gestion-des-séries-tv)
* [14. Gestion des actions d'administration](#14-gestion-des-actions-dadministration)
* [15. Interface des actions](#15-interface-des-actions)
* [16. Gestion de TransferList](#16-gestion-de-transferlist)
* [17. Gestion du reset / Undo](#17-gestion-du-reset--undo)
* [18. Gestion de `movieData`](#18-gestion-de-moviedata)
* [19. Quelques états encore locaux à MovieCard](#19-quelques-états-encore-locaux-à-moviecard)
* [20. Handlers qui restent volontairement dans MovieCard](#20-handlers-qui-restent-volontairement-dans-moviecard)
* [21. Synchronisation TMDB](#21-synchronisation-tmdb)
* [22. Authentification](#22-authentification)
* [23. Styles](#23-styles)
* [24. Flux global de données](#24-flux-global-de-données)
* [25. Origine des données](#25-origine-des-données)
* [26. Séquence d'ouverture du MovieCard](#26-séquence-douverture-du-moviecard)
* [27. Séquence d'édition](#27-séquence-dédition)
* [28. Séquence de suppression](#28-séquence-de-suppression)
* [29. Séquence de modification d'affiche](#29-séquence-de-modification-daffiche)
* [30. Historique du refactoring](#30-historique-du-refactoring)
* [31. Taille après refactoring](#31-taille-après-refactoring)
* [32. Pourquoi le composant reste encore relativement volumineux](#32-pourquoi-le-composant-reste-encore-relativement-volumineux)
* [33. TransferList : sujet volontairement laissé ouvert](#33-transferlist--sujet-volontairement-laissé-ouvert)
* [34. Consignes pour une future modification](#34-consignes-pour-une-future-modification)
* [35. Carte rapide pour retrouver le code](#35-carte-rapide-pour-retrouver-le-code)
* [36. État du composant après ce refactoring](#36-état-du-composant-après-ce-refactoring)

---

## 1. Rôle du composant

`MovieCard.jsx` est le composant central utilisé pour afficher et, pour un administrateur, modifier les informations d'un film ou d'une série TV.

Le composant reçoit un objet `movie` et plusieurs callbacks depuis son parent :

```jsx
<MovieCard
  movie={movie}
  origin={origin}
  closeModal={closeModal}
  onUpdateMovie={onUpdateMovie}
  onDeleteMovie={onDeleteMovie}
  onFavoriteRemoved={onFavoriteRemoved}
/>
```

### Props principales

| Prop                | Rôle                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `movie`             | données initiales du film affiché                                                                  |
| `origin`            | indique le contexte d'origine du film ; notamment utilisé par `useMovieData` pour le cas `country` |
| `closeModal`        | ferme la fenêtre/modale contenant le MovieCard                                                     |
| `onUpdateMovie`     | callback appelé après une mise à jour réussie                                                      |
| `onDeleteMovie`     | callback appelé après une suppression réussie                                                      |
| `onFavoriteRemoved` | callback permettant au parent de réagir à un changement de favori                                  |

`MovieCard` utilise également `AuthContext` pour connaître :

* l'utilisateur connecté ;
* son identifiant ;
* son statut administrateur.

---

## 2. Philosophie actuelle du composant

`MovieCard` a commencé comme un composant monolithique contenant l'affichage, l'édition, les appels API, les effets React et toute la logique métier.

Le fichier faisait initialement environ :

```text
2293 lignes
```

Après le refactoring, la logique métier et les gros blocs d'interface ont été progressivement déplacés vers des hooks, services et sous-composants spécialisés.

L'objectif actuel est que `MovieCard.jsx` joue principalement le rôle de **composant orchestrateur** :

```text
MovieCard
│
├── récupère le contexte utilisateur
├── récupère/initialise movieData
├── branche les hooks spécialisés
├── coordonne les actions
├── transmet les données aux sous-composants
└── choisit les vues View/Edit
```

Il ne faut donc pas chercher à réduire artificiellement sa taille au détriment de la lisibilité.

---

## 3. Architecture actuelle

```text
MovieCard/
│
├── MovieCard.jsx
├── MovieCardActions.jsx
├── MovieCardCover.jsx
├── MovieCardView.jsx
├── MovieCardView02.jsx
├── MovieCardEdit.jsx
├── MovieCardEdit02.jsx
│
├── movieCard.css
├── movieCardMediaQueries.css
└── movieCard_videoPlayer_MediaQueries.css
```

Le composant utilise également plusieurs hooks situés dans :

```text
frontend/src/hooks/
```

et plusieurs services/utilitaires situés dans :

```text
frontend/src/services/
frontend/src/utils/
```

---

## 4. Les deux grands modes d'affichage

MovieCard possède deux états fonctionnels principaux.

### Mode View

Mode normal de consultation.

Il utilise :

```text
MovieCardView.jsx
MovieCardView02.jsx
```

Ces deux composants contiennent les deux grands blocs d'affichage extraits de l'ancien MovieCard.

MovieCard reste responsable de leur fournir les données et les callbacks nécessaires.

### Mode Edit

Mode de modification, réservé à l'administration.

Il utilise :

```text
MovieCardEdit.jsx
MovieCardEdit02.jsx
```

L'édition est répartie en deux composants afin de conserver une séparation claire de l'interface tout en gardant le formulaire existant.

MovieCard continue à posséder l'état principal `movieData` et branche les hooks qui alimentent le formulaire.

---

## 5. Gestion des données principales du film

### `useMovieData.js`

Fichier :

```text
frontend/src/hooks/useMovieData.js
```

Responsabilité :

* initialiser l'état du film ;
* récupérer les données complètes du film ;
* maintenir `movieData` ;
* permettre un nouveau chargement des données.

Le hook retourne :

```js
movieData
setMovieData
refetchMovieData
```

### Source des données

Le hook utilise :

```text
frontend/src/services/movieService.js
```

et notamment :

```js
getMovie(id)
```

qui appelle :

```text
GET /api/movies/:id
```

### Particularité `origin === "country"`

Lorsque le MovieCard est ouvert depuis certains contextes, notamment `country`, l'identifiant exploitable peut être `movie.movieId`.

Le hook tient compte de cette différence.

---

## 6. Service principal des films

### `movieService.js`

Fichier :

```text
frontend/src/services/movieService.js
```

Ce service centralise les appels principaux utilisés par MovieCard.

### Récupération d'un film

```js
getMovie(id)
```

Appel :

```text
GET /api/movies/:id
```

### Mise à jour d'un film

```js
updateMovie(id, movieData)
```

Appel :

```text
PUT /api/movie/:id
```

### Suppression d'un film

```js
deleteMovie(id)
```

Appel :

```text
DELETE /api/movie/:id
```

### Mise à jour de l'affiche

```js
updateMovieImage(id, file)
```

Envoie un `FormData` contenant :

```text
cover = fichier image
```

vers :

```text
PUT /api/movie/:id/image
```

### Collections utilisées par TransferList

```js
getCollection(route)
```

Appel générique :

```text
GET /api/:route
```

### Recherche d'une relation par nom

```js
getByName(endpoint, name)
```

Appel :

```text
GET /api/:endpoint/byname/:name
```

Le nom est encodé avec `encodeURIComponent()`.

---

## 7. Client HTTP commun

### `apiClient.js`

Fichier :

```text
frontend/src/api/apiClient.js
```

Le client Axios utilise :

```js
baseURL: import.meta.env.VITE_BACKEND_URL
```

Le token présent dans `localStorage` est ajouté automatiquement dans l'intercepteur Axios.

Cela permet aux services utilisés par MovieCard de ne plus construire individuellement les URLs complètes du backend.

---

## 8. Gestion des relations du film

### `useMovieRelations.js`

Fichier :

```text
frontend/src/hooks/useMovieRelations.js
```

Ce hook gère les relations associées au film.

### Relations gérées

```text
genres
directors
casting
screenwriters
music
studios
countries
tags
focus
```

Pour chacune, le hook maintient une liste sélectionnée :

```text
selectedKinds
selectedDirectors
selectedCasting
selectedScreenwriters
selectedMusic
selectedStudios
selectedCountries
selectedTags
selectedFocus
```

Les setters correspondants sont également retournés.

### Reconstruction des relations

Les données de `movieData` contiennent notamment des valeurs sous forme de noms.

Le hook utilise :

```js
getByName(endpoint, name)
```

pour récupérer les objets complets correspondants.

Le principe est notamment :

```text
genres
  ↓
/api/kind/byname/:name
  ↓
selectedKinds
```

et de façon équivalente pour les autres relations.

### `fetchByNames()`

Le hook possède une fonction générique :

```js
fetchByNames(namesString, endpoint, setter)
```

Elle :

1. découpe la chaîne de noms ;
2. effectue les recherches nécessaires ;
3. utilise `Promise.all()` ;
4. supprime les résultats `null` ;
5. alimente le setter correspondant.

Cette fonction est également utilisée par `MovieCard` lorsqu'il faut recharger les relations, notamment après une annulation avec `handleUndo`.

---

## 9. Gestion des favoris

### `useFavorites.js`

Fichier :

```text
frontend/src/hooks/useFavorites.js
```

Le hook reçoit :

```text
userId
movieId
```

Il gère :

```text
isFavorite
toggleFavorite()
```

### `favoriteService.js`

Fichier :

```text
frontend/src/services/favoriteService.js
```

Il fournit trois opérations.

#### Vérifier le statut

```text
GET /api/favorites/:userId/:movieId
```

#### Ajouter

```text
POST /api/favorites
```

avec :

```json
{
  "userId": "...",
  "movieId": "..."
}
```

#### Supprimer

```text
DELETE /api/favorites
```

avec les mêmes identifiants dans le body.

### Rôle restant de MovieCard

MovieCard conserve le traitement UI :

```text
toggleFavorite()
      ↓
onFavoriteRemoved?.()
      ↓
toast de succès/information
```

La communication API elle-même ne se trouve plus dans MovieCard.

---

## 10. Gestion du trailer

### `useTrailer.js`

Fichier :

```text
frontend/src/hooks/useTrailer.js
```

Le hook gère :

```text
isTrailerVisible
isTrailerLoading
```

et :

```text
toggleTrailerVideo()
handleTrailerReady()
handleTrailerStart()
```

MovieCard utilise ces valeurs et callbacks pour alimenter les composants d'affichage.

La logique de chargement du trailer n'est donc plus maintenue directement dans MovieCard.

---

## 11. Gestion de l'affiche

### `useMovieCover.js`

Fichier :

```text
frontend/src/hooks/useMovieCover.js
```

Ce hook gère :

```text
image
showUploadButton
showImageButton
fileCoverRef
```

et :

```text
handleCoverUpload()
handleUploadClick()
handleResetImage()
handleUpdateImage()
```

### `MovieCardCover.jsx`

Ce composant reçoit les données et handlers du hook et contient le JSX lié à l'affiche.

La logique et la présentation sont donc maintenant séparées :

```text
useMovieCover
    ↓
état + actions

MovieCardCover
    ↓
interface
```

### Cloudinary

MovieCard utilise :

```text
VITE_CLOUDINARY_BASE_URL
```

pour construire l'URL publique de l'image.

Le format logique utilisé par le projet est :

```text
CLOUDINARY_BASE_URL / publicId
```

Le public ID stocké dans les données du film correspond notamment au fichier de couverture.

La configuration de dossier Cloudinary est différente entre développement et production et n'est pas définie dans MovieCard lui-même.

### Synchronisation avec TMDB

MovieCard utilise :

```js
refetchMovieCoverFromTMDB()
```

provenant de :

```text
frontend/src/utils/refetchMovieTMDB.js
```

Le workflow est :

```text
MovieCard
   ↓
confirmation utilisateur
   ↓
refetchMovieCoverFromTMDB()
   ↓
mise à jour de l'image affichée
```

Le workflow serveur de remplacement de l'image est géré côté backend.

---

## 12. Gestion des fichiers vidéo

### `useMovieMedia.js`

Fichier :

```text
frontend/src/hooks/useMovieMedia.js
```

Ce hook gère les fichiers vidéo utilisés par le formulaire d'édition.

### État

```text
fileInputRef
selectedFile
```

### Fonctions

```text
handleFileChange()
handleFolderChange()
handleFormatSupportChange()
```

### Fichier individuel

Les formats vidéo acceptés dans le hook sont :

```text
avi
mkv
mp4
```

Le hook met notamment à jour :

```text
location
path
videoFormat
videoSupport
fileSize
```

### Dossier

Le hook peut également traiter un dossier sélectionné avec plusieurs fichiers vidéo.

Il calcule notamment la taille totale et déduit le chemin racine.

Pour un dossier vidéo, `isTvShow` est positionné à `true`.

---

## 13. Gestion des séries TV

### `useTvSeasons.js`

Fichier :

```text
frontend/src/hooks/useTvSeasons.js
```

C'est le hook responsable de la logique spécifique aux séries TV.

Il gère :

```text
selectedSeasons
seasonsInfo
tvSeasons
nbTvEpisodes
```

et les setters nécessaires.

### Récupération des saisons

Le hook utilise :

```text
frontend/src/services/tmdbService.js
```

avec :

```js
getSeasons(mediaType, movieId)
```

qui appelle :

```text
GET /api/tmdb/:mediaType/:movieId/seasons
```

Le backend récupère ensuite les données de saisons auprès de TMDB.

### Utilitaires TV

Le hook utilise :

```text
frontend/src/utils/tvShowUtils.js
```

avec :

```text
parseTvSeasons()
formatTvSeasons()
calculateTotalEpisodes()
calculateTotalDuration()
```

#### `parseTvSeasons()`

Transforme une notation comme :

```text
1-3, 5
```

en :

```text
[1, 2, 3, 5]
```

#### `formatTvSeasons()`

Effectue l'opération inverse pour afficher une notation compacte.

#### `calculateTotalEpisodes()`

Additionne le nombre d'épisodes correspondant aux saisons sélectionnées.

#### `calculateTotalDuration()`

Calcule la durée totale à partir du nombre total d'épisodes et de la durée d'un épisode.

### Synchronisation avec `movieData`

Le flux est :

```text
selectedSeasons
      ↓
tvSeasons

selectedSeasons + seasonsInfo
      ↓
nbTvEpisodes

nbTvEpisodes + episodeDuration
      ↓
duration
```

Cette logique n'est plus dans `MovieCard.jsx`.

---

## 14. Gestion des actions d'administration

### `useMovieActions.js`

Fichier :

```text
frontend/src/hooks/useMovieActions.js
```

Ce hook contient la logique métier des actions administrateur.

Il gère :

```text
mise à jour
suppression
confirmation de mise à jour
confirmation de suppression
état de chargement
```

### Mise à jour

`handleUpdateMovie()` :

1. ferme la confirmation ;
2. active `isUpdating` ;
3. met à jour l'image si nécessaire ;
4. construit le payload du film ;
5. appelle `updateMovie()` ;
6. affiche une notification ;
7. met à jour `movieData` ;
8. appelle `onUpdateMovie()` ;
9. quitte le mode modification ;
10. ferme la modale si nécessaire ;
11. désactive l'état de chargement.

Le payload de mise à jour contient notamment :

```text
title
altTitle
year
duration
trailer
story
location
videoFormat
videoSupport
fileSize
vostfr
multi
comment
genres
directors
castings
screenwriters
musics
studios
countries
tags
focus
isTvShow
tvSeasons
nbTvEpisodes
episodeDuration
idTheMovieDb
```

Les relations sont converties en listes d'identifiants avant l'envoi.

### Suppression

`handleDeleteMovie()` :

```text
deleteMovie(movieData.id)
      ↓
toast
      ↓
onDeleteMovie(movieData.id)
      ↓
fermeture de la modale
```

---

## 15. Interface des actions

### `MovieCardActions.jsx`

Fichier :

```text
frontend/src/components/MovieCard/MovieCardActions.jsx
```

Ce composant contient l'interface liée aux actions du film.

### Administrateur

```text
Undo
Valider la modification
Ajouter/retirer des favoris
Modifier
Supprimer
```

ainsi que :

```text
Dialog de confirmation de mise à jour
Dialog de confirmation de suppression
Backdrop + CircularProgress pendant la mise à jour
```

### Utilisateur normal

L'interface d'action se limite au bouton favori.

La logique API correspondante reste dans :

```text
useFavorites
favoriteService
```

---

## 16. Gestion de TransferList

### `useTransferList.js`

Fichier :

```text
frontend/src/hooks/useTransferList.js
```

Ce hook gère :

```text
openModal
data
dataType
```

et :

```text
handleOpenModal()
handleCloseModal()
```

Lors de l'ouverture, le hook utilise :

```js
getCollection(route)
```

pour récupérer les données correspondant au type demandé.

### `TransferList`

MovieCard utilise le composant partagé :

```text
frontend/src/components/TransferList/TransferList.jsx
```

Le composant est également utilisé dans `AddNewMovie`.

Il s'agit d'une zone connue comme susceptible d'être auditée plus tard :

* mutualisation ;
* duplication éventuelle ;
* fonctionnement différent selon le contexte ;
* éventuelle optimisation.

Ce sujet est volontairement **hors du chantier actuel de MovieCard**.

---

## 17. Gestion du reset / Undo

MovieCard conserve une petite partie de logique d'orchestration pour l'annulation.

`handleUndo()` :

```text
refetchMovieData()
      ↓
restauration de l'affiche
      ↓
rechargement des genres
      ↓
rechargement des réalisateurs
      ↓
rechargement du casting
      ↓
rechargement des scénaristes
      ↓
rechargement de la musique
      ↓
rechargement des studios
      ↓
rechargement des pays
      ↓
rechargement des tags
      ↓
rechargement du focus
      ↓
sortie du mode modification
```

Les recherches individuelles sont effectuées par :

```text
useMovieRelations.fetchByNames()
```

MovieCard orchestre donc l'annulation, mais la logique de récupération des relations appartient au hook.

---

## 18. Gestion de `movieData`

Une distinction importante doit être conservée.

### `movie`

C'est la donnée reçue depuis le parent.

### `movieData`

C'est la copie/état de travail utilisé par MovieCard pour :

* afficher les données détaillées ;
* modifier les champs ;
* préparer la sauvegarde.

Le formulaire ne doit donc pas être considéré comme travaillant directement sur la prop `movie`.

---

## 19. Quelques états encore locaux à MovieCard

Tous les états n'ont pas vocation à être extraits.

Il reste notamment des états liés à l'orchestration de MovieCard :

```text
isModify
allowEdit
version
trailerMessage
```

Ces états sont liés au fonctionnement général du composant ou à des interactions très locales.

Ils ne justifient pas nécessairement la création d'un nouveau hook.

---

## 20. Handlers qui restent volontairement dans MovieCard

Il reste quelques fonctions courtes et fortement liées à l'orchestration ou au formulaire.

Par exemple :

```text
handleChange()
handleVersionChange()
handleToggleFavorite()
handleUndo()
handleSyncFromTMDB()
```

Elles ne doivent pas être extraites uniquement pour faire baisser le nombre de lignes.

Le critère principal doit rester la cohérence fonctionnelle.

---

## 21. Synchronisation TMDB

MovieCard importe les utilitaires depuis :

```text
frontend/src/utils/refetchMovieTMDB.js
```

Ce module contient les opérations de resynchronisation des différentes informations TMDB.

Il est notamment utilisé pour :

* titre alternatif ;
* année ;
* durée ;
* synopsis ;
* genres ;
* pays ;
* réalisateurs ;
* scénaristes ;
* compositeurs ;
* studios ;
* casting ;
* tags ;
* trailer ;
* couverture TMDB.

La mise à jour détaillée de chacun de ces éléments est ensuite utilisée par les composants d'édition concernés.

La couverture possède en plus son propre workflow via `useMovieCover` / `MovieCardCover`.

---

## 22. Authentification

MovieCard utilise :

```text
frontend/src/Context/AuthContext.jsx
```

avec :

```js
useAuth()
```

Les valeurs importantes sont :

```text
user
isAdmin
```

`isAdmin` détermine notamment si les contrôles d'édition sont affichés.

`user.id` est utilisé pour la gestion des favoris.

---

## 23. Styles

MovieCard charge actuellement trois feuilles de style :

```text
movieCard.css
movieCardMediaQueries.css
movieCard_videoPlayer_MediaQueries.css
```

Les sous-composants ont été extraits en conservant les classes CSS existantes.

C'est volontaire : le refactoring a cherché à modifier l'architecture JavaScript sans réécrire inutilement le comportement visuel.

Toute modification future d'un composant extrait doit donc être vérifiée avec les classes CSS existantes avant de déplacer ou renommer celles-ci.

---

## 24. Flux global de données

Le flux général est désormais :

```text
Parent
  │
  │ movie + callbacks
  ▼
MovieCard
  │
  ├── useMovieData
  │      │
  │      └── movieService
  │
  ├── useMovieRelations
  │      │
  │      └── movieService
  │
  ├── useMovieCover
  │      │
  │      └── movieService / TMDB utilities
  │
  ├── useMovieMedia
  │
  ├── useTvSeasons
  │      │
  │      ├── tmdbService
  │      └── tvShowUtils
  │
  ├── useFavorites
  │      │
  │      └── favoriteService
  │
  ├── useMovieActions
  │      │
  │      └── movieService
  │
  ├── useTransferList
  │      │
  │      └── movieService
  │
  └── useTrailer
  │
  ├── MovieCardCover
  ├── MovieCardView
  ├── MovieCardView02
  ├── MovieCardEdit
  ├── MovieCardEdit02
  ├── MovieCardActions
  └── TransferList
```

---

## 25. Origine des données

### Backend JMDB

Pour les données stockées dans la base :

```text
MovieCard
   ↓
apiClient
   ↓
movieService / favoriteService
   ↓
API backend JMDB
   ↓
MySQL
```

### TMDB

Pour les données externes :

```text
MovieCard
   ↓
service ou utilitaire frontend
   ↓
API backend TMDB
   ↓
TMDB
```

Le principe actuel est que les accès applicatifs à TMDB passent par le backend lorsque le service correspondant existe.

Exemple pour les saisons :

```text
useTvSeasons
   ↓
tmdbService.getSeasons()
   ↓
GET /api/tmdb/:mediaType/:movieId/seasons
   ↓
backend
   ↓
TMDB
```

### Cloudinary

Pour les couvertures :

```text
MovieCard
   ↓
useMovieCover
   ↓
movieService.updateMovieImage()
   ↓
backend
   ↓
Cloudinary
```

L'URL publique affichée dans le frontend est construite à partir de :

```text
VITE_CLOUDINARY_BASE_URL
+
publicId
```

---

## 26. Séquence d'ouverture du MovieCard

Le fonctionnement général est :

```text
1. Parent fournit movie
2. MovieCard récupère user/isAdmin
3. useMovieData initialise/récupère movieData
4. les hooks spécialisés se branchent sur movieData
5. les relations sont reconstruites
6. les données TV sont préparées si nécessaire
7. l'interface View ou Edit est affichée
```

Le chargement effectif de chaque partie est séparé dans son hook respectif.

---

## 27. Séquence d'édition

```text
Utilisateur admin
      ↓
isModify = true
      ↓
MovieCardEdit
MovieCardEdit02
MovieCardCover
      ↓
modification de movieData
      ↓
hooks spécialisés mettent à jour leurs états
      ↓
validation
      ↓
useMovieActions.handleUpdateMovie()
      ↓
updateMovie()
      ↓
backend
      ↓
movieData actualisé
      ↓
onUpdateMovie()
      ↓
retour View
```

---

## 28. Séquence de suppression

```text
Delete
  ↓
confirmation
  ↓
useMovieActions.handleDeleteMovie()
  ↓
deleteMovie()
  ↓
backend
  ↓
onDeleteMovie()
  ↓
fermeture de la modale
```

---

## 29. Séquence de modification d'affiche

```text
sélection fichier
      ↓
useMovieCover.handleCoverUpload()
      ↓
preview locale
      ↓
validation du film
      ↓
handleUpdateImage()
      ↓
movieService.updateMovieImage()
      ↓
backend
      ↓
Cloudinary
      ↓
nouvelle URL/public ID
```

La synchronisation TMDB de la couverture suit un chemin distinct.

---

## 30. Historique du refactoring

### État initial

```text
MovieCard.jsx
≈ 2293 lignes
```

Le composant contenait pratiquement toute la logique du film.

### Extractions réalisées

#### Composants

```text
MovieCardView.jsx
MovieCardView02.jsx
MovieCardEdit.jsx
MovieCardEdit02.jsx
MovieCardCover.jsx
MovieCardActions.jsx
```

#### Hooks

```text
useMovieData.js
useMovieCover.js
useMovieMedia.js
useMovieRelations.js
useMovieActions.js
useTransferList.js
useTrailer.js
useFavorites.js
useTvSeasons.js
```

#### Services

```text
movieService.js
favoriteService.js
tmdbService.js
apiClient.js
```

#### Utilitaires importants

```text
tvShowUtils.js
refetchMovieTMDB.js
purgeOrphanRecords.js
```

---

## 31. Taille après refactoring

Après les dernières extractions validées, `MovieCard.jsx` est descendu à environ :

```text
731 lignes
```

La réduction est donc approximativement :

```text
2293 → 731 lignes
```

soit environ 68 % de réduction.

La diminution du nombre de lignes n'est toutefois pas l'objectif principal.

L'objectif principal est la séparation des responsabilités.

---

## 32. Pourquoi le composant reste encore relativement volumineux

`MovieCard` reste un composant complexe parce qu'il est le point de coordination de nombreuses responsabilités :

```text
film
relations
séries TV
couverture
médias
trailer
favoris
édition
suppression
TMDB
modales
```

Une nouvelle extraction doit donc être justifiée par une responsabilité fonctionnelle claire.

Il ne faut pas créer un hook ou un composant uniquement pour déplacer quelques lignes.

---

## 33. TransferList : sujet volontairement laissé ouvert

`TransferList` est actuellement utilisé dans plus d'un endroit du frontend, notamment :

```text
MovieCard
AddNewMovie
```

Le composant a déjà été mutualisé à :

```text
frontend/src/components/TransferList/TransferList.jsx
```

Son architecture et son fonctionnement commun pourront être réévalués plus tard.

Questions potentielles pour un futur audit :

* les deux usages ont-ils exactement les mêmes besoins ?
* certains props sont-ils inutiles selon le contexte ?
* certaines opérations sont-elles répétées ?
* le chargement des données peut-il être centralisé davantage ?
* certaines responsabilités doivent-elles rester dans le parent ?
* le composant peut-il être simplifié ?

**Ne pas traiter ce sujet comme une tâche de finition de MovieCard.**

---

## 34. Consignes pour une future modification

Avant de modifier MovieCard :

1. Vérifier si la logique existe déjà dans un hook ou un service.
2. Vérifier si le JSX existe déjà dans un sous-composant.
3. Ne pas recréer un appel API directement dans MovieCard lorsqu'un service existe déjà.
4. Préserver les classes CSS existantes sauf nécessité réelle.
5. Tester le build après chaque extraction importante.
6. Tester le comportement réel dans l'application.
7. Ne pas modifier la configuration Docker de production pour tester MovieCard.

---

## 35. Carte rapide pour retrouver le code

| Besoin                         | Fichier                                                      |
| ------------------------------ | ------------------------------------------------------------ |
| Données principales du film    | `hooks/useMovieData.js`                                      |
| Relations                      | `hooks/useMovieRelations.js`                                 |
| Favoris                        | `hooks/useFavorites.js` + `services/favoriteService.js`      |
| Affiche                        | `hooks/useMovieCover.js` + `MovieCardCover.jsx`              |
| Vidéo/fichiers                 | `hooks/useMovieMedia.js`                                     |
| Séries TV                      | `hooks/useTvSeasons.js` + `utils/tvShowUtils.js`             |
| Trailer                        | `hooks/useTrailer.js`                                        |
| Update/Delete                  | `hooks/useMovieActions.js`                                   |
| Boutons/dialogs d'action       | `MovieCardActions.jsx`                                       |
| TransferList                   | `hooks/useTransferList.js` + `TransferList/TransferList.jsx` |
| Appels film                    | `services/movieService.js`                                   |
| Appels favoris                 | `services/favoriteService.js`                                |
| Appels saisons                 | `services/tmdbService.js`                                    |
| Client HTTP                    | `api/apiClient.js`                                           |
| Synchronisation TMDB           | `utils/refetchMovieTMDB.js`                                  |
| Purge après annulation/édition | `utils/purgeOrphanRecords.js`                                |
| Consultation                   | `MovieCardView.jsx` / `MovieCardView02.jsx`                  |
| Édition                        | `MovieCardEdit.jsx` / `MovieCardEdit02.jsx`                  |
| CSS principal                  | `movieCard.css`                                              |
| CSS responsive                 | `movieCardMediaQueries.css`                                  |
| CSS lecteur vidéo              | `movieCard_videoPlayer_MediaQueries.css`                     |

---

## 36. État du composant après ce refactoring

Le principe à conserver est :

```text
MovieCard = orchestrateur
Hooks = logique / état spécialisé
Services = communication API
Utils = fonctions réutilisables
Sous-composants = interface spécialisée
```

Cette architecture permet de continuer la modernisation du frontend sans revenir au modèle initial où tout se trouvait dans `MovieCard.jsx`.

Une éventuelle optimisation supplémentaire de MovieCard pourra être reprise plus tard, notamment autour de `TransferList` ou de la transmission des nombreuses props aux composants d'édition, mais ces sujets sont séparés du refactoring déjà réalisé.
