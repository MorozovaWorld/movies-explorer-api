const Movie = require('../models/movie');
const Err400BadRequest = require('../errors/Err400BadRequest');
const Err403Forbidden = require('../errors/Err403Forbidden');
const Err404NotFound = require('../errors/Err404NotFound');
const Err500 = require('../errors/Err500');

const handleIdErrors = (err, res, next) => {
  if (err.name === 'CastError') {
    const badIdError = new Err400BadRequest('Невалидный id');
    next(badIdError);
  } else if (err.message === 'NotFound') {
    const notFoundError = new Err404NotFound('Фильм не найден');
    next(notFoundError);
  } else if (err.message === 'Forbidden') {
    const forbiddenError = new Err403Forbidden('Нет прав доступа к удалению фильма');
    next(forbiddenError);
  } else {
    const OtherError = new Err500('Внутренняя ошибка сервера');
    next(OtherError);
  }
};

const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(200).send(movies))
  .catch(() => {
    const OtherError = new Err500('Запрашиваемый ресурс не найден');
    next(OtherError);
  });

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ValidationError = new Err400BadRequest(`Произошла ошибка валидации: ${err}`);
        next(ValidationError);
      } else {
        const OtherError = new Err500('Внутренняя ошибка сервера');
        next(OtherError);
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
