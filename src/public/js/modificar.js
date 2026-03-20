let getProductos_formulario = document.getElementById("getProductos-formulario");
let listado_productos = document.getElementById("listado-productos");
let contenedor_formulario = document.getElementById("contenedor-formulario");
let url = "/api/productos"; // La url base de la api, la cual esta definida en el archivo config.js y se inyecta en el html con EJS


getProductos_formulario.addEventListener("submit", async (event) => {
    
    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    let formData = new FormData(event.target); // FormData { id → "2" }

    let data = Object.fromEntries(formData.entries()); // Object { id: "2" }

    let idProducto = data.id;

    try {
        // Hago el fetch a la url personalizada
        let response = await fetch(`${url}/${idProducto}`);

        // Proceso los datos que me devuelve el servidor
        let datos = await response.json();

        if(response.ok) {
            let producto = datos.payload[0]; //extraemos el primer y unico elemento

            // Le pasamos el producto a una funcion que lo renderice en la pantalla
            mostrarProducto(producto); 

        } else {
            mostrarError(datos.message);
        }


    } catch (error) {
        console.error("Error: ", error);
    }
});

function mostrarProducto(producto) {
    let htmlProducto = `
        <li class="li-listados">
            <div class="carta-producto">
                <div class="carta-imagen">
                    <img src='${producto.img_url}' alt='${producto.nombre}'>
                </div>
                <div class="carta-texto">
                    <h5>${producto.nombre}</h5>
                    <div class="carta-id-precio">
                        <p>Id: ${producto.id}</p>
                        <p>$${producto.precio}</p>
                    </div>
                </div>
            </div>
        </li>
        <li class="li-botonera">
            <input class="boton" type="button" id="actualizarProducto_boton" value="Actualizar producto">
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;
    
    let actualizarProducto_boton = document.getElementById("actualizarProducto_boton");
    contenedor_formulario.classList.add('esconder'); //agrega una clase para el formulario

    actualizarProducto_boton.addEventListener("click", event => {
        
        actualizarProducto_boton.classList.add('esconder'); //agrega una clase para el esconder el boton

        crearFormularioPut(event, producto);
        contenedor_formulario.classList.remove('esconder'); //elimina la clase que esconde el formulario
    });
}


function crearFormularioPut(event, producto) {

    event.stopPropagation(); // Evitamos la propagacion de eventos

    let formularioPutHtml = `
        <form id="actualizarProductos-formulario" class="productos-formulario productos-formulario-modificar">

            <input class="input-formulario" type="hidden" name="id" value='${producto.id}'>

            <label class="texto-id" for="nombreProducto">Nombre</label>
            <input class="input-formulario" type="text" name="nombre" id="nombreProducto" value='${producto.nombre}' required>
            <br>

            <label class="texto-id" class="texto-id" for="imagenProducto">Imagen</label>
            <input class="input-formulario" type="text" name="img_url" id="imagenProducto" value='${producto.img_url}' required>
            <br>

            <label class="texto-id" for="categoriaProducto">Categoria</label>
            <select class="input-formulario" name="tipo" id="categoriaProducto" required>
                <option value="FIGURITAS">Figuritas</option>
                <option value="ACCESORIOS">Accesorios</option>
            </select>
            <br>

            <label class="texto-id" for="precioProducto">Precio</label>
            <input class="input-formulario" type="number" name="precio" id="precioProducto" value='${producto.precio}' required>
            <br>

            <label class="texto-id" for="productoActivo">Activo</label>
            <select class="input-formulario" name="activo" id="productoActivo" required>
                <option value="1">Con Stock</option>
                <option value="0">Sin Stock</option>
            </select>
            <br>

            <input class="boton" type="submit" value="Actualizar producto">
        </form>
    `;
    contenedor_formulario.classList.add('estilo-formulario'); //agrega una clase para el estilo del formulario
    contenedor_formulario.innerHTML = formularioPutHtml;

    document.getElementById("categoriaProducto").value = producto.tipo; // traemos los valores actualizados de la bdd
    
    document.getElementById("productoActivo").value = producto.activo;

    let actualizarProductos_formulario = document.getElementById("actualizarProductos-formulario");

    actualizarProductos_formulario.addEventListener("submit", event => {
        actualizarProducto(event)
    });
};


async function actualizarProducto(event) {
    event.preventDefault();

    // let url = "http://localhost:3000/api/productos";

    let formData = new FormData(event.target); // Guardamos los datos en un objeto FormData

    let data = Object.fromEntries(formData.entries()); // Transformamos el objeto FormData en un objeto JS

    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json(); 

        if(response.ok) { 
            alert(result.message);

            // Vaciamos el formulario y el listado
            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";

        } else {
            alert(error.message);
        }

    } catch (error) {
        alert("Error al procesar la solicitud");
    }

};

function mostrarError(message) {
    listado_productos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
};