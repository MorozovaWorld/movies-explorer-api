const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createMovieValidator, deleteMovieValidator,
} = require('../middlewares/validation.js');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, createMovieValidator, createMovie);
router.delete('/movies/:movieId', auth, deleteMovieValidator, deleteMovie);

module.exports = router;
