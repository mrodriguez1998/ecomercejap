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
        window.location.href = "login.html";
    }
})