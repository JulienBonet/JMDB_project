const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

// Public route
router.post('/login', authController.login);

// Admin-only routes
router.use('/user', auth, adminOnly);

router.post('/user', authController.register);
router.patch('/user/:id/password', authController.changePassword);
router.delete('/user/:id', authController.deleteUser);

module.exports = router;
