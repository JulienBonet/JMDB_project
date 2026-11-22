const router = require('express').Router();

const purgeControllers = require('../controllers/purgeControllers');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

router.use(auth, adminOnly);

router.post('/purge', purgeControllers.purgeDatabase);

module.exports = router;
