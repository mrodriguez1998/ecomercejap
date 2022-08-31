



document.getElementById("boton").addEventListener("click",function(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("contraseña").value;
    let condiciones = true;

    if(email == ""){
        condiciones = false;
        alert("Falta el email");
    }

    if(password == ""){
        condiciones = false;
        alert("Falta la contraseña");
    }

    if(condiciones){
        localStorage.setItem("usuario", email);
        //con esto dejamos seteado el email para poder mostrarlo luego en la punta derecha sup de la pantalla
        window.location.href = "login.html";
    }
})