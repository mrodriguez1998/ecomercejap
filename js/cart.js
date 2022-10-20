var carrito = {}
var cantidad = 1

document.addEventListener("DOMContentLoaded", function(){
    //al cargar la pagina, mete en el html la info en formato tabla de el articulo
    getJSONData("https://japceibal.github.io/emercado-api/user_cart/25801.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data.articles
            nuevoProducto = (JSON.parse(localStorage.getItem("productoNuevo")))
            identificador = nuevoProducto.id
            console.log(identificador);

            carrito.forEach(element => {if (element.id == identificador) {
                element.count++;
                cargarArticulos();
                console.log(identificador);
                localStorage.setItem(carrito);
            } else {
                carrito.push(nuevoProducto);
                cargarArticulos();                
                console.log(carrito);
                localStorage.setItem(carrito);
            }
                
            });
            
            
            }})})
        

    function costoFinal(articulo){
        document.getElementById(articulo.id).innerHTML +=((parseInt(articulo.unitCost))*(parseInt(articulo.count))) 
        // toma el valor del articulo, y lo multiplica por la cantidad en el momento para luego meterlo en el 
        // html,   
    }

    function cargarArticulos(){

        for(let i = 0; i < carrito.length; i++){
            let producto = carrito[i];
        document.getElementById("contenedorCarrito").innerHTML += `
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
    <td><img src="${producto.image}" width=50px class=""></td>
    <td>${producto.name}</td>
    <td>${producto.currency}${producto.unitCost}</td>
    <td><input type="number" id="cantidadArticulo" style="width: 50px;" min="1" value="${producto.count}" onchange="costoFinal()" required></td>
    <td><b><div id="${producto.id}">${producto.currency}</div></b></td>
    </tr>
    </table>
    `
    costoFinal(producto)//la ejecutamos aca para que cuando cargue la pagina, comience ya teniendo costo final
    console.log(JSON.parse(localStorage.getItem("productoNuevo")))//primera prueba de si guardaba el articulo en el formato correcto
        }}