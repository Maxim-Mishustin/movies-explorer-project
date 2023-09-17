import React from "react"
import "./MoviesCard.css"
import { durationConvertMovie } from "../../utils/configFunc"

function MoviesCard({
  card,
  saved,
  savedMovies,
  isSavedFilms,
  handleLikeFilm,
  onremoveCard,
}) {
  function onCardClick() {
    if (saved) {
      onremoveCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  function onDelete() {
    onremoveCard(card)
  }

  const cardLikeButtonClassName = `${
    saved ? "film__like-btn film__like-btn_active" : "film__like-btn"
  }`

  return (
    <>
      <li className="film" key={card.id}>
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="film__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>
        <div className="film__block">
          <div className="film__title-block">
            <h2 className="film__title">{card.nameRU}</h2>
            <p className="film__time">{durationConvertMovie(card.duration)}</p>
          </div>

          {isSavedFilms ? (
            <button
              type="button"
              className="film__delete-btn"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard
