
let productsArray = [];


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/101.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            showProductsList()
        }
    });

    function showProductsList(){

        let elementsArray = productsArray.products;

        let htmlContentToAppend = "";
        for(let i = 0; i < elementsArray.length; i++){
            let category = elementsArray[i];
    
    
                htmlContentToAppend += `
                <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${category.name} - USD${category.cost}</h4>
                                <small class="text-muted">${category.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${category.description}</p>
                        </div>
                    </div>
                </div>
                `
            }
    
            document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
})
