export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* popups */
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupImageView = document.querySelector(".popup_type_image-view");
export const popupAddCard = document.querySelector(".popup_type_add-card");

/* buttons */
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");

/* forms */
export const popupFormInEditProfile =
  popupEditProfile.querySelector(".popup__form");
export const popupFormInAddCard = popupAddCard.querySelector(".popup__form");

/* fields */
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");