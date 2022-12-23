//Fait par Felix Beaudoin, Samuel Maltais et Kelvin
var finireCommande = () => {
  //On vide le panier first
  localStorage.setItem("shopping-cart", null);
  localStorage.setItem("itemsPanier", 0);
  checkCount();
  try {
    var temp = parseInt(getItem("confirmationNum", 0));
    localStorage.setItem("confirmationNum", temp + 1);
  } catch {
    localStorage.setItem("confirmationNum", 1);
  }
};

$(document).ready(function () {
  $("#orderForm").validate({
    rules: {
      phoneNumber: {
        phoneUS: true,
        required: true,
      },
      carteCredit: {
        required: true,
        creditcard: true,
      },
      creditCardExpiry: {
        pattern: "^(0[1-9]|1[0-2])/?([0-9]{2})$",
      },
    },
    submitHandler: function (form) {
      finireCommande();
      window.location.href = "confirmation.html";
      return false;
    },
    invalidHandler: function (event, validator) {
      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        var message =
          "La date d’expiration de votre carte de crédit est invalide.";
        $("div.error span").html(message);
        $("div.error").show();
      } else {
        $("div.error").hide();
      }
    },
  });
});
