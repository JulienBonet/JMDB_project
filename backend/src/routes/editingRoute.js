const express = require('express');

const router = express.Router();
const upload = require('../middlewares/fileUpload');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const editingController = require('../controllers/editingControllers');

// 🔧 Middleware commun pour toutes les routes d'upload
const safeUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('❌ Erreur Multer :', err.message);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// ---------------------- DIRECTORS ----------------------
router.post('/director', auth, adminOnly, editingController.addDirector);
router.put('/director/:id', auth, adminOnly, editingController.editingDirector);
router.put(
  '/director/:id/image',
  auth,
  adminOnly,
  safeUpload,
  editingController.uploadDirectorImage
);
router.delete('/director/:id', auth, adminOnly, editingController.eraseDirector);

// ---------------------- CASTING ----------------------
router.post('/casting', auth, adminOnly, editingController.addCasting);
router.put('/casting/:id', auth, adminOnly, editingController.editingCasting);
router.put('/casting/:id/image', auth, adminOnly, safeUpload, editingController.uploadCastingImage);
router.delete('/casting/:id', auth, adminOnly, editingController.eraseCasting);

// ---------------------- SCREENWRITER ----------------------
router.post('/screenwriter', auth, adminOnly, editingController.addScreenwriter);
router.put('/screenwriter/:id', auth, adminOnly, editingController.editingScreenwriter);
router.put(
  '/screenwriter/:id/image',
  auth,
  adminOnly,
  safeUpload,
  editingController.uploadScreenwriterImage
);
router.delete('/screenwriter/:id', auth, adminOnly, editingController.eraseScreenwriter);

// ---------------------- COMPOSITOR ----------------------
router.post('/compositor', auth, adminOnly, editingController.addCompositor);
router.put('/compositor/:id', auth, adminOnly, editingController.editingCompositor);
router.put(
  '/compositor/:id/image',
  auth,
  adminOnly,
  safeUpload,
  editingController.uploadCompositorImage
);
router.delete('/compositor/:id', auth, adminOnly, editingController.eraseCompositor);

// ---------------------- STUDIO ----------------------
router.post('/studio', auth, adminOnly, editingController.addStudio);
router.put('/studio/:id', auth, adminOnly, editingController.editingStudio);
router.put('/studio/:id/image', auth, adminOnly, safeUpload, editingController.uploadStudioImage);
router.delete('/studio/:id', auth, adminOnly, editingController.eraseStudio);

// ---------------------- COUNTRY ----------------------
router.post('/country', auth, adminOnly, editingController.addCountry);
router.put('/country/:id', auth, adminOnly, editingController.editingCountry);
router.put('/country/:id/image', auth, adminOnly, safeUpload, editingController.uploadCountryImage);
router.delete('/country/:id', auth, adminOnly, editingController.eraseCountry);
router.get('/country/byname/:name', editingController.getCountryByName);

// ---------------------- GENRE ----------------------
router.post('/kind', auth, adminOnly, editingController.addGenre);
router.put('/kind/:id', auth, adminOnly, editingController.editingGenre);
router.delete('/kind/:id', auth, adminOnly, editingController.eraseGenre);

// ---------------------- LANGUAGE ----------------------
router.post('/language', auth, adminOnly, editingController.addLanguage);
router.put('/language/:id', auth, adminOnly, editingController.editingLanguage);
router.delete('/language/:id', auth, adminOnly, editingController.eraseLanguage);
router.get('/language/byname/:name', editingController.getLanguageByName);

// ---------------------- TAG ----------------------
router.post('/tag', auth, adminOnly, editingController.addTag);
router.put('/tag/:id', auth, adminOnly, editingController.editingTag);
router.delete('/tag/:id', auth, adminOnly, editingController.eraseTag);
router.get('/tag/byname/:name', editingController.getTagByName);

// ---------------------- THEMA / FOCUS ----------------------
router.post('/focus', auth, adminOnly, editingController.addFocus);
router.put('/focus/:id', auth, adminOnly, editingController.editingFocus);
router.put('/focus/:id/image', auth, adminOnly, safeUpload, editingController.uploadFocusImage);
router.delete('/focus/:id', auth, adminOnly, editingController.eraseFocus);

module.exports = router;
