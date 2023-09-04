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
const inputQuantity = document.getElementById("quantity");
const inputBirthdate = document.getElementById("birthdate");
const radioInputs = document.querySelectorAll('input[name="location"]');
const inputCheckbox = document.getElementById("checkbox1");

// Sélectionne la div de confirmation
const confirmationDiv = document.getElementById("confirmation-message");

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
  const quantity = inputQuantity.value.trim();
  const checkbox1 = inputCheckbox.checked;

  // Fonction de validation d'adresse e-mail simple
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Vérification des conditions

  const errors = [];
  let isAnyRadioChecked = false;

  if (firstName.length < 2) {
    errors.push("Le prénom doit contenir au moins 2 caractères.");
    inputFirst.classList.add("error");
  } else {
    inputFirst.classList.remove("error");
  }

  if (lastName.length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères.");
    inputLast.classList.add("error");
  } else {
    inputLast.classList.remove("error");
  }

  if (!Birthdate) {
    errors.push("Entrez votre date de naissance");
    inputBirthdate.classList.add("error");
  } else {
    inputBirthdate.classList.remove("error");
  }

  if (!isValidEmail(email)) {
    errors.push("L'adresse e-mail n'est pas valide.");
    inputEmail.classList.add("error");
  } else {
    inputEmail.classList.remove("error");
  }

  if (!checkbox1) {
    errors.push("Vous devez accepter les conditions d'utilisation");
    inputCheckbox.classList.add("error");
  } else {
    inputCheckbox.classList.remove("error");
  }

  // Parcoure tous les input radio
  for (const radioInput of radioInputs) {
    if (radioInput.checked) {
      isAnyRadioChecked = true;
      break; // Si au moins un est coché, sortez de la boucle
    }
  }

  // Vérifie la variable isAnyRadioChecked
  if (!isAnyRadioChecked) {
    errors.push("Vous devez choisir une option");
    radioInputs.forEach((radioInput) => {
      radioInput.classList.add("error");
    });
  } else {
    radioInputs.forEach((radioInput) => {
      radioInput.classList.remove("error");
    });
  }

  if (errors.length > 0) {

    // Afficher les messages d'erreur sous les champs correspondants
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
      document.getElementById("error-checkbox").textContent =
        "Vous devez accepter les conditions d'utilisation";
    }
    // S'il y a des erreurs, n'affiche pas le message de confirmation
    confirmationDiv.innerHTML = "";
    form.style.display = "block";
  } else {
    // S'il n'y a pas d'erreurs, affiche le message de confirmation
    confirmationDiv.innerHTML = "Formulaire soumis avec succès !";

    form.style.display = "none"; // Masque le formulaire
  }
}
