const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const inputErrorId = formElement.querySelector(`.${inputElement.id}-error`);
  inputErrorId.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
  inputErrorId.textContent = inputElement.validationMessage;
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const inputErrorId = formElement.querySelector(`.${inputElement.id}-error`);
  inputErrorId.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
  inputErrorId.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputSelectorList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleSubmitButtonSelector(
    inputSelectorList,
    submitButton,
    inactiveButtonClass
  );
  inputSelectorList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleSubmitButtonSelector(
        inputSelectorList,
        submitButton,
        inactiveButtonClass
      );
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formSelectorList = Array.from(document.querySelectorAll(formSelector));
  formSelectorList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

const hasInvalidInput = (inputSelectorList) => {
  return inputSelectorList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleSubmitButtonSelector = (
  inputSelectorList,
  submitButton,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputSelectorList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "");
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled", "");
  }
};

enableValidation(settings);
