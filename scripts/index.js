const nameInForm = document.querySelector(".popup__input_type_name");
const jobInForm = document.querySelector(".popup__input_type_job");
const closeButton = document.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const saveButton = document.querySelector(".popup__form");
const popup = document.querySelector(".popup");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInForm.value = profileName.textContent;
  jobInForm.value = profileJob.textContent;
  console.log("Edit button is pressed");
}

function closePopup() {
  popup.classList.remove("popup_opened");
  console.log("Close button is pressed");
}

function sendForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInForm.value;
  profileJob.textContent = jobInForm.value;
  closePopup();
  console.log("Form is sent");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("submit", sendForm);
