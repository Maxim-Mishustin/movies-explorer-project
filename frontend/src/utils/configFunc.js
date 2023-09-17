import { MAX_SHORT_MOVIE_DURATION } from "./constants"

// Функция проверки ответа сервера
export const checkRes = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Конвертор в часы и минуты
export function durationConvertMovie(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}

// Длительность фильмов
export function filterDurationMovies(movies) {
  return movies.filter((movie) => movie.duration < MAX_SHORT_MOVIE_DURATION)
}

// Определение короткометражных фильмов
export function filterShortMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}
