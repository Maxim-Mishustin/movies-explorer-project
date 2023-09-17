import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { filterShortMovies, filterDurationMovies } from "../../utils/configFunc"
import * as movies from "../../utils/MoviesApi"

function Movies({ loggedIn, handleLikeFilm, onremoveCard, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isShortMovies, setIsShortMovies] = useState(false)
  const [hasRequestError, setHasRequestError] = useState(false)
  const [isNotFoundPage, setIsNotFoundPage] = useState(false)

  // Фильтрация фильмов
  function handleFilterMovie(movies, query, short) {
    const moviesCardList = filterShortMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(
      short ? filterDurationMovies(moviesCardList) : moviesCardList
    )
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  // Поиск фильмов
  function handleSearchFilterMovie(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      handleFilterMovie(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          handleFilterMovie(cardsData, query, isShortMovies)
          setHasRequestError(false)
        })
        .catch((err) => {
          setHasRequestError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // Пререключение чекбокса с фильмами
  function handleShortMovieFilter() {
    setIsShortMovies(!isShortMovies)
    if (!isShortMovies) {
      if (filterDurationMovies(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDurationMovies(initialCardsMovies))
      } else {
        setFilteredMovies(filterDurationMovies(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
  }

  // Получение короткометражных фильмов из локального хранилища
  useEffect(() => {
    setIsShortMovies(localStorage.getItem("shortMovies") === "true")
  }, [])

  // Получение фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationMovies(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFoundPage(filteredMovies.length === 0)
    } else {
      setIsNotFoundPage(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilter={handleShortMovieFilter}
        handleSearchFilterMovie={handleSearchFilterMovie}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        isLoading={isLoading}
        cards={filteredMovies}
        isSavedFilms={false}
        savedMovies={savedMovies}
        handleLikeFilm={handleLikeFilm}
        onremoveCard={onremoveCard}
        hasRequestError={hasRequestError}
        isNotFoundPage={isNotFoundPage}
      />
      <Footer />
    </section>
  )
}

export default Movies
