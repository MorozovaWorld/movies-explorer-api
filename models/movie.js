const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true, 'Link required'],
    validate: {
      validator(v) {
        return /^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/.test(v);
      },
      message: (props) => `${props.value} is not a link!`,
    },
  },
  trailer: {
    type: String,
    required: [true, 'Link required'],
    validate: {
      validator(v) {
        return /^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/.test(v);
      },
      message: (props) => `${props.value} is not a link!`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Link required'],
    validate: {
      validator(v) {
        return /^(http|https):\/\/(www\.)?[A-Za-z0-9-]+\.([A-Za-z0-9-]\/)*[A-Za-z](\/([\w#!:[\].?+()$'~*,;=&%@!\-/])*)?#?/.test(v);
      },
      message: (props) => `${props.value} is not a link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', userSchema);
