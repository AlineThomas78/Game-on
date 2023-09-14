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
inputFirst.addEventListener("input", validateField);
inputLast.addEventListener("input", validateField);
inputEmail.addEventListener("input", validateField);
inputBirthdate.addEventListener("input", validateField);
inputCheckbox.addEventListener("input", validateField);
// radioInputs.addEventListener('input', validateField)

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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validate();
});

// Fonction de validation d'adresse e-mail simple
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateField(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value.trim();
  const fieldName = inputElement.id;
  let isAnyRadioChecked = false;

  // ecoute et vérification des conditions
  let isValid = true;
  let errorMessage = "";

  if (fieldName === "first") {
    if (inputValue.length < 2) {
      isValid = false;
      errorMessage = "Le prénom doit contenir au moins 2 caractères.";
    }
  } else if (fieldName === "last") {
    if (inputValue.length < 2) {
      isValid = false;
      errorMessage = "Le nom doit contenir au moins 2 caractères.";
    }
  } else if (fieldName === "email") {
    if (!isValidEmail(inputValue)) {
      isValid = false;
      errorMessage = "L'adresse e-mail n'est pas valide.";
    }
  } else if (fieldName === "birthdate") {
    if (!inputValue) {
      isValid = false;
      errorMessage = "Entrez votre date de naissance.";
    }
  } else if (fieldName === "checkbox1") {
    if (!inputCheckbox.checked) {
      isValid = false;
      errorMessage = "Vous devez accepter les conditions d'utilisation.";
    }
  }

  // Affiche ou masque les erreurs en fonction de la validité
  if (!isValid) {
    // Ajoutez la classe "formData" et attribut "data-error-visible"
    inputElement.parentNode.setAttribute("data-error-visible", "true");
    inputElement.parentNode.setAttribute("data-error", errorMessage);
  } else {
    // Supprime la classe "formData" et l'attribut "data-error-visible"
    inputElement.parentElement.removeAttribute("data-error-visible");
    inputElement.parentElement.removeAttribute("data-error");
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

  const errorElement = document.getElementById("error-inputRadio");

  if (!isAnyRadioChecked) {
    errorElement.textContent = "Vous devez choisir une option";
  } else {
    errorElement.textContent = "";
  }
}



function validate() {

  // Récupération des valeurs des champs
  const firstName = inputFirst.value.trim();
  const lastName = inputLast.value.trim();
  const email = inputEmail.value.trim();
  const Birthdate = inputBirthdate.value;
  const quantity = inputQuantity.value.trim();
  const checkbox1 = inputCheckbox.checked;
  const errorElement = document.getElementById("error-inputRadio");
       

  // Vérification des conditions
  const errors = [];
  let isAnyRadioChecked = false;

  if (firstName.length < 2) {
    errors.push("Le prénom doit contenir au moins 2 caractères.");
    inputFirst.setAttribute("data-error", "");
  } else {
    inputFirst.removeAttribute("data-error");
  }

  if (lastName.length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères.");
    inputLast.setAttribute("data-error", "");
  } else {
    inputLast.removeAttribute("data-error");
  }

  if (!Birthdate) {
    errors.push("Entrez votre date de naissance");
    inputBirthdate.setAttribute("data-error", "");
  } else {
    inputBirthdate.removeAttribute("data-error");
  }

  if (!isValidEmail(email)) {
    errors.push("L'adresse e-mail n'est pas valide.");
    inputEmail.setAttribute("data-error", "");
  } else {
    inputEmail.removeAttribute("data-error");
  }

  if (!checkbox1) {
    errors.push("Vous devez accepter les conditions d'utilisation");
    inputCheckbox.setAttribute("data-error", "");
  } else {
    inputCheckbox.removeAttribute("data-error");
  }

  // / Ajoute un gestionnaire d'événements "change" à chaque élément radio
  radioInputs.forEach((radioInput) => {
    radioInput.addEventListener("change", function () {
      validateRadioOptions();
    });
  });

  validateRadioOptions();

 
  if (errors.length > 0) {
    // Affiche les messages d'erreur sous les champs correspondants
    if (errors.includes("Le prénom doit contenir au moins 2 caractères.")) {
      document.getElementById("error-first").textContent =
        "Le prénom doit contenir au moins 2 caractères.";
    }

    if (errors.includes("Le nom doit contenir au moins 2 caractères.")) {
      document.getElementById("error-last").textContent =
        "Le nom doit contenir au moins 2 caractères.";
    }

    if (errors.includes("L'adresse e-mail n'est pas valide.")) {
      document.getElementById("error-email").textContent =
        "L'adresse e-mail n'est pas valide.";
    }

    if (errors.includes("Entrez votre date de naissance")) {
      document.getElementById("error-birthdate").textContent =
        "Entrez votre date de naissance";
    }

    if (errors.includes("Vous devez choisir une option")) {
      document.getElementById("error-inputRadio").textContent =
        "Vous devez choisir une option";
    }

    if (errors.includes("Vous devez accepter les conditions d'utilisation")) {
      document.getElementById("error-checkbox1").textContent =
        "Vous devez accepter les conditions d'utilisation";
    }

    // S'il y a des erreurs, n'affiche pas le message de confirmation
    confirmationDiv.innerHTML = "";
    form.style.display = "block";
  } else {
    // S'il n'y a pas d'erreurs, affiche le message de confirmation
    form.style.display = "none"; // Masque le formulaire
    confirmationDiv.style.display = "block";
    confirmationDiv.classList.add("confirmation-message-succes");
  }
  //Recherche des data-error dans le form
  const formDataErrors = document.querySelectorAll(".formData[data-error]");

  formDataErrors.forEach((element) => {
    element.classList.add(".formData[data-error]");
    element.style.display = "block";
  });
}


