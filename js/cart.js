var carrito = {}
var cantidad = 1

document.addEventListener("DOMContentLoaded", function(){
    //al cargar la pagina, mete en el html la info en formato tabla de el articulo
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
            <td><input type="number" id="cantidadArticulo" style="width: 50px;" min="1" value="1" onchange="costoFinal()" required></td>
            <td><b><div id="costoTotal"></div></b></td>
            </tr>
            </table>
            `
            costoFinal()//la ejecutamos aca para que cuando cargue la pagina, comience ya teniendo costo final
            console.log(JSON.parse(localStorage.getItem("productoNuevo")))
        }})})

    function costoFinal(){
        cantidad = document.getElementById("cantidadArticulo").value
        document.getElementById("costoTotal").innerHTML =("U$S")+(carrito.unitCost)*(cantidad) 
        //toma el valor del articulo, y lo multiplica por la cantidad en el momento para luego meterlo en el 
        //html,   
    }

       