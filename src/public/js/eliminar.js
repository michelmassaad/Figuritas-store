let getProductos_formulario = document.getElementById("getProductos-formulario");
let listado_productos = document.getElementById("listado-productos");
let url = `${API_BASE_URL}/api/productos`;


getProductos_formulario.addEventListener("submit", async (event) => {
    
    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    let formData = new FormData(event.target); // FormData { id → "2" }

    let data = Object.fromEntries(formData.entries()); // Object { id: "2" }

    let idProducto = data.id;

    try {
        // Hago el fetch a la url personalizada
        let response = await fetch(`${url}/${idProducto}`);

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
                    <img src="${producto.img_url}" alt="${producto.nombre}">
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
            <input class="boton" type="button" id="eliminarProducto_boton" value="Eliminar producto">
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;

    let eliminarProducto_boton = document.getElementById("eliminarProducto_boton");

    eliminarProducto_boton.addEventListener("click", event => {

        event.stopPropagation(); // Evitar la propagacion de eventos

        let confirmacion = confirm("Querés eliminar este producto?");

        if(!confirmacion) {
            alert("Eliminacion cancelada");

        } else {
            eliminarProducto(producto.id);
        }
    });
}

// Funcion para eliminar un producto
async function eliminarProducto(id) {
    try {
        let response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        let result = await response.json(); // Procesamos la respuesta json que devolvemos del servidor

        if(response.ok) {
            alert(result.message);
            listado_productos.innerHTML = "";

        } else {
            alert("No se pudo eliminar un producto");
        }

    } catch(error) {
        alert("Ocurrio un error al eliminar un producto");
    }
}


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