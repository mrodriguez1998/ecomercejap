var arrayDeIDS = [];
var carrito = JSON.parse(localStorage.getItem("carrito")); //Llama al posible carrito existente


document.addEventListener("DOMContentLoaded", function () {
    //Al cargar la pagina, mete en el html la info en formato tabla de el articulo
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
            subtotal();



        }

    }
    )
});





function costoFinal(articulo) {
    document.getElementById(articulo.id).innerHTML += ((parseInt(articulo.unitCost)) * (parseInt(articulo.count)))
    // Toma el valor del articulo, y lo multiplica por la cantidad en el momento para luego meterlo en el 
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
    <td><input type="number" id="cantidadArticulo${producto.id}" style="width: 50px;" min="1" value="${producto.count}" onchange="actualizarCosto(${producto.id}, ${producto.unitCost})" required></td>
    <td><b>${producto.currency}<div name=precioFinal id="${producto.id}"></div></b></td>
    <td><button type="button" class="btn btn-outline-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
    </svg></button></td>
    </tr>
    
    `
        costoFinal(producto)//la ejecutamos aca para que cuando cargue la pagina, comience ya teniendo costo final
        // console.log(JSON.parse(localStorage.getItem("productoNuevo")))//primera prueba de si guardaba el articulo en el formato correcto
    }
}

function actualizarCosto(ident, valor) {

    console.log(ident);
    console.log(valor);
    cant = document.getElementById("cantidadArticulo" + ident).value
    document.getElementById(ident).innerHTML = cant * valor

    subtotal()
    //Funcion que se ejecuta al variar la cantidad de articulos a comprar de un producto determinado, para con eso ajustar
    //los precios necesarios
}

function subtotal() {
    let precioFinal = [];
    productos = document.querySelectorAll("div[name=precioFinal]")
    productos.forEach(element => {
        precioFinal.push((parseFloat(element.innerHTML)) );  
    });
    let total = precioFinal.reduce((a, b) => a + b, 0);

    document.getElementById("subtotal").innerHTML = total

    costoEnvio()

    //Funcion que se ejecuta en conjunto con actualizarCosto, para corregir el subtotal al variar la cantidad
    //de un producto a comprar
}

function costoEnvio(){
    tipoEnvio = (parseFloat(document.querySelector("input[name=envio]:checked").value));
    costoProductos = (parseFloat((document.getElementById("subtotal")).innerHTML));
    document.getElementById("costoDelEnvio").innerHTML = tipoEnvio*costoProductos; 
    
    total()
    //Funcion que se ejecuta en conjunto con subtotal, para corregir el costo de envio al variar las cantidades
    //de los productos determinados
}

function total(){
    envio = parseFloat(document.getElementById("costoDelEnvio").innerHTML);
    articulos = parseFloat(document.getElementById("subtotal").innerHTML);
    document.getElementById("precioFinal").innerHTML = (envio)+(articulos);
    //Funcion que calcula el total de productos y envio
    }

document.getElementById("radioTransferencia").addEventListener("click", function(){
    document.getElementById("numeroDeCuenta").removeAttribute("disabled")
    document.getElementById("numeroTarjeta").setAttribute("disabled","")
    document.getElementById("codigoSeguridad").setAttribute("disabled","")
    document.getElementById("vencimiento").setAttribute("disabled","")
    document.getElementById("numeroDeCuenta").setAttribute("required","")
    document.getElementById("numeroTarjeta").removeAttribute("required")
    document.getElementById("codigoSeguridad").removeAttribute("required")
    document.getElementById("vencimiento").removeAttribute("required")
    document.getElementById("seleccionPago").innerHTML = "Transferencia bancaria"
    })

document.getElementById("radioTarjeta").addEventListener("click", function(){
    document.getElementById("numeroDeCuenta").setAttribute("disabled","")
    document.getElementById("numeroTarjeta").removeAttribute("disabled")
    document.getElementById("codigoSeguridad").removeAttribute("disabled")
    document.getElementById("vencimiento").removeAttribute("disabled")    
    document.getElementById("numeroDeCuenta").removeAttribute("required")
    document.getElementById("numeroTarjeta").setAttribute("required","")
    document.getElementById("codigoSeguridad").setAttribute("required","")
    document.getElementById("vencimiento").setAttribute("required","")
    document.getElementById("seleccionPago").innerHTML = "Tarjeta de credito"
})

//Estas últimas dos habilitan o deshabilitan los campos del modal segun el medio de pago quese elija

document.addEventListener("submit", function(event){
    console.log("boton comprar");

    event.preventDefault();

    let aCorroborar = document.querySelectorAll(".needs-validation")

    console.log(aCorroborar);
    aCorroborar.forEach(elemento =>{
        elemento.classList.add('was-validated')
    })

    if (!(document.getElementById("datosDePago")).checkValidity()){
        document.getElementById("alertaMediosDePago").classList.remove('d-none')
    } else {
        document.getElementById("alertaMediosDePago").classList.add('d-none')
    }

    if ((document.getElementById("datosDeEnvio")).checkValidity() && (document.getElementById("datosDePago")).checkValidity()) {
        console.log("entro a la alerta")
        document.getElementById("avisoSubmit").classList.add('alert-primary')
        document.getElementById("avisoSubmit").classList.add('show')
    }

    
})
