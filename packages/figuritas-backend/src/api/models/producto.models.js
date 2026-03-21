/*
MODELOS DE PRODUCTO
*/

import connection from "../database/db.js";

// traer todos los productos
const seleccionarProductos = () => {   // pasamos la sentencia sql en una constante separada del endpoint para modularizar y tenerla aparte en caso de tener que usarla mas adelante
    const sql = "SELECT * FROM productos";

    return connection.query(sql);
};

// traer productos activos
const seleccionarProductosActivos = () => {   // pasamos la sentencia sql en una constante separada del endpoint para modularizar y tenerla aparte en caso de tener que usarla mas adelante
    const sql = "SELECT * FROM productos WHERE productos.activo = 1";

    return connection.query(sql);
};


// traer producto por id
const seleccionarProductoPorId = (id) => {
        // ? son placeholders, lugar donde entra un valor
        let sql = "SELECT * FROM productos WHERE productos.id = ?"; // LIMIT 1: limitar resultados de la consulta

    return connection.query(sql , [id]); //[id] array que cambia por cada id pedido
};

// crear nuevo producto
const insertarProducto = (nombre, img_url, tipo, precio) => {
    let sql = "INSERT INTO productos (nombre, img_url, tipo, precio) VALUES (?, ?, ?, ?)"; //consulta

    return connection.query(sql, [nombre, img_url, tipo, precio]); // hacemos la conexion a la base de datos
};


// Modificar producto
const actualizarProducto = (nombre, img_url, tipo, precio, activo, id) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, img_url = ?, tipo = ?, precio = ?, activo = ?
        WHERE id = ?
    `;

    return connection.query(sql, [nombre, img_url, tipo, precio, activo, id]); // Estos valores en orden reemplazan a los placeholders -> ?
}


// Eliminar producto
const borrarProducto = (id) => {
     // Opcion 1: Hacer el borrado normal
    let sql = `DELETE FROM productos WHERE id = ?`;

     // Opcion 2: Baja logica
    //  let sql2 = `UPDATE productos SET activo = 0 WHERE id = ?`;

    return connection.query(sql, [id]);
}



export default {
    seleccionarProductos,
    seleccionarProductosActivos,
    seleccionarProductoPorId,
    insertarProducto,
    actualizarProducto,
    borrarProducto
};

// exportamos la conexion y la respuesta de cada peticion a los controladores