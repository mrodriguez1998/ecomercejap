var cantidad = 1;
var arrayDeIDS = [];
var carrito = JSON.parse(localStorage.getItem("carrito"));



document.addEventListener("DOMContentLoaded", function () {
    //al cargar la pagina, mete en el html la info en formato tabla de el articulo
    getJSONData("https://japceibal.github.io/emercado-api/user_cart/25801.json").then(function (resultObj) {
        if (resultObj.status === "ok") {

    

            if ((localStorage.getItem("carrito") == null) && (localStorage.getItem("productoNuevo") == null)) {
                // Esto lo ejecuta la primera vez que entras a la pagina, y vas directo al carrito
                carrito = resultObj.data.articles;
                console.log("primer entrada al carrito, sin agragar nada nuevo, solo el peugeot");
                cargarArticulos();
                localStorage.setItem("carrito", JSON.stringify(carrito));

            } else if ((localStorage.getItem("carrito") !== null) && (localStorage.getItem("productoNuevo") == null)) {
                //Esto lo ejecuta cuando ya entraste al carrito alguna vez, pero no agregas nada nuevo (solo está el peugeot)
                cargarArticulos();
                console.log("entrada, solo con el peugeot cargado, nada nuevo");

            } else if ((localStorage.getItem("carrito") == null) && (localStorage.getItem("productoNuevo") !== null)) {
                //Esto lo ejecuta cuando entras a la pagina, y le das agregar al carrito a un articulo, sin
                //antes haber cargado la info del peugeot
                carrito = resultObj.data.articles;
                nuevoProducto = (JSON.parse(localStorage.getItem("productoNuevo")));
                carrito.push(nuevoProducto);
                cargarArticulos();
                localStorage.setItem("carrito", JSON.stringify(carrito));
                console.log("entrada, sin el peugeot cargado y con un articulo nuevo")

            } else {
                //Esto lo ejecuta cuando ya cargo la info del peugeot, y agregas un nuevo producto, y hay dos chances
                nuevoProducto = (JSON.parse(localStorage.getItem("productoNuevo")));
                identificador = nuevoProducto.id;
                console.log(identificador);

                for (let i = 0; i < carrito.length; i++) {
                    const articulo = carrito[i];
                    arrayDeIDS.push(carrito[i].id);
                } //Carga los ID de los articulos del carrito a un array para poder así comparar si estáel nuevo
                //producto a agregar o no

                console.log(arrayDeIDS);


                if ((arrayDeIDS.indexOf(identificador)) != -1) {
                    //Si el articulo al cual le das 'agregar al carrito' ya esta en el carrito, ejecuta esto
                    cargarArticulos();
                    console.log("hay producto nuevo, pero ya estaba cargado");
                } else {
                    //Si el articulo al cual le das 'agregar al carrito' NO esta en el carrito, ejecuta esto
                    carrito.push(nuevoProducto);
                    cargarArticulos();
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    console.log("hay producto nuevo, y no estaba cargado, lo carga y setea");
                };



            }



        }

    }
    )
});





function costoFinal(articulo) {
    document.getElementById(articulo.id).innerHTML += ((parseInt(articulo.unitCost)) * (parseInt(articulo.count)))
    // toma el valor del articulo, y lo multiplica por la cantidad en el momento para luego meterlo en el 
    // html,   
}

function cargarArticulos() {

    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        document.getElementById("contenedorCarrito").innerHTML += `
    <tr>
    <td><img src="${producto.image}" width=50px class=""></td>
    <td>${producto.name}</td>
    <td>${producto.currency}${producto.unitCost}</td>
    <td><input type="number" id="cantidadArticulo" style="width: 50px;" min="1" value="${producto.count}" onchange="costoFinal()" required></td>
    <td><b><div id="${producto.id}">${producto.currency}</div></b></td>
    </tr>
    
    `
        costoFinal(producto)//la ejecutamos aca para que cuando cargue la pagina, comience ya teniendo costo final
        // console.log(JSON.parse(localStorage.getItem("productoNuevo")))//primera prueba de si guardaba el articulo en el formato correcto
    }
}