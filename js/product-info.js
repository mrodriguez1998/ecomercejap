document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japceibal.github.io/emercado-api/products/" + (localStorage.getItem("productID")) + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data

            document.getElementById("contenidoProducto").innerHTML = `
            <h3>${product.name}</h3>
            <hr>
            <h4><b>Precio</b></h4>
            <h4>${product.currency}${product.cost}</h4>
            <h4><b>Descripcion</b></h4>
            <h4>${product.description}</h4>
            <h4><b>Categoria</b></h4>
            <h4>${product.category}</h4>
            <h4><b>Cantidad de vendidos</b></h4>
            <h4>${product.soldCount}</h4>
            <h4><b>Imagenes ilustrativas</b></h4>


            `

            let images = "";

            for (let foto of product.images) {

                images += `<div class="row">
                <img src = "${foto}" class="bd-placeholder img card-img-top">
                </div>`;

            }

            document.getElementById("fotosHtml").innerHTML = images;

            let productosRelacionados = "";

            for (let relacionado of product.relatedProducts) {

                productosRelacionados += `<div>
                <div onclick="setProductID(${relacionado.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${relacionado.image}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${relacionado.name}</h4>
                                </div>
                    </div>
                </div>
                </div>
                `;

            }

            document.getElementById("relatedProducts").innerHTML = productosRelacionados;

            


        }

        else {
            alert("Lo rompiste, douh")
        };
    })
});

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japceibal.github.io/emercado-api/products_comments/" + (localStorage.getItem("productID")) + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data

            let comments = "";

            for (let comentario of productComments) {

                comments += `<div class="container">
                <h4><b>${comentario.user}</b>-${comentario.dateTime} ${stars(comentario)}</h4>
                <h4>${comentario.description}</h4>
                </div>`;

                document.getElementById("comentariosHtml").innerHTML = comments

            }
        }
    })
})

function stars(coment){
    let puntos = coment.score;
    let contenido = "";

if(puntos == 1)



}