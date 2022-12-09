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
const closeButtonInEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closeButtonInAddCard = popupAddCard.querySelector(".popup__close-button");

const closeButtonInImageView = popupImageView.querySelector(
  ".popup__close-button"
);

const saveEditProfileForm = popupEditProfile.querySelector(".popup__form");
const saveAddCardForm = popupAddCard.querySelector(".popup__form");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* edit profile */
const nameInEditForm = document.querySelector(".popup__input_type_name");
const jobInEditForm = document.querySelector(".popup__input_type_job");

/* add card */
const imageNameInAddCard = document.querySelector(
  ".popup__input_type_image-name"
);
const imageLinkInAddCard = document.querySelector(
  ".popup__input_type_image-link"
);

/* open image view */
const imageView = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__image-title");

/* template */
const template = document.querySelector(".template").content;
const cardsList = document.querySelector(".cards__list");

/* open popup */
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

/* close popup */
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup__close-button")) closePopup(popup);
  });
});

const createCard = (values) => {
  const cardsItem = template.querySelector(".cards__item").cloneNode(true);
  const cardsItemImage = cardsItem.querySelector(".cards__item-image");
  cardsItem.querySelector(".cards__item-title").textContent = values.name;
  cardsItemImage.setAttribute("src", values.link);
  cardsItemImage.setAttribute("alt", values.name);

  cardsItem
    .querySelector(".cards__item-like")
    .addEventListener("click", (e) =>
      e.target.classList.toggle("cards__item-like_active")
    );

  cardsItem
    .querySelector(".cards__item-delete")
    .addEventListener("click", (e) =>
      e.target.closest(".cards__item").remove()
    );
    
  cardsItemImage.addEventListener("click", () => {
    openPopup(popupImageView);
    imageView.setAttribute("src", cardsItemImage.getAttribute("src"));
    imageView.setAttribute("alt", values.name);
    imageTitle.textContent = values.name;
  });

  return cardsItem;
};

const renderCard = (values, cards = cardsList) => {
  cards.prepend(createCard(values));
};

initialCards.forEach((card) => renderCard(card));

/* edit profile */
function openEditProfile() {
  openPopup(popupEditProfile);
  nameInEditForm.value = profileName.textContent;
  jobInEditForm.value = profileJob.textContent;
}

function submitEditProfileForm(e) {
  e.preventDefault();
  profileName.textContent = nameInEditForm.value;
  profileJob.textContent = jobInEditForm.value;
  closePopup(popupEditProfile);
}

profileEditButton.addEventListener("click", openEditProfile);
saveEditProfileForm.addEventListener("submit", submitEditProfileForm);

/* add card */
function openAddCard() {
  saveAddCardForm.reset();
  openPopup(popupAddCard);
}

function submitAddCardForm(e) {
  e.preventDefault();
  renderCard({
    name: imageNameInAddCard.value,
    link: imageLinkInAddCard.value,
  });
  closePopup(popupAddCard);
}

profileAddButton.addEventListener("click", openAddCard);
saveAddCardForm.addEventListener("submit", submitAddCardForm);
