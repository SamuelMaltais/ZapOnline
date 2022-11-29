produits = {}
organisation = "bas-haut";
currList = []
prevCat="#all"
all = []
var organise = (list) => {
    if(organisation == "bas-haut" | organisation == "haut-bas"){
        //bubble sort, petit n donc pas tres time consuming
        for(let i =list.length; i>=0;i--){
            for(let j=0;j<i; j++){
                if(j+1<i){
                    let price1 = produits[list[j]].price;
                    let price2 = produits[list[j+1]].price;
                    if(price1 > price2){
                        let temp = list[j]
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
        }
        if(organisation == "bas-haut"){  
            return list;
        }
        // inverse la liste pour haut-bas
        else{
            let reversedList = []
            for(let i=list.length-1; i>=0; i--){
                reversedList.push(list[i])
            }
            return reversedList
        }
    }
    //Egalement bubble sort, mais avec les valeures alphanumeriques pour comparer
    else{
        for(let i =list.length; i>=0;i--){
            for(let j=0;j<i; j++){
                if(j+1<i){
                    let alpha1 = produits[list[j]].name.charCodeAt(0);
                    let alpha2 = produits[list[j+1]].name.charCodeAt(0);
                    if(alpha1 > alpha2){
                        let temp = list[j]
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
        }
        if(organisation == "a-z"){  
            return list;
        }
        // inverse la liste pour haut-bas
        else{
            let reversedList = []
            for(let i=list.length-1; i>=0; i--){
                reversedList.push(list[i])
            }
            return reversedList
        }
    }
}
var filtrerCategories = (categorie) => {
    if(categorie == "all") return all;
    var list = [];
    for(item in produits){
        if(produits[item].category == categorie){
            list.push(item)
        }
    }
    return list;
};
var genererPage = (list) =>{
    $("#products-list").empty();
    for(let i = 0; i<list.length;i++){
        let product = produits[list[i]]
        let element = `<article><a href="product.html"><h3>${product.name}</h3> <img src="assets/img/${product.image}" alt="ok"><h4>${product.price}</h4></a></article>`
        $("#products-list").append(element)
    }
    $("#produits-qte").html(`${list.length} produits`)
}
var changerOrg = (str) =>{
    $("#"+organisation).removeClass("selected")
    organisation = str
    genererPage(organise(currList))
    $("#"+organisation).addClass("selected")
}
var changerCategorie = (str) =>{
    $(prevCat).removeClass("selected")
    prevCat = "#" + str;
    currList = filtrerCategories(str)
    genererPage(organise(currList))
    $("#"+str).addClass("selected")
}
$(document).ready(()=>{ 
    $.getJSON("data/products.json", (data) =>{
        produits = data
        for(let i=0; i<produits.length;i++){
            all.push(i)
        }
        currList = all;
        genererPage(organise(all))
    })
    //chaque categorie change l'organisation ou la categorie
    $("#haut-bas").click(() =>{
        changerOrg("haut-bas")
    })
    $("#bas-haut").click(() =>{
        changerOrg("bas-haut")
    })
    $("#a-z").click(() =>{
        changerOrg("a-z")
    })
    $("#z-a").click(() =>{
        changerOrg("z-a")
    })
    $("#computers").click(()=>{
        changerCategorie("computers")
    })
    $("#all").click(()=>{
        changerCategorie("all")
    })
    $("#screens").click(()=>{
        changerCategorie("screens")
    })
    $("#consoles").click(()=>{
        changerCategorie("consoles")
    })
    $("#cameras").click(()=>{
        changerCategorie("cameras")
    })
});