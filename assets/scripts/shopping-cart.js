//Changer count du panier addPanierCount(quantite), qte peut etre negative
// shoppingCartItems, [[idItem,quantité],...]
//<a href="product.html?id=2"

var shoppingCartItems;

var extraireItems = () =>{
try{
    var shoppingCartItems = localStorage.getItem("shopping-cart")
}
// Si le shopping cart est vide
catch{
        localStorage.setItem("shopping-cart", [productId, amount])
}
}

// Genere quand le document est pret
$(document).ready(()=>{

})