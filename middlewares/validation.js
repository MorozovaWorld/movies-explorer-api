// users validation
const { celebrate, Joi } = require('celebrate');

// users validation
const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
  }),
});

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
  }),
});

// movies validation
const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    year: Joi
      .string()
      .required(),
    description: Joi
      .string()
      .required(),
    image: Joi
      .string()
      .required()
      .pattern(/^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/),
    trailer: Joi
      .string()
      .required()
      .pattern(/^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/),
    thumbnail: Joi
      .string()
      .required()
      .pattern(/^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/),
    movieId: Joi
      .string()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .length(24),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  updateProfileValidator,
  createMovieValidator,
  deleteMovieValidator,
};
