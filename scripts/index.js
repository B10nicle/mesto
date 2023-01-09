/* popups */
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupImageView = document.querySelector(".popup_type_image-view");

/* forms */
const popupFormInEditProfile = popupEditProfile.querySelector(".popup__form");
const popupFormInAddCard = popupAddCard.querySelector(".popup__form");

/* buttons */
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const saveCardButton = popupFormInAddCard.querySelector(".popup__save-button");

/* fields */
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* edit profile */
const nameInEditForm = document.querySelector(".popup__input_name");
const jobInEditForm = document.querySelector(".popup__input_job");

/* add card */
const imageNameInAddCard = document.querySelector(".popup__input_image-name");
const imageLinkInAddCard = document.querySelector(".popup__input_image-link");

/* open image view */
const imageView = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__image-title");

/* template */
const template = document.querySelector(".template").content;
const cardsList = document.querySelector(".cards__list");
////////////

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


/** close popup when overlay is pressed or cross button */
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("popup__close-button") ||
      e.target.classList.contains("popup_opened")
    )
      closePopup(popup);
  });
});
//////


/* create a new card */
const createCard = (values) => {
  const cardItem = template.querySelector(".cards__item").cloneNode(true);
  const cardItemImage = cardItem.querySelector(".cards__item-image");
  cardItem.querySelector(".cards__item-title").textContent = values.name;
  cardItemImage.setAttribute("src", values.link);
  cardItemImage.setAttribute("alt", values.name);

  cardItem
    .querySelector(".cards__item-like")
    .addEventListener("click", (e) =>
      e.target.classList.toggle("cards__item-like_active")
    );

  cardItem
    .querySelector(".cards__item-delete")
    .addEventListener("click", (e) =>
      e.target.closest(".cards__item").remove()
    );

  cardItemImage.addEventListener("click", () => {
    imageView.setAttribute("src", cardItemImage.getAttribute("src"));
    imageView.setAttribute("alt", values.name);
    imageTitle.textContent = values.name;
    openPopup(popupImageView);
  });

  return cardItem;
};
//////


/* render and initialize initial cards */
const renderCard = (values, cards = cardsList) => {
  cards.prepend(createCard(values));
};
initialCards.forEach((card) => renderCard(card));
//////


/* edit profile */
function openEditProfile() {
  openPopup(popupEditProfile);
  nameInEditForm.value = profileName.textContent;
  jobInEditForm.value = profileJob.textContent;
}
profileEditButton.addEventListener("click", openEditProfile);
//////


/* submit edit profile form */
function submitEditProfileForm(e) {
  e.preventDefault();
  profileName.textContent = nameInEditForm.value;
  profileJob.textContent = jobInEditForm.value;
  closePopup(popupEditProfile);
}
popupFormInEditProfile.addEventListener("submit", submitEditProfileForm);
//////


/* submit add card form */
function submitAddCardForm(e) {
  e.preventDefault();
  renderCard({
    name: imageNameInAddCard.value,
    link: imageLinkInAddCard.value,
  });
  closePopup(popupAddCard);
}
popupFormInAddCard.addEventListener("submit", submitAddCardForm);
//////


/* add new card */
profileAddButton.addEventListener("click", () => {
  popupFormInAddCard.reset();
  hideInputError(
    popupAddCard,
    imageNameInAddCard,
    settings.inputErrorClass,
    settings.errorClass
  );
  hideInputError(
    popupAddCard,
    imageLinkInAddCard,
    settings.inputErrorClass,
    settings.errorClass
  );

  if (!saveCardButton.classList.contains(settings.inactiveButtonClass)) {
    saveCardButton.classList.add(settings.inactiveButtonClass);
    saveCardButton.setAttribute("disabled", "");
  }
  openPopup(popupAddCard);
});
//////