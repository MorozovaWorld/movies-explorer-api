// users validation
const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required()
      .min(4),
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
      .required()
      .min(4),
  }),
});

const getProfileByIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi
      .string()
      .length(24),
  }),
});

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .required()
      .min(2)
      .max(30),
  }),
});

const updateProfileAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .required()
      .pattern(/^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/),
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
  getProfileByIdValidator,
  updateProfileValidator,
  updateProfileAvatarValidator,
  createMovieValidator,
  deleteMovieValidator,
};
