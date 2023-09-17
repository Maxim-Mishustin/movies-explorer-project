import React from "react"
import Form from "../Form/Form"
import useForm from "../../hooks/useForm"
import { EMAIL_PATTERN } from "../../utils/constants"
import "../Form/Form.css"

function Register({ onRegister, isLoading }) {
  // Хук useForm
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function updateUserInfo(event) {
    event.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      registrationMessage="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={updateUserInfo}
      isDisabledBtn={!isFormValid}
      isLoading={isLoading}
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
          placeholder="Ваше имя"
          onChange={handleChangeInput}
          value={enteredValues.name || ""}
        />
        <span className="form__input-error">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="Ваш Email"
          onChange={handleChangeInput}
          value={enteredValues.email || ""}
          pattern={EMAIL_PATTERN}
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
          placeholder="Ваш пароль"
          minLength="6"
          maxLength="12"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register
