const router = require('express').Router();
const favoriteController = require('../controllers/favoriteControllers');
const auth = require('../middlewares/authMiddleware');

// Toutes les routes des favoris nécessitent une authentification.
router.use('/favorites', auth);

router.post('/favorites', favoriteController.addFavorite);
router.delete('/favorites', favoriteController.unFavorite);

// Récupérer tous les favoris du user connecté
router.get('/favorites', favoriteController.getAllFavoritesByUser);

// Tri alphabétique / chronologique
router.get('/favorites/sorted0', favoriteController.getFavoritesAlphaAsc);
router.get('/favorites/sorted1', favoriteController.getFavoritesAlphaDesc);
router.get('/favorites/sorted2', favoriteController.getFavoritesYearAsc);
router.get('/favorites/sorted3', favoriteController.getFavoritesYearDesc);

router.get('/favorites/:movieId', favoriteController.isFavorite);

module.exports = router;
