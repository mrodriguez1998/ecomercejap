var emailIngresado = localStorage.getItem("usuario");
var usuarioIngresado = JSON.parse(localStorage.getItem("usuario" + "/" + emailIngresado));

document.addEventListener("DOMContentLoaded", function () {
    
    if (emailIngresado == null) {
        window.location.href = "index.html";
    } else if (usuarioIngresado != null) { 
        console.log("ingresa a leer los datos previamente guardados");
        document.getElementById("primerNombre").value = usuarioIngresado.nombreUno  
        document.getElementById("segundoNombre").value = usuarioIngresado.nombreDos 
        document.getElementById("primerApellido").value = usuarioIngresado.apellidoUno 
        document.getElementById("segundoApellido").value = usuarioIngresado.apellidoDos
        document.getElementById("emailUsuario").value = emailIngresado
        document.getElementById("celularUsuario").value = usuarioIngresado.telefonoUsuario
    } else {
        document.getElementById("emailUsuario").value = emailIngresado
    }
}
)

document.getElementById("guardarCambiosUsuario").addEventListener("click", function() {

    let datosUsuario = {}

    datosUsuario = {
        nombreUno: document.getElementById("primerNombre").value,
        nombreDos: document.getElementById("segundoNombre").value,
        apellidoUno: document.getElementById("primerApellido").value,
        apellidoDos: document.getElementById("segundoApellido").value,
        correoUsuario: emailIngresado,
        telefonoUsuario: document.getElementById("celularUsuario").value,
    }

    localStorage.setItem("usuario" + "/" + emailIngresado, JSON.stringify(datosUsuario));
    console.log(localStorage.getItem("usuario" + "/" + emailIngresado))   
})