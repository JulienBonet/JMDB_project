const router = require('express').Router();

const auth = require('../middlewares/authMiddleware');
const languagesController = require('../controllers/languagesControllers');
router.use(auth);

router.get('/languages/sorted_id', languagesController.getAllLanguagesIdDesc);

module.exports = router;
