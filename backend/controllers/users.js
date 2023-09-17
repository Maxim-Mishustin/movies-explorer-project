const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED_CODE } = require('../utils/constants');

const { NODE_ENV, AUTH_KEY } = process.env;
const { AUTH_KEY_DEV } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError ');
const DataConflictError = require('../errors/DataConflictError');

// Регистрация пользователя
const registrUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new DataConflictError('Такой пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};

// Логин пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание JWT-токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? AUTH_KEY : AUTH_KEY_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

// Получение пользователя
const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

// Редактирование пользователя
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DataConflictError('Такой пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  registrUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
};
