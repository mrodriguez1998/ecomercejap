document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japceibal.github.io/emercado-api/products/" + (localStorage.getItem("productID")) + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data

            document.getElementById("contenidoProducto").innerHTML = `
            <h1>${product.name}</h1>
            <hr>
            <h2><b>Precio</b></h2>
            <h2>${product.currency}${product.cost}</h2>
            <h2><b>Descripcion</b></h2>
            <h2>${product.description}</h2>
            <h2><b>Categoria</b></h2>
            <h2>${product.category}</h2>
            <h2><b>Cantidad de vendidos</b></h2>
            <h2>${product.soldCount}</h2>
            <h2><b>Imagenes ilustrativas</b></h2>


            `

            let images = "";

            for (let foto of product.images) {

                images += `<div class="row">
                <img src = "${foto}" class="bd-placeholder img card-img-top">
                </div>`;

            }

            document.getElementById("fotosHtml").innerHTML = images;


        }

        else {
            alert("Lo rompiste, douh")
        };
    })
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japceibal.github.io/emercado-api/products_comments/" + (localStorage.getItem("productID")) + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data

            let comments = "";

            for (let comentario of productComments) {

                comments += `<div class="container">
                <h3><b>${comentario.user}</b>-${comentario.dateTime}</h3>
                <h3>${comentario.description}</h3>
                </div>`;

                document.getElementById("comentariosHtml").innerHTML = comments

            }
        }
    })
})

