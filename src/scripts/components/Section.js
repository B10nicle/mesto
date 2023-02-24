export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    return this._renderer(data);
  }

  addItem(item) {
    this._container.append(item);
  }

  clear() {
    this._container.innerHTML = "";
  }
}
