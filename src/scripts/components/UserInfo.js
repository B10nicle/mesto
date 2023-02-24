export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._about.textContent};
  }

  setUserInfo(data) {
    this.name = data.name;
    this.about = data.about;
    this.avatar = data.avatar;
    this._id = data._id;
    if (data.name) this._name.textContent = this.name;
    if (data.about) this._about.textContent = this.about;
    if (data.avatar) {
      this._avatar.src = this.avatar
      this._avatar.alt = this.name
    }
  }

  getUserId() {
    return this._id;
  }
}
