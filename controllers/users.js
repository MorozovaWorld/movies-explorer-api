const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Err400BadRequest = require('../errors/Err400BadRequest');
const Err401Unauthorized = require('../errors/Err401Unauthorized');
const Err404NotFound = require('../errors/Err404NotFound');
const Err409Conflict = require('../errors/Err409Conflict');

const {
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  ERROR_VALIDATION,
  ERROR_ID_UNVALID,
  ERROR_USER_ID_NOT_FOUND,
  ERROR_ACСESS_UNAUTHORIZED,
  ERROR_EMAIL_CONFLICT,
  ERROR_EMAIL_OR_PASSWORD_ABSENTS,
} = require('../utils/constants.js');

const handleUpdateErrors = (err, res, next) => {
  if (err.name === 'ValidationError') {
    const validationError = new Err400BadRequest(`${ERROR_VALIDATION} ${err}`);
    next(validationError);
  }
  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    const conflictError = new Err409Conflict(ERROR_EMAIL_CONFLICT);
    next(conflictError);
  }
  if (err.name === 'CastError') {
    const badIdError = new Err400BadRequest(ERROR_ID_UNVALID);
    next(badIdError);
  } else {
    next(err);
  }
};

const emailAndPasswordValidation = (email, password) => {
  if (!email || !password) {
    throw new Err400BadRequest(ERROR_EMAIL_OR_PASSWORD_ABSENTS);
  }
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  emailAndPasswordValidation(res, email, password);

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      _id: user._id,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        const conflictError = new Err409Conflict(ERROR_EMAIL_CONFLICT);
        next(conflictError);
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  emailAndPasswordValidation(email, password);

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.status(200).send({ token });
    })
    .catch(() => {
      const unauthorizedError = new Err401Unauthorized(ERROR_ACСESS_UNAUTHORIZED);
      next(unauthorizedError);
    });
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const notFoundError = new Err404NotFound(ERROR_USER_ID_NOT_FOUND);
      throw notFoundError;
    })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const badIdError = new Err400BadRequest(ERROR_ID_UNVALID);
        next(badIdError);
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const notFoundError = new Err404NotFound(ERROR_USER_ID_NOT_FOUND);
      throw notFoundError;
    })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => handleUpdateErrors(err, res, next));
};

module.exports = {
  createUser, updateProfile, login, getMe,
};
