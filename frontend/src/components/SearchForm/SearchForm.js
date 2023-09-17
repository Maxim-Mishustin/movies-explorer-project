import React, { useState, useEffect } from "react"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom"
import "./SearchForm.css"

function SearchForm({ handleSearchFilterMovie, onFilter, isShortMovies }) {
  const location = useLocation()
  const [query, setQuery] = useState("")
  const [isQueryError, setIsQueryError] = useState(false)

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  function updateUserInfo(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      handleSearchFilterMovie(query)
    }
  }

  function updateQueryValue(event) {
    setQuery(event.target.value)
  }
  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={updateUserInfo}>
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          value={query || ""}
          onChange={updateQueryValue}
        ></input>
        <button className="search__btn" type="submit"></button>
      </form>
      <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies} />
      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
