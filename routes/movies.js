const router = require('express').Router();

const {
  createMovieValidator, deleteMovieValidator,
} = require('../middlewares/validation.js');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidator, createMovie);
router.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
