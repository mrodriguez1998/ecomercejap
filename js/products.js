const ORDER_ASC_BY_PRICE = "09";
const ORDER_DESC_BY_PRICE = "90";
const ORDER_BY_PROD_REL = "Rel";
let productsArray = [];
let currentSortCriteria = undefined;
let minPrecio = undefined;
let maxPrecio = undefined;
let search = "";

function sortProducts(criteria){

    let array = productsArray.products;
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductsList(){

    let elementsArray = productsArray.products;

    let htmlContentToAppend = "";
    for(let i = 0; i < elementsArray.length; i++){
        let product = elementsArray[i];

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(product.cost) >= minPrecio)) &&
            ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(product.cost) <= maxPrecio))){

                if (product.name.toLowerCase().includes(search.toLowerCase())) {
                    htmlContentToAppend += `
                    <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${product.name} - ${product.currency}${product.cost}</h4>
                                    <small class="text-muted">${product.soldCount} vendidos</small>
                                </div>
                                <p class="mb-1">${product.description}</p>
                            </div>
                        </div>
                    </div>
                    `  
                }            
            }
        }

        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsList){
    currentSortCriteria = sortCriteria;

    if(productsList != undefined){
        productsArray.products = productsList;
    }

    productsArray.products = sortProducts(currentSortCriteria, productsArray.products);


    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/" + (localStorage.getItem("catID")) + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            showProductsList()
            console.log(productsArray.catName)
            document.getElementById("pruebaCategoria").innerHTML = productsArray.catName;
            //No es la idea dejar esto aca pero por el momento funciona, consultar a daniel si esta bien o no (la ubicacion)//
        }
    });

    console.log(productsArray.catName)
    //Prueba de si estaba imprimiento bien el dato, solo lo imprime bien dentro de la funcion anterior//

    document.getElementById("priceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE)
        console.log(hola);;
    });

    document.getElementById("priceDes").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("relevanceOrd").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearProductsFilter").addEventListener("click", function(){
        document.getElementById("maxPrice").value = "";
        document.getElementById("minPrice").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        showProductsList();
    });

    document.getElementById("filterPrice").addEventListener("click", function(){
        
        minPrecio = document.getElementById("minPrice").value;
        maxPrecio = document.getElementById("maxPrice").value;
        
        console.log(minPrecio)
        console.log(maxPrecio)
     //Para probar si imprime

        if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
            minPrecio = parseInt(minPrecio);
        }
        else{
            minPrecio = undefined;
        }

        if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
            maxPrecio = parseInt(maxPrecio);
        }
        else{
            maxPrecio = undefined;
        }

        showProductsList();
    });
});


document.getElementById("buscadorProductos").addEventListener("input", function(){

        search = document.getElementById("buscadorProductos").value;
        showProductsList();

    });