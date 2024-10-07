var captchaAleatorio = '';
var formEnviado = document.querySelector("#msj-form-enviado");
function obtenerDatosForm(formulario) {
    let formData = new FormData(formulario);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let email = formData.get("email");
    let mensaje = formData.get("mensaje");
}

function crearCaptcha() {
    let textCaptcha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
    let pCaptcha = document.querySelector("#captcha");
    pCaptcha.innerHTML = '';
    let captchaGenerado = [];


    for (let i = 1; i <= 7; i++) {
        captchaGenerado.push(textCaptcha[Math.floor(Math.random() * textCaptcha.length)])
    }
    captchaAleatorio = captchaGenerado.join('');
    pCaptcha.innerHTML = captchaAleatorio;
}



function ocultarMensajes() {
    formEnviado.classList.add('ocultar-mensaje-alerta');
}


function inicilizarScript() {
    let formulario = document.querySelector("#form");
    let inputUsuario = document.querySelector("#input-rta-usuario");


    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        obtenerDatosForm(formulario);
        let respuestaCheck = document.querySelector("#respuesta-check");
        let check = document.querySelector("#chequer");
        let respuestaCaptcha = document.querySelector("#respuesta-captcha");
        let checkCorrecto = false;
        let captchaCorrecto = false;
        if (inputUsuario.value.toString() === captchaAleatorio) {
            respuestaCaptcha.innerHTML = "Correcto.";
            respuestaCaptcha.classList.toggle('mensaje-respuesta-incorrecta');
            respuestaCaptcha.classList.add('mensaje-respuesta-correcta');
            captchaCorrecto = true;
        } else {
            respuestaCaptcha.innerHTML = "Incorrectos.";
            respuestaCaptcha.classList.remove('mensaje-respuesta-correcta');
            respuestaCaptcha.classList.add('mensaje-respuesta-incorrecta');
        }
        if (check.checked != true) {
            respuestaCheck.innerHTML = "Falta check.";
            respuestaCheck.classList.add('mensaje-respuesta-incorrecta');
        } else {
            respuestaCheck.innerHTML = "";
            respuestaCheck.classList.remove('mensaje-respuesta-incorrecta');
            checkCorrecto = true;
        }
        if (captchaCorrecto && checkCorrecto) {
            formEnviado.classList.remove('ocultar-mensaje-alerta');
            respuestaCaptcha.innerHTML = "";
            formulario.reset();
            check.checked = false;
            crearCaptcha();
        }
    }
    );
    document.querySelector("#btn-recargar").addEventListener("click", crearCaptcha);
    document.querySelector("#btn-cerrar-mensaje").addEventListener("click", ocultarMensajes);;

    let myInput = document.querySelector('#captcha');
    myInput.oncopy = function (e) {
        e.preventDefault();
    }
    crearCaptcha();

}

inicilizarScript();

