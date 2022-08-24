
let productsArray = [];


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/" + (localStorage.getItem("catID")) + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            showProductsList()
            console.log(productsArray.catName)
            document.getElementById("pruebaCategoria").innerHTML = productsArray.catName;
            //no es la idea dejar esto aca pero por el momento funciona, consultar a daniel si esta bien o no (la ubicacion)//
        }
    });

  

        
    
        console.log(productsArray.catName)
        //prueba de si estaba imprimiento bien el dato, solo lo imprime bien dentro de la funcion anterior//

    

    function showProductsList(){

        let elementsArray = productsArray.products;

        let htmlContentToAppend = "";
        for(let i = 0; i < elementsArray.length; i++){
            let product = elementsArray[i];
    
    
                htmlContentToAppend += `
                <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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
    
            document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
})
