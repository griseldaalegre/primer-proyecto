"use strict"

document.addEventListener('DOMContentLoaded', function () {

    //BOTON RESPONSIVE
    document.querySelector(".btn-menu").addEventListener("click", cambiarMenu);


    //menu responsive
    function cambiarMenu() {
        document.querySelector(".menu").classList.toggle("cambio");
    }
})
