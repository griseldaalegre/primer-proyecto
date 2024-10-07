document.addEventListener('DOMContentLoaded', function () {

    async function cargarContenido(id) {
        let response;
        let contenido = document.querySelector("#container");
        try {
            contenido.innerHTML = ""; // Elimina el contenido existente
            switch (id) { //segun el "id", se hace una solicitud (fetch) 
                case 'btn-dormitorio':
                    response = await fetch(`${window.location.origin}/dormitorioProd.html`);
                    break;
                case 'btn-cortinas':
                    response = await fetch(`${window.location.origin}/cortinasProd.html`);
                    break;
                case 'btn-muebles':
                    response = await fetch(`${window.location.origin}/mueblesProd.html`);
                    break;
                case 'btn-deco':
                    response = await fetch(`${window.location.origin}/decoProd.html`);
                    break;
                default:
                    response = await fetch(`${window.location.origin}/${id}.html`);
                    break;
            }
            // si cargue el script de contacto lo elimino
            let scriptToRemove = document.querySelector("#scripContacto");
            if (scriptToRemove !== null) {
                // Elimina el script si existe
                document.head.removeChild(scriptToRemove);
            }

            // si cargue el script de contacto lo elimino
            let scripTablaDinamicaToRemove = document.querySelector("#scripTablaDinamica");
            if (scripTablaDinamicaToRemove !== null) {
                // Elimina el script si existe
                document.head.removeChild(scripTablaDinamicaToRemove);
            }
            if (response.ok) {
                let content = await response.text();
                contenido.innerHTML = content;
                if (id === "productos") {//si el "id" esproductos, cargoCatalogo 
                    cargarCatalogoProducto(id);
                }
                // si es contacto tengo que carga el script
                if (id === "contacto") {
                    let scriptElement = document.createElement('script');//creo el script para cargarlo a esa pagina
                    scriptElement.src = `${window.location.origin}/js/script.js`; // Reemplaza con la ruta correcta de tu archivo script.js
                    scriptElement.id = 'scripContacto'; // Asigna el ID que desees
                    // Agrega el script al final del cuerpo del documento
                    document.head.appendChild(scriptElement);

                }
                // si es contacto tengo que carga el script
                if (id === "btn-dormitorio" || id === "btn-cortinas" || id === "btn-muebles" || id === "btn-deco") {
                    let scriptElement = document.createElement('script');//creo el script para cargarlo a esa pagina
                    scriptElement.src = `${window.location.origin}/js/tablaDinamica.js`; // Reemplaza con la ruta correcta de tu archivo script.js
                    scriptElement.id = 'scripTablaDinamica'; // Asigna el ID que desees
                    // Agrega el script al final del cuerpo del documento
                    document.head.appendChild(scriptElement);

                }
                switch (id) {
                    case 'btn-dormitorio':
                        window.history.pushState({ id }, `${id}`, `/productos/dormitorioProd.html`);//actualiza la url en el navegadot
                        //"window.history.pushState" para actualizar la URL en el historial del navegador.
                        break;
                    case 'btn-cortinas':
                        window.history.pushState({ id }, `${id}`, `/productos/cortinasProd.html`);
                        break;
                    case 'btn-muebles':
                        window.history.pushState({ id }, `${id}`, `/productos/mueblesProd.html`);
                        break;
                    case 'btn-deco':
                        window.history.pushState({ id }, `${id}`, `/productos/decoProd.html`);
                        break;
                    default:
                        window.history.pushState({ id }, `${id}`, `/${id}.html`);
                        break;
                }

            } else {
                contenido.innerHTML = "Error loading for" + id + "...";
            }
        } catch (error) {
            contenido.innerHTML = "Error";
        }
    }

    async function cargarCatalogoProducto(id) {// agrego el elemento click a los botones
        window.document.querySelector("#btn-dormitorio").addEventListener("click", (event) => push(event));
        window.document.querySelector("#btn-cortinas").addEventListener("click", (event) => push(event));
        window.document.querySelector("#btn-muebles").addEventListener("click", (event) => push(event));
        window.document.querySelector("#btn-deco").addEventListener("click", (event) => push(event));

    }

    function push(event) { //cambia el título de la página y llama a cargarContenido
        //le pasamos por parametro el id o el link que clikeamos
        let id = event.target.id;
        document.title = id;
        cargarContenido(id);
    }

    window.onload = (event) => {
        // cuando la página se carga agrego evento click al nav
        // agrega un evento historial al hacer clic en mis elementos
        window.document.querySelector("#home").addEventListener("click", (event) => push(event));
        window.document.querySelector("#productos").addEventListener("click", (event) => push(event));
        window.document.querySelector("#contacto").addEventListener("click", (event) => push(event));
        cargarContenido('home');

    };

    window.addEventListener("popstate", (event) => {
        //agarra el estado anterior
        let stateId = event.state.id;
        cargarContenido(stateId);
    });
});