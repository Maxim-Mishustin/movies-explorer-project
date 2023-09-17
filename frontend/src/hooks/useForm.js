import { useState, useCallback } from "react"

const useForm = () => {
  const [enteredValues, setEnteredInputValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  //Обработчик формы
  const handleChangeInput = (event) => {
    const name = event.target.name
    const value = event.target.value

    // Обновляем состояние введенных данных
    setEnteredInputValues({
      ...enteredValues,
      [name]: value,
    })

    // Обновляем состояние ошибок валидации
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

    // Обновляем состояние валидности формы
    setIsFormValid(event.target.closest("#form").checkValidity())
  }

  //Функция для сброса формы. Устанавливает новые значения
  // состояний формы, переданные в аргументах.
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      // Устанавливаем новые значения состояний формы
      setEnteredInputValues(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsFormValid)
    },
    [setEnteredInputValues, setErrors, setIsFormValid]
  )
  return {
    enteredValues,
    handleChangeInput,
    isFormValid,
    errors,
    resetForm,
  }
}

export default useForm
