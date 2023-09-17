import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { filterShortMovies, filterDurationMovies } from "../../utils/configFunc"
import SearchForm from "../SearchForm/SearchForm"

function SavedMovies({ loggedIn, savedMovies, onremoveCard }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [isShortMovies, setIsShortMovies] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isNotFoundPage, setIsNotFoundPage] = useState(false)

  useEffect(() => {
    const moviesCardList = filterShortMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortMovies ? filterDurationMovies(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortMovies, searchQuery])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFoundPage(true)
    } else {
      setIsNotFoundPage(false)
    }
  }, [filteredMovies])

  function handleShortMovieFilter() {
    setIsShortMovies(!isShortMovies)
  }

  function handleSearchFilterMovie(query) {
    setSearchQuery(query)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilter={handleShortMovieFilter}
        handleSearchFilterMovie={handleSearchFilterMovie}
      />
      <MoviesCardList
        isSavedFilms={true}
        cards={filteredMovies}
        savedMovies={savedMovies}
        onremoveCard={onremoveCard}
        isNotFoundPage={isNotFoundPage}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
