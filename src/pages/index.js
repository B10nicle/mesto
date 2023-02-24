import PopupWithDelete from '../scripts/components/PopupWithDelete.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import Api from '../scripts/components/Api.js';
import "../pages/index.css";

import {
  buttonUpdateAvatar,
  popupUpdateAvatar,
  popupFormAddCard,
  popupFormProfile,
  popupEditProfile,
  popupDeleteCard,
  popupFormAvatar,
  popupUserAvatar,
  popupImageView,
  popupUserAbout,
  popupUserName,
  popupAddCard,
  buttonEdit,
  buttonAdd,
  settings
} from "../scripts/utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "1f43ff04-d4d6-48bf-b04f-ab223f18899b",
    "Content-Type": "application/json",
  },
})

function handleLikeCard(card) {
  if (card.isLike) {
    api.deleteLike(card._id)
      .then(res => {
        card.numberOfLikes(res.likes);
        card.statusLike();
        card.toggleLike();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  } else {
    api.setLike(card._id)
      .then(res => {
        card.numberOfLikes(res.likes);
        card.statusLike();
        card.toggleLike();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick(card) {
  popupWithDelete.setDeleteCard(card);
  popupWithDelete.open();
}

const section = new Section({
  items: [],
  renderer: (data) => {
    const card = new Card(
      data,
      userInfo.getUserId(),
      'template',
      handleCardClick,
      handleDeleteClick,
      handleLikeCard
    );
    return card.generate();
  }
}, '.cards__list');

const popupFormAddElementValidation = new FormValidator(settings, popupFormAddCard);
const popupFormWithAvatarValidation = new FormValidator(settings, popupFormAvatar);
const popupFormProfileValidation = new FormValidator(settings, popupFormProfile);
popupFormAddElementValidation.enableValidation();
popupFormWithAvatarValidation.enableValidation();
popupFormProfileValidation.enableValidation();

const userInfo = new UserInfo({
  name: popupUserName,
  about: popupUserAbout,
  avatar: popupUserAvatar
});

const popupAddElementForm = new PopupWithForm(popupAddCard, data => {
  api.setCard(data)
    .then((res) => {
      section.addItem(res)
      popupAddElementForm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAddElementForm.stopLoading();
    })
});

const popupProfileWithForm = new PopupWithForm(popupEditProfile, data => {
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfileWithForm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupProfileWithForm.stopLoading();
    })
})

const popupWithImage = new PopupWithImage(popupImageView);

const popupWithAvatar = new PopupWithForm(popupUpdateAvatar, data => {
  api.updateAvatar(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupWithAvatar.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupWithAvatar.stopLoading();
    })
})

const popupWithDelete = new PopupWithDelete(popupDeleteCard, card => {
  api.deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithDelete.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
});

Promise.all([
  api.getUserInfo(),
  api.getCard()
])
  .then(res => {
    userInfo.setUserInfo(res[0]);
    section.renderItems(res[1]);
  })
  .catch(err => console.error(err));

popupProfileWithForm.setEventListeners();
popupAddElementForm.setEventListeners();
popupWithDelete.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithImage.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupFormAddElementValidation.resetValidation();
  popupAddElementForm.open();
});

buttonEdit.addEventListener('click', () => {
  popupProfileWithForm.setInputValues(userInfo.getUserInfo());
  popupProfileWithForm.open();
})

buttonUpdateAvatar.addEventListener('click', () => {
  popupFormWithAvatarValidation.resetValidation();
  popupWithAvatar.open();
});