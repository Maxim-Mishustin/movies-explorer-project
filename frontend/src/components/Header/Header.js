import React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import "./Header.css"
import logo from "../../images/logo.svg"
import account from "../../images/account-btn.svg"
import menu from "../../images/menu-btn.svg"
import Navigation from "../Navigation/Navigation"

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = React.useState(false)

  function handleOpenBurger() {
    setIsClicked(true)
  }

  function handleCloseBurger() {
    setIsClicked(false)
  }

  const setHeaderActiveColorLink = ({ isActive }) =>
    isActive ? "header__btn_active" : "header__btn"

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип сайта по поиску фильмов" />
          </Link>
          <nav className="header__btn-block">
            <Link to="/signup" className="header__btn">
              Регистрация
            </Link>
            <Link to="/signin" className="header__btn header__btn-green">
              Войти
            </Link>
          </nav>
        </header>
      ) : (
        <header className="header header_place">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип сайта по поиску фильмов" />
          </Link>
          <nav className="header__btn-block-films">
            <NavLink to="/movies" className={setHeaderActiveColorLink}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setHeaderActiveColorLink}>
              Сохранённые фильмы
            </NavLink>
          </nav>
          <div className="header__btn-block">
            <Link to="/profile" className="header__account-btn">
              <img
                className="header__account-image"
                src={account}
                alt="Кнопка входа в аккаунт"
              />
            </Link>
            <button className="header__menu-btn" onClick={handleOpenBurger}>
              <img src={menu} alt="Кнопка меню" />
            </button>
          </div>
          {isClicked ? (
            <Navigation handleCloseBurger={handleCloseBurger} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header
