var btnAgregar = document.querySelectorAll(".btn-agregar");
var tabla = document.querySelector(".tabla tbody");
var tablaDom = document.querySelector(".tabla");
var btnVaciar = document.querySelector("#btn-vaciar");
btnVaciar.addEventListener("click", vaciar);
var btncomprar = document.querySelector("#btn-comprar");
btncomprar.addEventListener("click", comprar);
var btnAgregarx3 = document.querySelectorAll(".btn-agregarx3");
var total = document.querySelector(".total");
var formCompra = document.querySelector(".container-formCompra");

var compra = [];


for (var botonAgregar of btnAgregar) {
    botonAgregar.addEventListener("click", agregar);
}


function agregarAlcarrito(contenedor, cantidad) {
    tablaDom.classList.add("tabla-visible");
    tablaDom.classList.remove("tabla-oculta");
    btnVaciar.classList.add("tabla-visible");
    btnVaciar.classList.remove("tabla-oculta");
    btncomprar.classList.add("tabla-visible");
    btncomprar.classList.remove("tabla-oculta");

    /* let imagen = this.parentNode.querySelector("#img-prod-carrito").src;
     let nombre = this.parentNode.querySelector("#nombre-prod").dataset.nombre;
     let precio = Number(this.parentNode.querySelector("#precio-prod").dataset.precio);*/

    let imagen = contenedor.querySelector("#img-prod-carrito").src;
    let nombre = contenedor.querySelector("#nombre-prod").dataset.nombre;
    let precio = Number(contenedor.querySelector("#precio-prod").dataset.precio);
    // let cantidad=1;
    precio = precio * cantidad;
    let productoExiste = false;
    for (let i = 0; i < compra.length; i++) {
        if (compra[i].nombre === nombre) {
            productoExiste = true;
            compra[i].cantidad = compra[i].cantidad + cantidad;

        }
    }
    if (!productoExiste) {
        let objetoProducto = {
            imagen: imagen,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,

        };
        compra.push(objetoProducto);
    }
    console.log(compra);
    mostrar();
}

function agregarTres() {
    var contenedor = this.closest(".container-prodDormitorio");
    agregarAlcarrito(contenedor, 3)
}
function agregar() {
    var contenedor = this.closest(".container-prodDormitorio");
    agregarAlcarrito(contenedor, 1)
}
//ver PORQUE NO ANDA
for (let botonAgregar3 of btnAgregarx3) {
    botonAgregar3.addEventListener("click", agregarTres);
}

//REDUCIR CODIGO

function mostrar() {
    tabla.innerHTML = "";
    let totalCompra = 0;

    for (let i = 0; i < compra.length; i++) { // Recorrer el arreglo de objetos
        if (compra[i].cantidad > 3) {
            tabla.innerHTML += "<tr class=destacadoMenor>" +
                "<td><img src='" + compra[i].imagen + "'></td>" +
                "<td>" + compra[i].nombre + "</td>" +
                "<td>" + "$" + compra[i].precio + "</td>" +
                "<td><button class='btn-sumar'>+</button><span>" + compra[i].cantidad + "</span><button class='btn-restar'>-</button></td>" +
                "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +
                "</tr>"
        } else {
            tabla.innerHTML += "<tr>" +
                "<td><img src='" + compra[i].imagen + "'></td>" +
                "<td>" + compra[i].nombre + "</td>" +
                "<td>" + "$" + compra[i].precio + "</td>" +
                "<td><button class='btn-sumar'>+</button><span>" + compra[i].cantidad + "</span><button class='btn-restar'>-</button></td>" +
                "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +
                "</tr>"
        }


        let btnDelete = document.querySelectorAll(".btn-delete");
        for (let botonDelete of btnDelete) {
            botonDelete.addEventListener("click", eliminarItem);
        }
        let btnSumar = document.querySelectorAll(".btn-sumar");
        let btnRestar = document.querySelectorAll(".btn-restar");

        for (let i = 0; i < btnSumar.length; i++) {
            let cantidad = compra[i].cantidad;
            btnSumar[i].addEventListener("click", function () {
                cantidad++;
                compra[i].cantidad = cantidad;
                mostrar();// actualizar tabla y total
            });

            btnRestar[i].addEventListener("click", function () {
                if (cantidad > 1) {
                    cantidad--;
                    compra[i].cantidad = cantidad;
                    mostrar();// actualizar tabla y total
                }
            });
        }


        console.log(compra)
        totalCompra += Number(compra[i].precio) * Number(compra[i].cantidad);
        total.innerHTML = "TOTAL: $" + totalCompra; // Actualizar el total sin mostrar el total anterior

    }
}


/* el método splice para eliminar un elemento específico del array. 
Además, es importante eliminar el elemento correspondiente del array compra para que no se muestre en la tabla. 
*/


function eliminarItem() {
    let fila = this.closest('tr');
    let i = Array.from(fila.parentNode.children).indexOf(fila);
    compra.splice(i, 1);
    if (compra.length === 0) {
        vaciar();
    }
    mostrar();
}

function vaciar() {
    tabla.innerHTML = "";
    compra = [];
    total.textContent = "";
    tablaDom.classList.remove("tabla-visible");
    tablaDom.classList.add("tabla-oculta");
    btnVaciar.classList.remove("tabla-visible");
    btnVaciar.classList.add("tabla-oculta");
    btncomprar.classList.remove("tabla-visible");
    btncomprar.classList.add("tabla-oculta");

}

function comprar(e) {
    e.preventDefault();

    formCompra.innerHTML += `<h2 class=color-fuente>Ingrese sus datos para el envio</h2>` +
        `<form id=formCliente>
                                    <label for="Nombre y Apellido">Nombre y Apellido</label>
                                    <input type="text" name="NombreyApellido">
                                    <label for="Direccion">Dirección</label>
                                    <input type="text" name="Direccion">
                                    <label for="Telefono">Telefono</label>
                                    <input type="text" name="Telefono">
                                    <button class=btn-formAgregar>ENVIAR DATOS</button>
                                </form>`
    let formCliente = document.querySelector("#formCliente");
    formCliente.addEventListener("submit", agregarCliente);



}



function agregarCliente(e) {
    e.preventDefault();
    let form = document.querySelector("#formCliente");
    let formData = new FormData(form);

    let nuevoCliente = {
        NombreyApellido: formData.get("NombreyApellido"),
        Direccion: formData.get("Direccion"),
        Telefono: formData.get("Telefono")
    };


    compra.clientes.push(nuevoCliente);
    console.log(clientes)

}

