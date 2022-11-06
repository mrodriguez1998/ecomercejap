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
            subtotal();



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
    <td><input type="number" id="cantidadArticulo${producto.id}" style="width: 50px;" min="1" value="${producto.count}" onchange="actualizarCosto(${producto.id}, ${producto.unitCost})" required></td>
    <td><b>${producto.currency}<div name=precioFinal id="${producto.id}"></div></b></td>
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
}

function costoEnvio(){
    tipoEnvio = (parseFloat(document.querySelector("input[name=envio]:checked").value));
    costoProductos = (parseFloat((document.getElementById("subtotal")).innerHTML));
    document.getElementById("costoDelEnvio").innerHTML = tipoEnvio*costoProductos; 
    
    total()
}

function total(){
    envio = parseFloat(document.getElementById("costoDelEnvio").innerHTML);
    articulos = parseFloat(document.getElementById("subtotal").innerHTML);
    document.getElementById("precioFinal").innerHTML = (envio)+(articulos);
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

// Example starter JavaScript for disabling form submissions if there are invalid fields
document.getElementById("botonComprar").addEventListener("submit", (function () {
    console.log("hola");
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
    console.log(forms);
  
    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })())