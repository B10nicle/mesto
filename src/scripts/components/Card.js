export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
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

  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".cards__item")
      .cloneNode(true);
  }

  _setEventListener() {
    this._imageItem.addEventListener("click", () => this._handleImageClick());

    this._cardItem
      .querySelector(".cards__item-like")
      .addEventListener("click", (e) => this._toggleLike(e));

    this._cardItem
      .querySelector(".cards__delete")
      .addEventListener("click", (e) => this._removeCard(e));
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _toggleLike(e) {
    e.target.classList.toggle("cards__item-like_active");
  }

  _removeCard(e) {
    this._cardItem.remove();
    this._cardItem = null;
  }
}
