const Movie = require('../models/movie');
const Err400BadRequest = require('../errors/Err400BadRequest');
const Err403Forbidden = require('../errors/Err403Forbidden');
const Err404NotFound = require('../errors/Err404NotFound');

const {
  ERROR_VALIDATION,
  ERROR_MOVIE_ID_NOT_FOUND,
  ERROR_MOVIE_DELETE_UNAUTHORIZED,
  ERROR_ID_UNVALID,
} = require('../utils/constants.js');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.status(200).send(movies))
  .catch((err) => {
    next(err);
  });

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validationError = new Err400BadRequest(`${ERROR_VALIDATION} ${err}`);
        next(validationError);
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      const notFoundError = new Err404NotFound(ERROR_MOVIE_ID_NOT_FOUND);
      throw notFoundError;
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        const forbiddenError = new Err403Forbidden(ERROR_MOVIE_DELETE_UNAUTHORIZED);
        throw forbiddenError;
      } else {
        return movie.remove()
          .then(res.status(200).send(movie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const badIdError = new Err400BadRequest(ERROR_ID_UNVALID);
        next(badIdError);
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
