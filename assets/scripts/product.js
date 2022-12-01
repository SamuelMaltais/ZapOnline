// A FAIRE ICI
// Tu trouves le product specifique avec le id
// puis tu genere la page avec

//Changer count du panier addPanierCount(quantite), qte peut etre negative

//Le id que je t'ai provide
productId = $.urlParam('id');

//comment tu dump l'item dans le panier
ajouterItemPanier = (amount) => {
    try{
        var list = localStorage.getItem("shopping-cart")
        list.push([productId, amount])
        localStorage.setItem("shopping-cart", list)
    }
    catch{
            localStorage.setItem("shopping-cart", [productId, amount])
    }
}
// Genere quand le document est pret
$(document).ready(()=>{

})