import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popupCard.querySelector(".popup__image-title");
    this._imageView = this._popupCard.querySelector(".popup__image");
  }

  open(name, link) {
    this._imageView.setAttribute("alt", name);
    this._imageView.setAttribute("src", link);
    this._imageTitle.textContent = name;
    super.open();
  }
}
