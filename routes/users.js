const router = require('express').Router();

const { updateProfileValidator } = require('../middlewares/validation.js');
const { updateProfile, getMe } = require('../controllers/users');

router.get('/users/me', getMe);
router.patch('/users/me', updateProfileValidator, updateProfile);

module.exports = router;
