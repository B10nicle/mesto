import { openPopup } from "./index.js";

export default class Card {
  popupImageView = document.querySelector(".popup_type_image-view");
  imageTitle = document.querySelector(".popup__image-title");
  imageView = document.querySelector(".popup__image");

  constructor(data, cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".cards__item")
      .cloneNode(true).children[0];
    return cardItem;
  }

  _setEventListener() {
    this._cardItem
      .querySelector(".cards__item-like")
      .addEventListener("click", (e) =>
        e.target.classList.toggle("cards__item-like_type_active")
      );

    this._cardElement
      .querySelector(".cards__item-delete")
      .addEventListener("click", (e) =>
        e.target.closest(".cards__item").remove()
      );

    this._imageItem.addEventListener("click", () => {
      openPopup(this.popupImageView);
      this.imageView.setAttribute("src", this._imageItem.getAttribute("src"));
      this.imageView.setAttribute("alt", this._name);
      this.imageTitle.textContent = this._name;
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
