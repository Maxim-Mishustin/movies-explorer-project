const movieRouter = require('express').Router();

const {
  getMovies,
  createMovieFilm,
  deleteMovieFilm,
} = require('../controllers/movies');

const {
  createMovieFilmValidator,
  deleteMovieFilmValidator,
} = require('../middlewares/validation');

// Маршрут для получения фильмов
movieRouter.get('/movies', getMovies);

// Маршрут создания нового фильма
movieRouter.post('/movies', createMovieFilmValidator, createMovieFilm);

// Маршрут для удаления фильма
movieRouter.delete(
  '/movies/:movieId',
  deleteMovieFilmValidator,
  deleteMovieFilm,
);

module.exports = movieRouter;
