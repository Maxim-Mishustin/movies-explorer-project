import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navigation.css"
import account from "../../images/account-btn.svg"

function Navigation({ handleCloseBurger }) {
  const setActiveColorLinkMobile = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-block"></div>
      <div className="navigation__menu">
        <button
          className="navigation__close-btn"
          onClick={handleCloseBurger}
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className={setActiveColorLinkMobile}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={setActiveColorLinkMobile}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setActiveColorLinkMobile}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-btn">
          <img
            className="navigation__account-image"
            src={account}
            alt="Кнопка входа в аккаунт"
          />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
