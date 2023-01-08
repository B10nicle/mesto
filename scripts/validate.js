const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
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

const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputError.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
  inputError.textContent = inputElement.validationMessage;
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputError.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
  inputError.textContent = "";
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputSelectors = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleSubmitButtonSelector(
    inputSelectors,
    submitButton,
    inactiveButtonClass
  );
  inputSelectors.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleSubmitButtonSelector(
        inputSelectors,
        submitButton,
        inactiveButtonClass
      );
    });
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
enableValidation(settings);
