/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const upload = require('../middlewares/fileUpload');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const editingMovieController = require('../controllers/editingMovieControllers');
router.use(auth);

// routes pour géréer l'appel des studios d'un film dans la movieCard dont le nom comporte une virgule
router.get('/movie/:id/studios', editingMovieController.getStudiosByMovieId);

// MOVIES ROUTES
router.post('/movie', adminOnly, upload.single('cover'), editingMovieController.addMovie);

// --- Mise à jour des infos du film ---
router.put('/movie/:id', adminOnly, editingMovieController.editMovieById);

// --- Mise à jour de l'image du film ---
router.put(
  '/movie/:id/image',
  adminOnly,
  upload.single('cover'),
  editingMovieController.editMovieImage
);

// --- Update affiche depuis URL ---
router.put('/movie/:id/image-from-url', adminOnly, editingMovieController.updateImageFromUrl);

// --- Suppression d'un film ---
router.delete('/movie/:id', adminOnly, editingMovieController.deleteMovie);

module.exports = router;
