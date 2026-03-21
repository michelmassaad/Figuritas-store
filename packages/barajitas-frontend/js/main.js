// variables 
let cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = [];

//Logica session storage
// Función para GUARDAR el carrito (Escribe en sessionStorage)
function guardarCarritoEnStorage() {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
}
// Función para Leer el carrito de sessionStorage
function cargarCarritoDeStorage() {
    const carritoGuardado = sessionStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    } else {
        carrito = [];
    }
    actualizarContador(); // Actualiza el numerito del header
}

// Logica para el Header (contador productos y logout)

function actualizarContador() {
    // actualizamos para ver por pantalla un parrafo con la cantidad de elementos que hay en el carrito
    cantidadCarrito.innerHTML = `<p id="cantidadCarritoTexto"> (${carrito.length})</p>`; 
}

function cerrarSesion() {
    const confirmar = confirm("Seguro quieres salir? Se perderan los datos de tu sesion");

    if (confirmar) {
        // esto elimina cualquier cosa guardada en la session
        sessionStorage.clear();

        // redirigimos a la pantalla de Login
        window.location.href = "bienvenida.html";
    }
}

function mostrarNombreUsuario() {
    // Traemos el nombre de la memoria
    const nombreGuardado = sessionStorage.getItem("usuario");

    // Buscamos el elemento del HTML (el span dentro de tu boton)
    const contenedorNombre = document.getElementById("texto-usuario");

    // Le cambiamos el texto
    contenedorNombre.innerHTML = nombreGuardado; 
}

function protegerRuta() {
    // buscamos el usuario en el session storage
    const usuarioLogueado = sessionStorage.getItem("usuario");
    // si no hay usuario logueado redirige a bienvenida
    if (!usuarioLogueado) {
        window.location.href = "bienvenida.html"; 
    }
}

function init (){
    protegerRuta();
    mostrarNombreUsuario();
    cargarCarritoDeStorage();
}

init();