const router = require('express').Router();

const userController = require('../controllers/userControllers');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

router.use(auth, adminOnly);

router.get('/user/sorted_id', userController.getAllUserIdDesc);

module.exports = router;
