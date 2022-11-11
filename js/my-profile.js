var emailIngresado = localStorage.getItem("usuario");
var usuarioIngresado = JSON.parse(localStorage.getItem("usuario" + "/" + emailIngresado));

document.addEventListener("DOMContentLoaded", function () {

    if (emailIngresado == null) {
        window.location.href = "index.html";
        //Al cargar la pagina, chequea si el usuario ingreso, sino, redirecciona al inicio para que lo haga
    } else if (usuarioIngresado != null) {
        //Ya habiendo ingresado, chequea si existe un objeto con los datos del usuario guardados, y si estan, los carga
        //en los respectivos inputs
        console.log("ingresa a leer los datos previamente guardados");
        document.getElementById("primerNombre").value = usuarioIngresado.nombreUno
        document.getElementById("segundoNombre").value = usuarioIngresado.nombreDos
        document.getElementById("primerApellido").value = usuarioIngresado.apellidoUno
        document.getElementById("segundoApellido").value = usuarioIngresado.apellidoDos
        document.getElementById("emailUsuario").value = emailIngresado
        document.getElementById("celularUsuario").value = usuarioIngresado.telefonoUsuario
    } else {
        //En caso que no esten, solo carga el input del correo
        document.getElementById("emailUsuario").value = emailIngresado
    }
}
)

document.getElementById("guardarCambiosUsuario").addEventListener("click", function () {

    if (document.getElementById("primerNombre").checkValidity() && document.getElementById("primerApellido").checkValidity()
        && document.getElementById("emailUsuario").checkValidity()) {

            //Al hacer click en "Guardar cambios", chequea si están todos los campos required guardados, de estarlo,
            //guarda lo ingresado en los inputs en el localStorage, y da alerta sobre el hecho

            console.log("todo ok")

        let datosUsuario = {}

        datosUsuario = {
            nombreUno: document.getElementById("primerNombre").value,
            nombreDos: document.getElementById("segundoNombre").value,
            apellidoUno: document.getElementById("primerApellido").value,
            apellidoDos: document.getElementById("segundoApellido").value,
            correoUsuario: emailIngresado,
            telefonoUsuario: document.getElementById("celularUsuario").value,
        }

        setTimeout(() => {
            document.getElementById("avisoPerfil").classList.remove("d-none")
            document.getElementById("avisoPerfil").classList.add("show")
        }, 0)
        setTimeout(() => {
            document.getElementById("avisoPerfil").classList.remove("show")
            document.getElementById("avisoPerfil").classList.add("d-none")
        }, 2.0 * 1000)

        localStorage.setItem("usuario" + "/" + emailIngresado, JSON.stringify(datosUsuario));
        console.log(localStorage.getItem("usuario" + "/" + emailIngresado))

    } else {

        //En caso que no esten los campos required completos, activa la alerta de "Rellene los campos"

        console.log("faltan campos");
        setTimeout(() => {
            document.getElementById("avisoError").classList.remove("d-none")
            document.getElementById("avisoError").classList.add("show")
        }, 0)
        setTimeout(() => {
            document.getElementById("avisoError").classList.remove("show")
            document.getElementById("avisoError").classList.add("d-none")
        }, 2.0 * 1000)
    }


})