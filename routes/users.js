const router = require('express').Router();
const auth = require('../middlewares/auth');

const { createUserValidator, loginValidator, updateProfileValidator } = require('../middlewares/validation.js');
const {
  createUser,
  login,
  updateProfile,
  getMe,
} = require('../controllers/users');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);

router.get('/users/me', auth, getMe);
router.patch('/users/me', auth, updateProfileValidator, updateProfile);

module.exports = router;
