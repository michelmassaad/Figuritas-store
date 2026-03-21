/*================================
    Modelos de usuario
================================*/
import connection from "../database/db.js"; // Traemos la conexion a la BBDD

// Crear nuevo producto
const insertarUsuario = (correo, password ) => {
    let sql = "INSERT INTO usuarios (correo, password ) VALUES (?, ?)";

    return connection.query(sql, [correo, password]);
};

const crearSesion = (correo) => {
    let sql = "SELECT * FROM usuarios WHERE correo = ? ";

    return connection.query(sql, [correo]);
};


export default {
    insertarUsuario,
    crearSesion

}