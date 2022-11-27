// Code pour la barre de navigation et footer
// Regarde si le count d'items dans le panier devrait etre visible
var checkCount = () => {
    var itemsPanier = localStorage.getItem("itemsPanier");
    if(itemsPanier == 0){
        $(".count").css("visibility","hidden");
    }
    else{
        $(".count").css("visibility","visible");
    }
}
// Ajoute une quantite x
var addPanierCount = (amount) =>{
    var itemsPanier = localStorage.getItem("itemsPanier");
    
}
$(document).ready(() => {
    $("#hidden").click(() =>{
        console.log("ok")
        localStorage.setItem("itemsPanier", 1);
        $(this).css("color","red");
        checkCount();
    })
    var itemsPanier;
    localStorage.setItem("itemsPanier",0)
    checkCount();
});
