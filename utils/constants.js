const Err400BadRequest = require('../errors/Err400BadRequest');
const Err401Unauthorized = require('../errors/Err401Unauthorized');
const Err403Forbidden = require('../errors/Err403Forbidden');
const Err404NotFound = require('../errors/Err404NotFound');
const Err409Conflict = require('../errors/Err409Conflict');
const Err500 = require('../errors/Err500');

const badIdError = new Err400BadRequest('Невалидный id');
const unauthorizedError = new Err401Unauthorized('Неправильная почта или пароль');
const forbiddenError = new Err403Forbidden('Нет прав доступа');
const notFoundError = new Err404NotFound('Не найдено');
const conflictError = new Err409Conflict('Пользователь с таким емейлом уже зарегистрирован');
const otherError = new Err500('Внутренняя ошибка сервера');
const validationError = new Err400BadRequest('Произошла ошибка валидации');

module.exports = {
  badIdError,
  notFoundError,
  forbiddenError,
  otherError,
  validationError,
  conflictError,
  unauthorizedError,
  Err400BadRequest,
};
