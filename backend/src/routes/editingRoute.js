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
router.use(auth);

// ---------------------- DIRECTORS ----------------------
router.post('/director', adminOnly, editingController.addDirector);
router.put('/director/:id', adminOnly, editingController.editingDirector);
router.put('/director/:id/image', adminOnly, safeUpload, editingController.uploadDirectorImage);
router.delete('/director/:id', adminOnly, editingController.eraseDirector);

// ---------------------- CASTING ----------------------
router.post('/casting', adminOnly, editingController.addCasting);
router.put('/casting/:id', adminOnly, editingController.editingCasting);
router.put('/casting/:id/image', adminOnly, safeUpload, editingController.uploadCastingImage);
router.delete('/casting/:id', adminOnly, editingController.eraseCasting);

// ---------------------- SCREENWRITER ----------------------
router.post('/screenwriter', adminOnly, editingController.addScreenwriter);
router.put('/screenwriter/:id', adminOnly, editingController.editingScreenwriter);
router.put(
  '/screenwriter/:id/image',
  adminOnly,
  safeUpload,
  editingController.uploadScreenwriterImage
);
router.delete('/screenwriter/:id', adminOnly, editingController.eraseScreenwriter);

// ---------------------- COMPOSITOR ----------------------
router.post('/compositor', adminOnly, editingController.addCompositor);
router.put('/compositor/:id', adminOnly, editingController.editingCompositor);
router.put('/compositor/:id/image', adminOnly, safeUpload, editingController.uploadCompositorImage);
router.delete('/compositor/:id', adminOnly, editingController.eraseCompositor);

// ---------------------- STUDIO ----------------------
router.post('/studio', adminOnly, editingController.addStudio);
router.put('/studio/:id', adminOnly, editingController.editingStudio);
router.put('/studio/:id/image', adminOnly, safeUpload, editingController.uploadStudioImage);
router.delete('/studio/:id', adminOnly, editingController.eraseStudio);

// ---------------------- COUNTRY ----------------------
router.post('/country', adminOnly, editingController.addCountry);
router.put('/country/:id', adminOnly, editingController.editingCountry);
router.put('/country/:id/image', adminOnly, safeUpload, editingController.uploadCountryImage);
router.delete('/country/:id', adminOnly, editingController.eraseCountry);
router.get('/country/byname/:name', editingController.getCountryByName);

// ---------------------- GENRE ----------------------
router.post('/kind', adminOnly, editingController.addGenre);
router.put('/kind/:id', adminOnly, editingController.editingGenre);
router.delete('/kind/:id', adminOnly, editingController.eraseGenre);

// ---------------------- LANGUAGE ----------------------
router.post('/language', adminOnly, editingController.addLanguage);
router.put('/language/:id', adminOnly, editingController.editingLanguage);
router.delete('/language/:id', adminOnly, editingController.eraseLanguage);
router.get('/language/byname/:name', editingController.getLanguageByName);

// ---------------------- TAG ----------------------
router.post('/tag', adminOnly, editingController.addTag);
router.put('/tag/:id', adminOnly, editingController.editingTag);
router.delete('/tag/:id', adminOnly, editingController.eraseTag);
router.get('/tag/byname/:name', editingController.getTagByName);

// ---------------------- THEMA / FOCUS ----------------------
router.post('/focus', adminOnly, editingController.addFocus);
router.put('/focus/:id', adminOnly, editingController.editingFocus);
router.put('/focus/:id/image', adminOnly, safeUpload, editingController.uploadFocusImage);
router.delete('/focus/:id', adminOnly, editingController.eraseFocus);

module.exports = router;
