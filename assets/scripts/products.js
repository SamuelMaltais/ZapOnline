produits = {};
organisation = "bas-haut";

var order
var filtrerCategories = (categorie) => {
    var list = [];
    for(item in produits){
        if(item.category == categorie){
            list.append(item)
        }
    }
    return list;
};

$(document).ready(()=>{ 
    
    console.log(filtrerCategories("computers"));
});