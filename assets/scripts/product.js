// A FAIRE ICI 
// Tu trouves le product specifique avec le id
// puis tu genere la page avec

//Changer count du panier addPanierCount(quantite), qte peut etre negative

//Le id que je t'ai provide


const urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var productId = urlParam('id')
 
//comment tu dump l'item dans le panier

ajouterItemPanier = (amountStr) => {
    var amount = parseInt(amountStr)
    try{
        var jsonString = localStorage.getItem("shopping-cart")
        var orderMap = JSON.parse(jsonString)

        if (orderMap[productId] != null) {
            orderMap[productId] += amount
        } else {
            orderMap[productId] = amount
            var currentLen = localStorage.getItem("itemsPanier")
            localStorage.setItem("itemsPanier", ++currentLen)
        }

        localStorage.setItem("shopping-cart", JSON.stringify(orderMap))
        console.log(localStorage.getItem("itemsPanier"))
    }
    catch {
        var orderMap = new Map();
        orderMap[productId] = amount
        localStorage.setItem("shopping-cart", JSON.stringify(orderMap))
        localStorage.setItem("itemsPanier", 1)
    }
}


//fetch specific information depending on url ID
const getJson = async(path, id) =>{
    productData =  await fetch(path).then((response) => response.json())    
    return productData[id-1]
}

// Genere quand le document est pret
$(document).ready(()=>{
    
    var some = getJson("data/products.json", productId)
    some.then(response => {
        $("#img"). attr("src", "./assets/img/" + response.image);
        $("#img"). attr("alt", response.name);
        $("#name").append(response.name);
        $("#description").append(response.description);
        $("#price").append(response.price + " $");
        for (i in response.features) {
            $("#characteristics").append( "<li>" + response.features[i] + "</li>" );
        }
    }).catch(err => {
        $(".product-page").empty();
        $(".product-page").append("<h1>Page non trouvée</h1>");
    })   
})

const showDialogue = () =>{
    var modal = document.getElementById("dialog");
    modal.style.display = "block";
    setTimeout(function(){
        modal.style.display = "none";
      },5000)
}