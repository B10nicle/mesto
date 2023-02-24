import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor(popup, popupSubmitCallback) {
    super(popup);
    this._button = this._popup.querySelector('.popup__save-button_place_delete-card')
    this._popupSubmitCallback = popupSubmitCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._popupSubmitCallback(this._card);
    });
  }

  setDeleteCard(card) {
    this._card = card;
  }
}