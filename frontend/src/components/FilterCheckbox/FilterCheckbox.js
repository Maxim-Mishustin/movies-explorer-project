import React from "react"
import "./FilterCheckbox.css"

function FilterCheckbox({ onFilter, isShortMovies }) {
  return (
    <form className="filter">
      <label className="filter__label" htmlFor="short-movies-checkbox">
        <input
          className="filter__checkbox"
          id="short-movies-checkbox" // Добавлен id
          type="checkbox"
          onChange={onFilter}
          checked={isShortMovies}
        ></input>
        <span className="filter__checkbox-text">Короткометражки</span>
      </label>
    </form>
  )
}

export default FilterCheckbox
