
document.addEventListener("DOMContentLoaded", function(){
    getJSONData("https://japceibal.github.io/emercado-api/user_cart/25801.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data.articles[0]
            console.log(carrito);

            document.getElementById("contenedorCarrito").innerHTML = `
            <table class="table">
            <tbody>
            <tr>
            <th></th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            </tr>
            <tr>
            <td><img src="${carrito.image}" width=50px class=""></td>
            <td>${carrito.name}</td>
            <td>U$S${carrito.unitCost}</td>
            <td>1</td>
            <td><b>${carrito}</b></td>
            </tr>
            </table>
            `
        }})})

       