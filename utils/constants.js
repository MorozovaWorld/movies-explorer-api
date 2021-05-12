const ERROR_VALIDATION = 'Произошла ошибка валидации:';
const ERROR_EMAIL_OR_PASSWORD_ABSENTS = 'Не передан емейл или пароль';
const ERROR_MOVIE_ID_NOT_FOUND = 'Карточка с фильмом не найдена';
const ERROR_USER_ID_NOT_FOUND = 'Пользователь не найден';
const ERROR_MOVIE_DELETE_UNAUTHORIZED = 'Нет прав доступа к удалению карточки фильма';
const ERROR_ID_UNVALID = 'Невалидный id';
const ERROR_ACСESS_UNAUTHORIZED = 'Неправильная почта или пароль';
const ERROR_EMAIL_CONFLICT = 'Пользователь с таким емейлом уже зарегистрирован';
const ERROR_AUTHORIZATION_NEEDED = 'Необходима авторизация';
const ERROR_LINK_NEEDED = 'Поле заполнено некорректно, необходима ссылка';

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

module.exports = {
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  ERROR_VALIDATION,
  ERROR_MOVIE_ID_NOT_FOUND,
  ERROR_MOVIE_DELETE_UNAUTHORIZED,
  ERROR_ID_UNVALID,
  ERROR_USER_ID_NOT_FOUND,
  ERROR_ACСESS_UNAUTHORIZED,
  ERROR_EMAIL_CONFLICT,
  ERROR_EMAIL_OR_PASSWORD_ABSENTS,
  ERROR_AUTHORIZATION_NEEDED,
  ERROR_LINK_NEEDED,
};
