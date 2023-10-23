function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalCloseButton = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.forms["reserve"];
const formDataFields = document.querySelectorAll(".formData");
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputBirthdate = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const radioInputs = document.querySelectorAll('input[name="location"]');
const inputCheckbox = document.getElementById("checkbox1");

// Sélectionne la div de confirmation
const confirmationDiv = document.querySelector(".confirmation-message");
const closeBtnModal = document.getElementById("close-btn");

//Ecoute les événement input du formulaire
inputFirst.addEventListener("input", validateFirstName);
inputLast.addEventListener("input", validateLastName);
inputEmail.addEventListener("input", validateEmail);
inputBirthdate.addEventListener("input", validateBirthdate);
inputCheckbox.addEventListener("input", validateCheckbox);
// / Ajoute un gestionnaire d'événements "change" à chaque élément radio
radioInputs.forEach((radioInput) => {
  radioInput.addEventListener("change", validateRadioOptions);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validate();
});

function validate() {
  // Récupération des valeurs des champs
  const firstName = inputFirst.value.trim();
  const lastName = inputLast.value.trim();
  const email = inputEmail.value.trim();
  const Birthdate = inputBirthdate.value;
  const checkbox1 = inputCheckbox.checked;

  // Vérification des conditions
  validateFirstName();
  validateLastName();
  validateEmail();
  validateBirthdate();
  validateCheckbox();
  validateRadioOptions();
  let isAnyRadioChecked = false;

  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      isAnyRadioChecked = true;
    }
  });
  const isAllValide =
    firstName.length >= 2 &&
    lastName.length >= 2 &&
    isValidEmail(email) &&
    Birthdate &&
    checkbox1 &&
    isAnyRadioChecked;

  if (isAllValide) {
    // S'il n'y a pas d'erreurs, affiche le message de confirmation
    form.style.display = "none"; 
    confirmationDiv.style.display = "flex";
    confirmationDiv.classList.add("confirmation-message-succes");
  }
}

function validateFirstName() {
  const firstName = inputFirst.value.trim();
  if (firstName.length < 2) {
    inputFirst.parentNode.setAttribute(
      "data-error",
      "Le prénom doit contenir au moins 2 caractères."
    );
    inputFirst.parentNode.setAttribute("data-error-visible", "true");
  } else {
    inputFirst.parentNode.removeAttribute("data-error");
    inputFirst.parentNode.setAttribute("data-error-visible", "false");
  }
}

function validateLastName() {
  const lastName = inputLast.value.trim();
  if (lastName.length < 2) {
    inputLast.parentNode.setAttribute(
      "data-error",
      "Le nom doit contenir au moins 2 caractères."
    );
    inputLast.parentNode.setAttribute("data-error-visible", "true");
  } else {
    inputLast.parentNode.removeAttribute("data-error");
    inputLast.parentNode.setAttribute("data-error-visible", "false");
  }
}

function validateBirthdate() {
  const Birthdate = inputBirthdate.value;
  if (!Birthdate) {
    inputBirthdate.parentNode.setAttribute(
      "data-error",
      "Entrez votre date de naissance"
    );
    inputBirthdate.parentNode.setAttribute("data-error-visible", "true");
  } else {
    inputBirthdate.parentNode.removeAttribute("data-error");
    inputBirthdate.parentNode.setAttribute("data-error-visible", "false");
  }
}

function validateEmail() {
  const email = inputEmail.value.trim();
  if (!isValidEmail(email)) {
    inputEmail.parentNode.setAttribute("data-error","L'adresse e-mail n'est pas valide.");
    inputEmail.parentNode.setAttribute("data-error-visible", "true");
  } else {
    inputEmail.parentNode.removeAttribute("data-error");
    inputEmail.parentNode.setAttribute("data-error-visible", "false");
  }
}

// Fonction pour valider les options radio
function validateRadioOptions() {
  let isAnyRadioChecked = false;

  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      isAnyRadioChecked = true;
    }
  });

  if (!isAnyRadioChecked) {
    radioInputs[0].parentNode.setAttribute(
      "data-error",
      "Choissisez une option"
    );
    radioInputs[0].parentNode.setAttribute("data-error-visible", "true");
  } else {
    radioInputs[0].parentNode.removeAttribute("data-error");
    radioInputs[0].parentNode.setAttribute("data-error-visible", "false");
  }
}

function validateCheckbox() {
  const checkbox1 = inputCheckbox.checked;
  if (!checkbox1) {
    inputCheckbox.parentNode.setAttribute(
      "data-error",
      "Vous devez accepter les conditions d'utilisation"
    );
    inputCheckbox.parentNode.setAttribute("data-error-visible", "true");
  } else {
    inputCheckbox.parentNode.removeAttribute("data-error");
    inputCheckbox.parentNode.removeAttribute("data-error-visble", "false");
  }
}

// Fonction de validation d'adresse e-mail 
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//listen to modalCloseButton and close
modalCloseButton.addEventListener("click", function () {
  closeModal();
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

closeBtnModal.addEventListener("click", closeModal);
