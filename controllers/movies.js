const Movie = require('../models/movie');
const {
  badIdError,
  notFoundError,
  forbiddenError,
  otherError,
  validationError,
} = require('../utils/constants.js');

const handleIdErrors = (err, res, next) => {
  if (err.name === 'CastError') {
    next(badIdError);
  } else if (err.message === 'NotFound') {
    next(notFoundError);
  } else if (err.message === 'Forbidden') {
    next(forbiddenError);
  } else {
    next(otherError);
  }
};

const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(200).send(movies))
  .catch(() => {
    next(otherError);
  });

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(validationError);
      } else {
        next(otherError);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new Error('Forbidden');
      } else {
        movie.remove();
        return res.status(200).send(movie);
      }
    })
    .catch((err) => handleIdErrors(err, res, next));
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
