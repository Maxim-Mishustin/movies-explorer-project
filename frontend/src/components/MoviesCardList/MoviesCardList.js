import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../Preloader/Preloader"
import {
  COUNT_MOVIES_DESKTOP,
  COUNT_MOVIES_TABLET,
  COUNT_MOVIES_MOBILE,
} from "../../utils/constants"
import SearchError from "../SearchError/SearchError"
import "./MoviesCardList.css"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  handleLikeFilm,
  onremoveCard,
  hasRequestError,
  isNotFoundPage,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  function findSavedMovieInList(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  // Определяет количество отображаемых карточек
  // в зависимости от ширины экрана
  function showCounterDisplayMovies() {
    const display = window.innerWidth
    if (display > 1160) {
      setShownMovies(12)
    } else if (display > 768) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  useEffect(() => {
    showCounterDisplayMovies()
  }, [cards])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showCounterDisplayMovies)
    }, 500)
    return () => {
      window.removeEventListener("resize", showCounterDisplayMovies)
    }
  })

  // Увеличивает количество карточек при клике на кнопку Ещё
  function showMoviesCountPlayBtn() {
    const display = window.innerWidth
    if (display > 1160) {
      setShownMovies(shownMovies + COUNT_MOVIES_DESKTOP)
    } else if (display > 768) {
      setShownMovies(shownMovies + COUNT_MOVIES_TABLET)
    } else {
      setShownMovies(shownMovies + COUNT_MOVIES_MOBILE)
    }
  }

  return (
    <section className="films">
      {isLoading && <Preloader />}
      {isNotFoundPage && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {hasRequestError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !hasRequestError && !isNotFoundPage && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="films__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={findSavedMovieInList(savedMovies, card)}
                    cards={cards}
                    card={card}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onremoveCard={onremoveCard}
                  />
                ))}
              </ul>
              <div className="films__button-container"></div>
            </>
          ) : (
            <>
              <ul className="films__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={findSavedMovieInList(savedMovies, card)}
                    cards={cards}
                    card={card}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onremoveCard={onremoveCard}
                  />
                ))}
              </ul>
              <div className="films__btn-block">
                {cards.length > shownMovies ? (
                  <button
                    className="films__btn"
                    onClick={showMoviesCountPlayBtn}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
