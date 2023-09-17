import React from "react"
import "../Form/Form.css"
import { EMAIL_PATTERN } from "../../utils/constants"
import useForm from "../../hooks/useForm"
import Form from "../Form/Form"

function Login({ onAuthorization, isLoading }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function updateUserInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      registrationMessage="Еще не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
      isLoading={isLoading}
      isDisabledBtn={!isFormValid}
      onSubmit={updateUserInfo}
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="Ваш Email"
          pattern={EMAIL_PATTERN}
          onChange={handleChangeInput}
          value={enteredValues.email || ""}
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          minLength="6"
          maxLength="12"
          placeholder="Ваш пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
