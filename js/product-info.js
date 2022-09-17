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
                <h4><b>${comentario.user}</b>-${comentario.dateTime}</h4>
                <h4>${comentario.description}</h4>
                </div>`;

                document.getElementById("comentariosHtml").innerHTML = comments

            }
        }
    })
})

