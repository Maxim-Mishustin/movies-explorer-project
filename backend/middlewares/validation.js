const { Joi, celebrate } = require('celebrate');

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const getUserInfoValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  }),
});

const registrUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const createMovieFilmValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieFilmValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  loginUserValidator,
  registrUserValidator,
  createMovieFilmValidator,
  getUserInfoValidator,
  deleteMovieFilmValidator,
  updateUserInfoValidator,
};
