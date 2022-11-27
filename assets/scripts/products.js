organisation = "bas-haut";
var organise = (list) => {
    if(organisation == "bas-haut" || organisation == "haut-bas"){
        max = list[0];
        index = 0;
        //bubble sort, petit n donc pas tres time consuming
        for(elem in list){
            prix = produits[list[elem]]
            
        }
    }
}

var filtrerCategories = (categorie) => {
    var list = [];
    for(item in produits){
        if(produits[item].category == categorie){
            list.push(item)
        }
    }
    return list;
};

$(document).ready(()=>{ 
    console.log(filtrerCategories("computers"));
});