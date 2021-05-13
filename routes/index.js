const router = require('express').Router();
const usersRouter = require('./movies.js');
const movieRouter = require('./users.js');
const Err404NotFound = require('../errors/Err404NotFound');

router.use(usersRouter);
router.use(movieRouter);

router.use(() => {
  throw new Err404NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
