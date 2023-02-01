import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmitСallback) {
    super(popupSelector);
    this._popupSubmitСallback = popupSubmitСallback;
    this._popupForm = this._popupCard.querySelector(".popup__form");
    this._formInputList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupCard.querySelector(".popup__save-button");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  getInputs() {
    return this._getInputValues();
  }

  setInputValues(data) {
    this._formInputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      this._popupSubmitСallback(e);
    });
  }

  _getInputValues() {
    this._inputs = {};
    this._formInputList.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }
}
