//Fait par Felix Beaudoin, Samuel Maltais et Kelvin Chen
// shoppingCartItems, [[idItem,quantité],...]
//<a href="product.html?id=2">

var shoppingCartItems = [];
var prixTotal = 0;

var extraireItems = () => {
  try {
    //parsing stupide pour avoir un array[idItem][quantité]
    var jsonString = localStorage.getItem("shopping-cart");

    jsonString = jsonString.replaceAll("{", "");
    jsonString = jsonString.replaceAll("}", "");
    jsonString = jsonString.replaceAll("\\", "");
    jsonString = jsonString.replaceAll('"', "");
    jsonArray = jsonString.split(",");
    for (let i = 0; i < jsonArray.length; i++) {
      subJsonArray = jsonArray[i].split(":");
      shoppingCartItems.push(subJsonArray);
    }
  } catch (err) {
    // Si le shopping cart est vide
    console.log(err);
  }
};
//bubble sort encore
var trier = (names) => {
  for (let k = names.length; k >= 0; k--) {
    for (let j = 0; j < k; j++) {
      if (j + 1 < k) {
        let alpha1 = names[j][0].charCodeAt(0);
        let alpha2 = names[j + 1][0].charCodeAt(0);
        if (alpha1 > alpha2) {
          console.log("swap");
          let temp = names[j];
          names[j] = names[j + 1];
          names[j + 1] = temp;
        }
      }
    }
  }

  for (let i = 0; i < names.length; i++) {
    shoppingCartItems[i] = names[i][1];
  }
};
var ordreAlphabetique = () => {
  names = [];
  for (let i = 0; i < shoppingCartItems.length; i++) {
    names = [];
    var some = getJson("data/products.json", shoppingCartItems[i][0]);
    some.then((response) => {
      names.push([response.name, shoppingCartItems[i]]);
      if (i == shoppingCartItems.length - 1) {
        trier(names);
        afficherItems();
      }
    });
  }

  for (let i = 0; i < names.length; i++) {
    shoppingCartItems[i] = names[i];
  }
};

var afficherItems = () => {
  if (isShoppingCartVide() | (shoppingCartItems[0] == "null")) {
    element = `<h3>Aucun produit dans panier</h3>`;
    $(".panier-order").html(element);
  } else {
    for (let i = 0; i < shoppingCartItems.length; i++) {
      if (shoppingCartItems[i].length != 0) {
        let productId = shoppingCartItems[i][0];
        let productQuantite = shoppingCartItems[i][1];

        var some = getJson("data/products.json", productId);

        some.then((response) => {
          $("#product-name-" + i).append(response.name);
          $("#product-prix-unitaire-" + i).append(response.price.toFixed(2));
          $("#product-prix-" + i).append(
            (parseFloat(response.price) * productQuantite).toFixed(2)
          );
          prixTotal += parseFloat(response.price) * productQuantite;
          $("#prix-total").html("Total: " + prixTotal.toFixed(2) + "$");
        });

        let element = ` <tr class="tr-product" id="product-${i}">
                                    <td><i class="fa fa-solid fa-plus fa-1x cancel" onclick="retirerItem(${i})"></i></td>
                                    <td><a href="product.html?id=${productId}"><span id="product-name-${i}"></span></a></td>
                                    <td><span id="product-prix-unitaire-${i}"></span>$</td>
                                    <td><i class="fa fa-solid fa-plus fa-1x" onclick="augmenterQuantite(${i})"></i><span id=product-quantite-${i}>${productQuantite}</span><i onclick="reduireQuantite(${i})" class="reduire-quantite fa fa-solid fa-minus"></i></td>
                                    <td class="prix-data"><span id="product-prix-${i}"></span>$</td>
                                </tr>`;

        $(".panier").find("tbody").append(element);
      }
    }
  }
};

var retirerItem = (i) => {
  if (confirm("Voulez-vous supprimer le produit du panier?")) {
    $("#product-" + i).remove();
    addPanierCount(-shoppingCartItems[i][1]);

    updatePrixTotal(shoppingCartItems[i]);

    shoppingCartItems[i] = null;
    updateLocalStorage();

    if (isShoppingCartVide()) {
      afficherItems();
    }
  }
};

var augmenterQuantite = (i) => {
  addPanierCount(1);
  shoppingCartItems[i][1]++;
  $("#product-quantite-" + i).html(shoppingCartItems[i][1]);
  updateLocalStorage();
  productQuantite = shoppingCartItems[i][1];

  var some = getJson("data/products.json", shoppingCartItems[i][0]);
  some.then((response) => {
    prixTotal += response.price;
    $("#prix-total").html("Total: " + prixTotal.toFixed(2) + "$");
    $("#product-prix-" + i).html((response.price * productQuantite).toFixed(2));
  });
  updateLocalStorage();
};
//Retire item du panier
var reduireQuantite = (i) => {
  if (shoppingCartItems[i][1] == 1) {
    return;
  }
  addPanierCount(-1);
  shoppingCartItems[i][1]--;
  $("#product-quantite-" + i).html(shoppingCartItems[i][1]);
  updateLocalStorage();
  productQuantite = shoppingCartItems[i][1];

  var some = getJson("data/products.json", shoppingCartItems[i][0]);
  some.then((response) => {
    prixTotal -= response.price;
    $("#prix-total").html("Total: " + prixTotal.toFixed(2) + "$");
    $("#product-prix-" + i).html((response.price * productQuantite).toFixed(2));
  });
};
// Nom qui sexplique tt seul lol
var updatePrixTotal = (item) => {
  productId = item[0];
  productQuantity = item[1];

  var some = getJson("data/products.json", productId);
  some.then((response) => {
    prixTotal -= response.price * productQuantity;
    $("#prix-total").html("Total: " + prixTotal.toFixed(2) + "$");
  });
};
//Aussi
var clearShoppingCart = () => {
  shoppingCartItems = "";
  localStorage.setItem("shopping-cart", null);
  localStorage.setItem("itemsPanier", 0);
  prixTotal = 0;
  afficherItems();
  checkCount();
};

var isShoppingCartVide = () => {
  if (shoppingCartItems == null) {
    return true;
  }
  for (let i = 0; i < shoppingCartItems.length; i++) {
    if (shoppingCartItems[i] != null) return false;
  }
  return true;
};

var updateLocalStorage = () => {
  let shoppingCartString = "{";

  for (let i = 0; i < shoppingCartItems.length; i++) {
    if (shoppingCartItems[i] != null) {
      //{"8":1,"11":1}
      shoppingCartString +=
        '"' +
        shoppingCartItems[i][0] +
        '"' +
        ":" +
        shoppingCartItems[i][1] +
        ",";
    }
  }
  shoppingCartString = shoppingCartString.slice(0, -1);
  if (shoppingCartString.length == 0) {
    localStorage.setItem("shopping-cart", null);
  } else {
    shoppingCartString += "}";
    localStorage.setItem("shopping-cart", shoppingCartString);
  }
};

//fetch specific information depending on url ID
const getJson = async (path, id) => {
  productData = await fetch(path).then((response) => response.json());
  return productData[id - 1];
};

// Genere quand le document est pret
$(document).ready(() => {
  console.log("ok");
  extraireItems();
  ordreAlphabetique();
});
