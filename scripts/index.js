import { initialCards } from "./initialCards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* popups */
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

/* forms */
const popupFormInEditProfile = popupEditProfile.querySelector(".popup__form");
const popupFormInAddCard = popupAddCard.querySelector(".popup__form");

/* buttons */
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

/* fields */
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* edit profile */
const nameInEditForm = document.querySelector(".popup__input_name");
const jobInEditForm = document.querySelector(".popup__input_job");

/* add card */
const imageNameInAddCard = document.querySelector(".popup__input_image-name");
const imageLinkInAddCard = document.querySelector(".popup__input_image-link");

/* template */
const cardsList = document.querySelector(".cards__list");

/* enable validation in edit profile */
const popupFormInEditProfileValidation = new FormValidator(
  settings,
  popupFormInEditProfile
);
popupFormInEditProfileValidation.enableValidation();
//////

/* enable validation in add card */
const popupFormInAddCardValidation = new FormValidator(
  settings,
  popupFormInAddCard
);
popupFormInAddCardValidation.enableValidation();
//////

/* render a new card */
const renderCard = (data) => {
  const card = new Card(data, "template");
  cardsList.prepend(card.generate());
};
//////

/* initialize initial cards */
initialCards.forEach((card) => renderCard(card));
//////

/* open popup */
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};
//////

/* close popup */
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};
//////

/** close popup when esc is pressed */
const closePopupEsc = (e) => {
  if (e.key === "Escape") closePopup(document.querySelector(".popup_opened"));
};
//////

/* submit edit profile form */
popupFormInEditProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInEditForm.value;
  profileJob.textContent = jobInEditForm.value;
  closePopup(popupEditProfile);
});
//////

/* submit add card form */
popupFormInAddCard.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard({
    name: imageNameInAddCard.value,
    link: imageLinkInAddCard.value,
  });
  closePopup(popupAddCard);
});
//////

/** add button events */
profileAddButton.addEventListener("click", () => {
  popupFormInAddCard.reset();
  popupFormInAddCardValidation.toggleSubmitButtonSelector();
  openPopup(popupAddCard);
});
//////

/** edit button events */
profileEditButton.addEventListener("click", () => {
  nameInEditForm.value = profileName.textContent;
  nameInEditForm.dispatchEvent(new Event("input"));
  jobInEditForm.value = profileJob.textContent;
  jobInEditForm.dispatchEvent(new Event("input"));
  openPopup(popupEditProfile);
});
//////

/** close button events */
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup__close-button")) closePopup(popup);
    if (e.target.classList.contains("popup_opened")) closePopup(popup);
  });
});
//////

export { openPopup };
