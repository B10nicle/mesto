import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCards } from "../utils/initialCards";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import "../../pages/index.css";

import {
  popupFormInEditProfile,
  popupFormInAddCard,
  profileEditButton,
  profileAddButton,
  popupEditProfile,
  popupImageView,
  popupAddCard,
  profileName,
  profileJob,
  settings,
} from "../utils/constants.js";

/* enable validation in edit profile */
const popupFormInEditProfileValidation = new FormValidator(
  settings,
  popupFormInEditProfile
);
popupFormInEditProfileValidation.enableValidation();

/* enable validation in add card */
const popupFormInAddCardValidation = new FormValidator(
  settings,
  popupFormInAddCard
);
popupFormInAddCardValidation.enableValidation();

/* create a new instance of Section class */
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "template", handleCardClick);
      return card.generate();
    },
  },
  ".cards__list"
);

/* render initial cards */
section.renderCards();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

/* create a new instance of UserInfo class */
const userInfo = new UserInfo({
  name: profileName,
  job: profileJob,
});

/* create a new instance of PopupWithForm class for image view */
const popupImage = new PopupWithImage(popupImageView);

/* create a new instance of PopupWithForm class for editing a profile */
const popupEditProfileForm = new PopupWithForm(popupEditProfile, (e) => {
  e.preventDefault();
  const data = popupEditProfileForm.getInputs();
  userInfo.setUserInfo(data);
  popupEditProfileForm.close();
});

/* create a new instance of PopupWithForm class for adding a new card */
const popupAddCardForm = new PopupWithForm(popupAddCard, (e) => {
  e.preventDefault();
  section.addItem(popupAddCardForm.getInputs());
  popupAddCardForm.close();
});

popupEditProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupImage.setEventListeners();

profileAddButton.addEventListener("click", () => {
  popupFormInAddCardValidation.resetValidation();
  popupAddCardForm.open();
});

profileEditButton.addEventListener("click", () => {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  popupEditProfileForm.open();
});
