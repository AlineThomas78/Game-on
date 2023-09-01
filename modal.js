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
const inputFirst = document.getElementById('first');
const inputLast = document.getElementById('last');
const inputEmail = document.getElementById('email');
const inputQuantity = document.getElementById('quantity');
const inputBirthdate = document.getElementById('birthdate');
const inputLocation = document.getElementById('location');
const inputCheckbox = document.getElementById('checkbox1');



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

  // Création obj pour stocker les données du formulaire
  const formData = {
    first : inputFirst.value,
    last : inputLast.value,
    email : inputEmail.value,
    birthdate : inputBirthdate.value,
    quantity : inputQuantity.value,
    // location : inputLocation,
    ckeckbox : inputCheckbox.checked,
  };



  // Validez les données
  const firstName = formData["first"];
  const lastName = formData["last"];
  const email = formData["email"];
  const quantity = formData["quantity"];
  // const location = formData["location"];
  // const checkbox1 = document.getElementById("checkbox1");

 for (const input in formData) {
 
    const inputValue = formData[input];
    if (!isValid(input, inputValue)){
      const field = document.getElementById(input).parentNode;
      console.log(field)
    }
    
 }

  // if (
  //   firstName.trim().length < 2 ||
  //   lastName.trim().length < 2 ||
  //   !isValidEmail(email) ||
  //   isNaN(quantity) ||
  //   !location ||
  //   !checkbox1.checked
  // ) {
  //   // Si la validation échoue msg d'erreur
  //   alert("Veuillez remplir tous les champs correctement.");
  // } else {
  //   // Si la validation réussit, affichez le message de confirmation et fermez-le après un certain temps
  //   confirmationDiv.innerText = "Validation réussie. Le formulaire a été envoyé.";
  //   confirmationDiv.style.display = "block";

  //   // Fermez la div de confirmation après 3 secondes (ajustez le délai au besoin)
  //   setTimeout(function () {
  //     confirmationDiv.style.display = "none";
  //   }, 3000,);
    

  //   // soumission du form si tout est valide
  //   // form.validate();
  // }
});

// Fonction de validation d'adresse e-mail simple
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValid(inputName, inputValue) {
  if(inputName === "first") {
    return inputValue.trim().length >= 2;
  }

  if(inputName === "last") {
    return inputValue.trim().length >= 2;
  }

  if(inputName === "email") {
    return isValidEmail(inputValue);
  }

  if(inputName === "quantity") {
    return !isNaN(inputValue);
  }

  if(inputName === "location") {
    return !!location;
  }
}