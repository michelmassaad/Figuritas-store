let contenedorCarrito = document.getElementById("contenedor-carrito");

function mostrarCarrito(){
    
    let cartaCarrito = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<div class="carrito-vacio"><h3>Aún no has agregado jugadores ni sobres a tu carrito!!</h3> <a href="productos.html">Ver Productos...</a></div>`;
        return;
    }

    carrito.forEach((item, indice) => { // utilizamos forEach para iterar por los indices de las productos seleccionadas
        cartaCarrito += 
        `
        <div class="carta-producto carta-carrito">
            <div class="carta-imagen carta-imagen-carrito">
                <img src="${item.img_url}" alt="${item.nombre}">
            </div>
            <div class="carta-texto carta-texto-carrito">
                <h5>${item.nombre}</h5>
                <div class="carta-id-precio carta-id-precio-carrito">
                <button class="botonAgregarCarrito" onclick='eliminarProducto(${indice})'>Eliminar</button>

                    <p>$${item.precio}</p>
                </div>
            </div>
        </div>
            `
    });

                        // captura el evento al apretar el boton de vaciar  carrito y ejecuta la funcion
    cartaCarrito += `</ul> <p class= "precio-total-carrito">Total:  $ ${calcularTotalPrecioCarrito()}</p> 
    <div class="carrito-final"> 
        <button class="botonAgregarCarrito boton-vaciar-carrito" onclick='vaciarCarrito()'> Vaciar carrito </button> 
        <button class="botonAgregarCarrito boton-ticket" onclick='imprimirTicket()'> Finalizar compra </button>
    </div>`; 
    
    contenedorCarrito.innerHTML = cartaCarrito;
}

function eliminarProducto(indice){

    carrito.splice(indice, 1); // elimina un solo elemento seleccionado por indice

    mostrarCarrito();
    //guarda el carrito en la memoria de la sesion 
    guardarCarritoEnStorage();
    actualizarContador();

}

function vaciarCarrito(){
    carrito = []; // se vuelve a asignar un array vacio
    mostrarCarrito();
    //guarda el carrito en la memoria de la sesion 
    guardarCarritoEnStorage();
    actualizarContador();
}


function calcularTotalPrecioCarrito() {
    let total = 0;

    carrito.forEach(elemento => { // por cada elemento que esta en el carrito se van sumando los precios
        total += elemento.precio;
    });
    return total;

};

async function imprimirTicket(){
    const confirmarCompra = await mostrarConfirmacion("¿Confirmar compra?");

    if (!confirmarCompra) {
        window.location.href = "carrito.html";
        return;
    }

    let idProductos = []; // guardamos los ids de los productos del carrito para registrar ventas

    const nombreCliente = sessionStorage.getItem("usuario")
    
    // Primera mayúscula + resto en minúscula
    nombreGuardado = nombreCliente.charAt(0).toUpperCase() + nombreCliente.slice(1).toLowerCase();

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF(); // doc tendra todos los metodos de jsPDF
    
    let y = 20; 

    doc.setFontSize(20);

    doc.text("                          Figu-ticket de compra" , 20, y);

    y += 15;

    // --- AQUÍ AGREGAMOS EL NOMBRE ---
    doc.setFontSize(12);
    doc.text(`Cliente: ${nombreGuardado}`, 20, y);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, y + 6);

    y += 5;

    doc.text("-------------------------------------------------------------------------------------------------------------------------", 20, y + 10);
    
    y += 20; // Dejamos un espacio antes de los productos

    doc.setFontSize(12);

    carrito.forEach(producto => {

        idProductos.push([producto.id, producto.precio]); // llenamos el array de ids de productos

        doc.text(`${producto.nombre} - $${producto.precio}`, 40, y); // texto por cada producto

        y += 10;
    });
    
    doc.text("-------------------------------------------------------------------------------------------------------------------------", 20, y + 10);
    y += 25
    const precioTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio), 0); // calculamos el total del ticket



    doc.setFontSize(15);

    doc.text(`Total: $${precioTotal}`, 20, y);

    y += 50;
    doc.text("                                     --- Gracias por su compra!!! ---", 20, y);

    y+= 10;
    doc.text("                                                 Figurita Store", 20, y)

    // Ahora esperamos a que la venta quede registrada antes de seguir —
    // antes esto se disparaba "en paralelo" sin esperar respuesta, lo que
    // podía mostrar el toast de resultado en cualquier momento random.
    await registrarVenta(precioTotal, idProductos);

    doc.save("Figu-ticket.pdf");

    const seguirComprando = await mostrarConfirmacion(
        "¡Compra exitosa! 🥳\n\n¿Querés seguir comprando?",
        { aceptar: "Sí, seguir comprando", cancelar: "Salir y cerrar sesión" }
    );

    if (seguirComprando) {
        // Opción A: Vuelve a la tienda con la misma sesión
        sessionStorage.setItem("carrito", JSON.stringify([]));
        window.location.href = "productos.html";
    } else {
        // Opción B: Cierra sesión y va al inicio
        sessionStorage.clear();
        window.location.href = "index.html"; 
    }
}

async function registrarVenta(precioTotal, idProductos) {

    /* toLocaleString vs toISOString

        - Los métodos `toLocaleString()` y `toISOString()` de JavaScript tienen diferentes propósitos a la hora de convertir un objeto Date en una cadena. El método `toISOString()` siempre devuelve una cadena en formato ISO 8601, que representa la fecha y la hora en UTC (tiempo universal coordinado) e incluye una «Z» al final para indicar UTC. Este formato está estandarizado y es coherente independientemente de la configuración del sistema del usuario.

        - Por el contrario, `toLocaleString()` devuelve una cadena formateada según la configuración regional y la zona horaria del sistema del usuario o según lo especificado por los parámetros del método. Esto significa que el resultado puede variar significativamente en función de la ubicación del usuario, por ejemplo, utilizando diferentes separadores de fecha, formatos de hora o incluso diferentes nombres de días y meses. Por ejemplo, si se utiliza la configuración regional «de» (alemán), la fecha se formateará como «29.5.2020, 18:04:24», mientras que «fr» (francés) utilizará «29/05/2020, 18:04:24».

        - Una solución habitual para obtener la hora local en formato ISO 8601 (sin la «Z») es ajustar la fecha según la diferencia horaria antes de llamar a «toISOString()». Esto se puede hacer restando la diferencia horaria en milisegundos (obtenida mediante «getTimezoneOffset () * 60000») del valor de la hora de la fecha. A continuación, la cadena resultante se puede modificar para eliminar la «Z» final si es necesario. Alternativamente, el uso de una configuración regional como «sv» (Suecia) con «toLocaleString()» produce un formato similar al ISO 8601, aunque utiliza un espacio en lugar de «T» entre la fecha y la hora, lo que sigue siendo válido según la RFC 3339.
    */
   // Ya que el formato fecha no es valido para timestamp en SQL, tenemos que formatearlo
    const fecha = new Date()
    .toLocaleString("sv-SE", { hour12: false })  
    .replace("T", " ");

    console.log(fecha);

    const nombreCliente = sessionStorage.getItem("usuario");
            // Primera mayúscula + resto en minúscula
    nombreUsuario = nombreCliente.charAt(0).toUpperCase() + nombreCliente.slice(1).toLowerCase();
            

    // Construimos el objeto con informacion para mandarle al endpoint (previo parseo a JSON)
    const data = {
        fecha: fecha, // Recordar que si en su BBDD tienen un valor generado automaticamente, no hace falta enviar esto
        total: precioTotal,
        nombre_usuario: nombreUsuario,
        productos: idProductos
    }

    const response = await fetch("http://localhost:3000/api/ventas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();


    if(response.ok) {
        mostrarToast(result.message, "exito");
        // // Limpieza de variables en sesion y redireccion para resetear la app
        // sessionStorage.removeItem("usuario");
        // // sessionStorage.removeItem("carrito"); // Si guardamos el carrito en session
        // window.location.href = "bienvenida.html"
    } else {
        mostrarToast(result.message, "error");
    }
}

function init (){
    mostrarCarrito();
}

init();