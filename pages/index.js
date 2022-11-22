const likeButtons = document.querySelectorAll(".card__item-like-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const saveButton = document.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const form = document.querySelector(".popup__form");
const nameInForm = document.getElementById("name");
const jobInForm = document.getElementById("job");
const popup = document.querySelector(".popup");

editButton.onclick = function () {
  popup.classList.add("popup_opened");
  nameInForm.value = profileName.textContent;
  jobInForm.value = profileJob.textContent;
  console.log("editButton is pressed");
};

closeButton.onclick = function () {
  popup.classList.remove("popup_opened");
  console.log("closeButton is pressed");
};

likeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("card__item-like-button_active");
  });
});

addButton.onclick = function () {
  alert("кнопочка нажата!");
};

document.addEventListener("click", (event) => {
  if (event.target === popup) popup.classList.remove("popup_opened");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") popup.classList.remove("popup_opened");
});

form.onsubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInForm.value;
  profileJob.textContent = jobInForm.value;
  popup.classList.remove("popup_opened");
  console.log("form is sent");
};
