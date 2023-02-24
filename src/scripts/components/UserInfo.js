export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._about.textContent};
  }

  setAvatar(data) {
    this._avatar.setAttribute('src', data.avatar);
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.setAttribute('src', avatar);
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}
