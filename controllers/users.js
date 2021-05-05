const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  badIdError,
  notFoundError,
  unauthorizedError,
  conflictError,
  otherError,
  validationError,
  Err400BadRequest,
} = require('../utils/constants.js');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

const handleGetUserErrors = (err, res, next) => {
  if (err.message === 'Not Found') {
    next(notFoundError);
  }
  if (err.name === 'CastError') {
    next(badIdError);
  } else {
    next(otherError);
  }
};

const handleUpdateErrors = (err, res, next) => {
  if (err.name === 'ValidationError') {
    next(validationError);
  }
  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    next(conflictError);
  }
  if (err.name === 'CastError') {
    next(badIdError);
  }
  if (err.message === 'Not Found') {
    next(notFoundError);
  } else {
    next(otherError);
  }
};

const emailAndPasswordValidation = (email, password) => {
  if (!email || !password) {
    throw new Err400BadRequest('Не передан емейл или пароль');
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
        next(conflictError);
      } else {
        next(otherError);
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
      next(unauthorizedError);
    });
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error('Not Found');
    })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => handleGetUserErrors(err, res, next));
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('Not Found');
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
