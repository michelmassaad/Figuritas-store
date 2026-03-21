let barraBusqueda = document.getElementById("barraBusqueda");
let contenedorProductos = document.getElementById("contenedor-productos");

const url = "https://barajitas-backend-production.up.railway.app/api/productos/activos"; // Guardamos en una variable la url de nuestro endpoint de productos

let productos = [];


//Logica de obtencion de datos del servidor con fetch
async function obtenerProductos() {
    try {
        let respuesta = await fetch(url); // Hacemos una peticion al endpoint en "http://localhost:3000/api/productos/activos"

        let data = await respuesta.json();

        productos = data.payload; // Aca guardamos en la variable el array de productos que contiene "payload"

        mostrarProductos(productos); 
        
    } catch(error) {
        console.error(error);
    }
}

// funcion para mostrar productos actualizando el html
function mostrarProductos(array) {
    let htmlProducto = "";

    array.forEach(producto => {
        htmlProducto += `
        <div class="carta-producto">
            <div class="carta-imagen">
                <img src="${producto.img_url}" alt="${producto.nombre}">
            </div>
            <div class="carta-texto">
                <h5>${producto.nombre}</h5>
                <div class="carta-id-precio">
                    <button class="botonAgregarCarrito" onclick = "agregarACarrito(${producto.id})"> 
                        <!-- svg carrito -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button> 
                    <p>$${producto.precio}</p>
                </div>
            </div>
        </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProducto;
}

//Logica de Busqueda
    // capturamos el evento keyup dentro de la barra de busqueda para filtrar por productos 
barraBusqueda.addEventListener("keyup", () => {  
    filtrarProductos();
})

function filtrarProductos(){
    //agarramos el valor de la barra busqueda
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    
    //filtra comparando el nombre del producto a ver si incluye el valor busqueda
    let productosFiltrados = productos.filter(prod => 
        prod.nombre.toLowerCase().includes(valorBusqueda)
    );
    
    /*
    prod devuelve cada objeto de la iteracion
    prod.nombre devuelve cada nombre de cada objeto
    prod.nombre.includes verifica si lo que esta adentro de includes existe dentro del valor busqueda
    */
    
    // Verificacion de busqueda
    if (productosFiltrados.length > 0) {
        // si encontro Mostramos los productos normalmente
        mostrarProductos(productosFiltrados);
    } else {
        // SI NO SE ENCONTRÓ: Ejecutamos la función de error
        mostrarError("No hemos encontramos ese producto");
    }
};

//Logica de Filtros

function filtrarPorCategoria(tipo){
    let categoriaActual = tipo;

    let productosFiltrados;

    if (categoriaActual === 'TODOS') {
        productosFiltrados = productos;  //mostramos la lista completa
    
    }else {
        //muestra segun el tipo filtrado
        productosFiltrados = productos.filter(prod => prod.tipo === tipo);
    }

    // actualizamos el contenedor productos con la nueva lista filtrada
    mostrarProductos(productosFiltrados);

    // Actualiza el estilo de los botones para saber cual esta activo
    actualizarBotonesActivos(tipo);
};

function actualizarBotonesActivos(tipoSeleccionado) {    
    let botones = document.querySelectorAll('.filtro-boton');

    botones.forEach(boton => {
        // Quitamos la clase "activo" de todos
        boton.classList.remove('activo');
        
        // Si el botón tiene el onclick con el tipo seleccionado, le ponemos 'activo'
        if (boton.getAttribute('onclick').includes(tipoSeleccionado)) {
            boton.classList.add('activo');
        }
    });
}


//logica agregar al carrito

function agregarACarrito(id){

    // compara el id del array original con el del producto seleccionado
    let productoSeleccionado = productos.find(prod => prod.id === id); 
    carrito.push(productoSeleccionado);
    
    guardarCarritoEnStorage();
    actualizarContador();

    alert("Producto agregado al carrito correctamente")
}

function mostrarError(message) {
    contenedorProductos.innerHTML = `
        <div class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </div>
    `;
};

//Inicializamos la tienda 
function init (){
    obtenerProductos();
}

init();