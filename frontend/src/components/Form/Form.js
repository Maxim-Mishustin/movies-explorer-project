import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import logo from "../../images/logo.svg"

function Form({
  linkText,
  link,
  children,
  title,
  buttonText,
  registrationMessage,
  isLoading,
  isDisabledBtn,
  onSubmit,
}) {
  return (
    <main>
      <section className="form">
        <Link to="/" className="logo">
          <img src={logo} alt="Логотип сайта по поиску фильмов" />
        </Link>
        <h1 className="form__title">{title}</h1>
        <form className="forma" id="form" onSubmit={onSubmit} noValidate>
          {children}

          <button
            className={
              isDisabledBtn || isLoading
                ? "form__button-save form__button-save_inactive"
                : "form__button-save"
            }
            disabled={isDisabledBtn ? true : false}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
        <p className="form__text">
          {registrationMessage}
          <Link to={link} className="form__link">
            {linkText}
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Form
