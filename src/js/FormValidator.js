"use strict";

export class FormValidator {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector("button");
    this.inputs = Array.from(this.form.querySelectorAll("input"));
    this.validate = this.validate.bind(this);
  }

  checkInputValidity(inputElement) {
    const error = inputElement.nextElementSibling;
    if (inputElement.validity.valueMissing) {
      error.classList.add("popup__error_active");
      error.textContent = "Это обязательное поле";
      return false;
    }
    if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      error.classList.add("popup__error_active");
      error.textContent = "Должно быть от 2 до 30 символов";
      return false;
    } else {
      error.classList.remove("popup__error_active");
      error.textContent = "";
      inputElement.removeAttribute("style");
      return true;
    }
  }

  setEventListeners() {
    this.form.addEventListener("input", this.validate);
    this.form.addEventListener("submit", this.validate);
  }

  validate() {
    let isValidForm = true;
    if (this.inputs.every((input) => this.checkInputValidity(input))) {
      isValidForm = true;
    } else isValidForm = false;
    this.setSubmitButtonState(isValidForm);
  }

  setSubmitButtonState(isValidForm) {
    if (isValidForm) {
      this.button.removeAttribute("disabled");
    } else {
      this.button.setAttribute("disabled", true);
    }
  }
}
