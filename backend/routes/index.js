const router = require('express').Router();
const { registrUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

// Маршруты для пользователей и фильмов
const userRouter = require('./users');
const movieRouter = require('./movies');

const {
  loginUserValidator,
  registrUserValidator,
} = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError ');

// Маршрут регистрации пользователя
router.post('/signup', registrUserValidator, registrUser);

// Маршрут входа пользователя
router.post('/signin', loginUserValidator, loginUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
