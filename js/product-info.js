document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japceibal.github.io/emercado-api/products/" + (localStorage.getItem("productID")) + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data

            document.getElementById("contenidoProducto").innerHTML = `
            <br>
            <h2 class="space-top"><b>${product.name}</b><button type="button" class="btn btn-primary btn-lg" onclick="agregarAlCarrito()">Agregar al carrito</button></h2>
            <hr>
            <h4><b>Precio</b></h4>
            <h4>${product.currency}${product.cost}</h4>
            <h4><b>Descripcion</b></h4>
            <h4>${product.description}</h4>
            <h4><b>Categoria</b></h4>
            <h4>${product.category}</h4>
            <h4><b>Cantidad de vendidos</b></h4>
            <h4>${product.soldCount}</h4>
            <h4><b>Imagenes ilustrativas:</b></h4>


            `

            let images = "";

            for (let foto of product.images) {

                images += `<div class="col">
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

function agregarAlCarrito(){
    let productoParaAgregar = {}

    productoParaAgregar = {
        count: 1,
        currency: product.currency,
        id: parseInt((localStorage.getItem("productID"))),
        image: product.images[0],
        name: product.name,
        cost: product.cost,
    }

    localStorage.setItem("productoNuevo", JSON.stringify(productoParaAgregar));
    console.log(localStorage.getItem("productoNuevo"));
    window.location=("cart.html");

   
}

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

                comments += `<div class="container p-2 bg-light border">
                <h4><b>${comentario.user} </b>${comentario.dateTime}  ${estrellitas(comentario.score)}</h4>
                <h4>${comentario.description}</h4>
                </div>`;

                document.getElementById("comentariosHtml").innerHTML = comments

            }
        }
    })
})

function estrellitas(score) {
    let puntuacion = [];
    for (e = 0; e < score; e++) {

        puntuacion += `<span class="fa fa-star checked"></span>`;
    }

    for (a = 0; (score + a) < 5; a++) {

        puntuacion += `<span class="fa fa-star"></span>`;
    }

    return puntuacion;
};  //funcion para colocar estrellas en comentarios
