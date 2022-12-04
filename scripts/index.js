const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/* popups */
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupImageView = document.querySelector(".popup_type_image-view");

/* forms */
const popupFormInEditProfile = popupEditProfile.querySelector(".popup__form");
const popupFormInAddCard = popupAddCard.querySelector(".popup__form");

/* buttons */
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
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
const list = document.querySelector(".cards__list");

const newCard = (values) => {
  const item = template.querySelector(".cards__item").cloneNode(true);
  const image = item.querySelector(".cards__item-image");
  item.querySelector(".cards__item-title").textContent = values.name;
  image.setAttribute("src", values.link);
  image.setAttribute("alt", values.name);

  item
    .querySelector(".cards__item-like")
    .addEventListener("click", (e) =>
      e.target.classList.toggle("cards__item-like_active")
    );

  item
    .querySelector(".cards__item-delete")
    .addEventListener("click", (e) =>
      e.target.closest(".cards__item").remove()
    );

  image.addEventListener("click", () => {
    openImageView();
    imageView.setAttribute("src", image.getAttribute("src"));
    imageView.setAttribute("alt", values.name);
    imageTitle.textContent = values.name;
  });

  return item;
};

const renderCard = (values, cards = list) => {
  cards.prepend(newCard(values));
};

initialCards.forEach((card) => renderCard(card));

/* edit profile */
function openEditProfile() {
  popupEditProfile.classList.add("popup_opened");
  nameInEditForm.value = profileName.textContent;
  jobInEditForm.value = profileJob.textContent;
}

function closeEditProfile() {
  popupEditProfile.classList.remove("popup_opened");
}

function sendFormInEditProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInEditForm.value;
  profileJob.textContent = jobInEditForm.value;
  closeEditProfile();
}

editButton.addEventListener("click", openEditProfile);
closeButtonInEditProfile.addEventListener("click", closeEditProfile);
saveEditProfileForm.addEventListener("submit", sendFormInEditProfile);

/* add card */
function openAddCard() {
  saveAddCardForm.reset();
  popupAddCard.classList.add("popup_opened");
}

function closeAddCard() {
  popupAddCard.classList.remove("popup_opened");
}

function sendFormInAddCard(e) {
  e.preventDefault();
  renderCard({
    name: imageNameInAddCard.value,
    link: imageLinkInAddCard.value,
  });
  closeAddCard();
}

addButton.addEventListener("click", openAddCard);
closeButtonInAddCard.addEventListener("click", closeAddCard);
saveAddCardForm.addEventListener("submit", sendFormInAddCard);

/* open image view */
function openImageView() {
  popupImageView.classList.add("popup_opened");
}

function closeImageView() {
  popupImageView.classList.remove("popup_opened");
}

closeButtonInImageView.addEventListener("click", closeImageView);
