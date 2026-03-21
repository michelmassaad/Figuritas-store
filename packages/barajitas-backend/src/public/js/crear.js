let altaProductos_formulario = document.getElementById("altaProductos-formulario");
let url = ""; // La url base de la api, la cual esta definida en el archivo config.js y se inyecta en el html con EJS
let altaUsuarios_formulario = document.getElementById("altaUsuarios-formulario");

altaProductos_formulario.addEventListener("submit", event => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    let formData = new FormData(event.target); // Obtenemos la data del formulario en un FormData

    let data = Object.fromEntries(formData.entries()); // Parseamos esta data del form data en un objeto JS

    enviarProducto(data);
});

async function enviarProducto(data) {
    try {
        let response = await fetch(`${url}/api/productos`, { //hacemos una peticion a productos
            method: "POST", //enviamos los datos con el metodo post
            headers: {
                "Content-Type": "application/json" //avisamos que el body va en json
            },
            body: JSON.stringify(data) // data es un objeto en Js que lo convertimos en Json 
        });

        // Procesamos la respuesta que nos devuelve y la convertimos en json 
        let result = await response.json();

        // Vamos a verificar si la conexion fue exitosa con un "200" OK o "201" Created
        if(response.ok) {
            alert(result.message);
            document.getElementById("altaProductos-formulario").reset(); //resetea los inputs del formulario 

        } else { // En caso de que haya otra respuesta distinta de ok
            alert(result.message);
        }

    } catch (error) {
        alert("Error al procesar la solicitud");
    }
};


//alta usuarios
altaUsuarios_formulario.addEventListener("submit", event => {
    event.preventDefault(); // Evitamos el envio por defecto del formulario

    let formData = new FormData(event.target); //Obtenemos la data del formulario en un FormData

    let data = Object.fromEntries(formData.entries()); // Parseamos esta data del form data en un objeto JS

    enviarUsuario(data);
})


async function enviarUsuario(data) {
    // console.table(data); // Recibimos correctamente los datos del formulario

    try {
        // let url = "http://localhost:3000/api/usuarios"
        let response = await fetch(`${url}/api/usuarios`, //hacemos una peticion a usuarios
            {
            method: "POST", //enviamos los datos con el metodo post
            headers: {
                "Content-Type": "application/json" //avisamos que el body va en json
            },
            body: JSON.stringify(data) // data es un objeto en Js que lo convertimos en Json 
        });
        // Procesamos la respuesta que nos devuelve
        let result = await response.json();

        // Vamos a verificar si la conexion fue exitosa con un "200" OK o "201" Created
        if(response.ok) {
            alert(result.message);
            document.getElementById("altaUsuarios-formulario").reset(); //resetea los inputs del formulario 

        } else { // En caso de que haya otra respuesta distinta de ok
            alert(result.message);
        }

    } catch (error) {
        alert("Error al procesar la solicitud");
    }
};