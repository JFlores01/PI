document.getElementById("btn__iniciarsesion").addEventListener("click", login);
document.getElementById("btn__registrarse").addEventListener("click", register);
const formulario = document.getElementById('formulario__register');
const formulariologin = document.getElementById('formulario__login');
const inputs = document.querySelectorAll('#formulario__register input');

//window.addEventListener("resize, anchopg");




//Declaración de las variables
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var caja_trasera_login = document.querySelector(".caja_trasera-login");
var caja_trasera_register = document.querySelector(".caja_trasera-register");

const expresiones = {
    Nombre: /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/, //letras, espacios, acentos  
    password: /^.{4,15}$/, //4 a 15 digitos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const nombre = document.getElementById('nombreregister');
const email = document.getElementById('correoregister');
const contrasena = document.getElementById('contrasenaregister');
const contrasena2 = document.getElementById('contrasenaregister2');
const verdadero = true;


formulario.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();



});

formulariologin.addEventListener('submit', e => {
    
    InicioSesion();
    
});

function checkInputs() {
    const nombreValue = nombre.value.trim();
    const emailValue = email.value.trim();
    const contrasenaValue = contrasena.value.trim();
    const contrasena2Value = contrasena2.value.trim();

    if (nombreValue === '') {
        setError(nombre, 'Rellene el campo por favor.');
        verdadero = false;
    } else if (!isNombre(nombreValue)) {
        setError(nombre, 'No ingreso un nombre válido.')
        verdadero = false;
    }
    else {
        setSuccesFor(nombre);

    }

    if (emailValue === '') {
        setError(email, 'Por favor, rellene el campo de forma correcta');
        verdadero = false;
    } else if (!isEmail(emailValue)) {
        setError(email, 'No ingreso un email valido.')
        verdadero = false;
    } else {
        setSuccesFor(email);
    }

    if (contrasenaValue === '') {
        setError(contrasena, 'Por favor, rellene el campo');
        verdadero = false;
    } else if (!isContrasena(contrasenaValue)) {
        setError(contrasena, 'Ingrese una contraseña entre 4 y 15 caracteres.');
        verdadero = false;
    } else {
        setSuccesFor(contrasena);
    }

    if (contrasena2Value === '') {
        setError(contrasena2, 'Por favor, repita la contraseña');
        verdadero = false;
    } else if (contrasena2Value == contrasenaValue) {
        setSuccesFor(contrasena2);
    } else {
        setError(contrasena2, 'Las contraseñas deben coincidir');
        verdadero = false;
    }

    if (verdadero) {




        var corr = document.getElementById("correoregister").value;
        var contra1 = document.getElementById("contrasenaregister").value;



        /*Guardando los datos en el LocalStorage*/
        var usuario = {
            corr: corr,
            contra1: contra1

        }


        var json = JSON.stringify(usuario);
        localStorage.setItem(corr, json);
        localStorage.setItem(contra1, json);
        console.log("Okey");

        /*Limpiando los campos o inputs*/
 

        window.location.replace("/index");
    }





}

function InicioSesion (e){
    event.preventDefault();

    var corr = document.getElementById("correologin").value;
    var contra1 = document.getElementById("contrasenalogin").value;



    var usuario = localStorage.getItem(corr, contra1);
    var datos = JSON.parse(usuario);
    
    if(usuario==null){
        alert("Datos Incorrectos");

    }else if( corr == datos.corr && contra1 == datos.contra1){

        window.location.replace("/index");  
    }else{
        alert("Datos Incorrectos");
    }
}



function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isNombre(nombre) {
    return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/.test(nombre);
}


function isContrasena(contrasena) {
    return /^.{4,15}$/.test(contrasena);
}

function isContrasena2(contrasena2) {
    return /^.{4,15}$/.test(contrasena2);
}


function login() {

    if (window.innerWidth > 840) {
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {

        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";

    }



}

function register() {
    if (window.innerWidth > 840) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }

}



