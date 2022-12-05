// Code pour la barre de navigation et footer
// Regarde si le count d'items dans le panier devrait etre visible
var checkCount = () => {
    var itemsPanier = localStorage.getItem("itemsPanier");
    if(itemsPanier == 0){
        $(".count").css("visibility","hidden");
    }
    else{
        $(".count").css("visibility","visible");
        $(".count").html(itemsPanier);
    }
}
// Ajoute une quantite au count de panier
var addPanierCount = (amount) =>{
    var itemsPanier = parseInt(localStorage.getItem("itemsPanier"));
    itemsPanier += amount;
    localStorage.setItem("itemsPanier", itemsPanier);
    checkCount();
}
$(document).ready(() => {
    var itemsPanier;
    //valeure par defaut est de 0
    try{
        localStorage.getItem("itemsPanier")
    }
    catch(err){
        console.log(err)
        localStorage.setItem("itemsPanier",0)
    }
    checkCount();
});
