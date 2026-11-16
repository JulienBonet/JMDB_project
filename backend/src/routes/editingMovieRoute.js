/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const upload = require('../middlewares/fileUpload');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const editingMovieController = require('../controllers/editingMovieControllers');

// routes pour géréer l'appel des studios d'un film dans la movieCard dont le nom comporte une virgule
router.get('/movie/:id/studios', editingMovieController.getStudiosByMovieId);

// MOVIES ROUTES
router.post('/movie', auth, adminOnly, upload.single('cover'), editingMovieController.addMovie);

// --- Mise à jour des infos du film ---
router.put('/movie/:id', auth, adminOnly, editingMovieController.editMovieById);

// --- Mise à jour de l'image du film ---
router.put(
  '/movie/:id/image',
  auth,
  adminOnly,
  upload.single('cover'),
  editingMovieController.editMovieImage
);

// --- Update affiche depuis URL ---
router.put('/movie/:id/image-from-url', auth, adminOnly, editingMovieController.updateImageFromUrl);

// --- Suppression d'un film ---
router.delete('/movie/:id', auth, adminOnly, editingMovieController.deleteMovie);

module.exports = router;
