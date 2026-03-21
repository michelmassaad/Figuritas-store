function iniciarSesion() {
    const nombre = document.getElementById("inputNombre").value;

    if (nombre.trim() !== "") {
        //.trim=elimina espacios en blanco de la cadena del principio y final
        
        //limpiamos cualquier cosa que tengamos en sessiones anteriores
        sessionStorage.clear();

        //Guardamos el nombre en la session del navegador
        sessionStorage.setItem("usuario", nombre);
        // Inicializamos un carrito vacio
        sessionStorage.setItem("carrito", JSON.stringify([]));
        
        // Redirigimos a la tienda
        window.location.href = "productos.html";
    } else {
        alert("Debe ingresar un nombre valido")
    }
}

// verificacion si ya existe un usuario redirigue a productos si se intenta ingresar en bienvenida.html
const usuarioLogueado = sessionStorage.getItem("usuario");
if (usuarioLogueado) {
    window.location.href = "productos.html";
}