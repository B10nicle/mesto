export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputSelectorList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  enableValidation = () => {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  };

  toggleSubmitButtonSelector = () => {
    this._hasInvalidInput(this._inputSelectorList)
      ? this._disableSubmitButton()
      : this._activateSubmitButton();
  };

  hideInputError = (element) => {
    const errorId = this._findErrorId;
    errorId.textContent = "";
    element.classList.remove(this._settings.inputErrorClass);
    errorId.classList.remove(this._settings.errorClass);
  };

  _checkInputValidity = (element) => {
    !element.validity.valid
      ? this._showInputError(element)
      : this._hideInputError(element);
  };

  _findErrorId = (element) => {
    this._formElement.querySelector(`.${element.id}-error`);
  };

  _showInputError = (element) => {
    const errorId = this._findErrorId;
    errorId.textContent = element.validationMessage;
    element.classList.add(this._settings.inputErrorClass);
    errorId.classList.add(this._settings.errorClass);
  };

  _hasInvalidInput = () => {
    this._inputSelectorList.some((element) => !element.validity.valid);
  };

  _disableSubmitButton = () => {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "");
  };

  _activateSubmitButton = () => {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.removeAttribute("disabled", "");
  };

  _setEventListeners = () => {
    this.toggleSubmitButtonSelector();
    this._inputSelectorList.forEach((element) => {
      element.addEventListener("input", () => {
        this._checkInputValidity(element);
        this.toggleSubmitButtonSelector();
      });
    });
  };
}
