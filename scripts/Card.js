import { openPopup } from "./index.js";

const popupImageView = document.querySelector(".popup_type_image-view");
const imageTitle = document.querySelector(".popup__image-title");
const imageView = document.querySelector(".popup__image");

export default class Card {
  constructor(data, cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".cards__item")
      .cloneNode(true);
  }

  _setEventListener() {
    this._cardItem
      .querySelector(".cards__item-like")
      .addEventListener("click", (e) =>
        e.target.classList.toggle("cards__item-like_active")
      );

    this._cardItem
      .querySelector(".cards__delete")
      .addEventListener("click", (e) =>
        e.target.closest(".cards__item").remove()
      );

    this._imageItem.addEventListener("click", () => {
      openPopup(popupImageView);
      imageView.setAttribute("src", this._link);
      imageView.setAttribute("alt", this._name);
      imageTitle.textContent = this._name;
    });
  }

  generate() {
    this._cardItem = this._getTemplate();
    this._imageItem = this._cardItem.querySelector(".cards__item-image");
    this._cardItem.querySelector(".cards__item-title").textContent = this._name;
    this._imageItem.setAttribute("src", this._link);
    this._imageItem.setAttribute("alt", this._name);
    this._setEventListener();
    return this._cardItem;
  }
}
