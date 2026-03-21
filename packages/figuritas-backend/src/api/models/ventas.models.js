/*================================
    Modelos de ventas
================================*/
import connection from "../database/db.js"; // Traemos la conexion a la BBDD

// Crear nueva venta
const registrarVenta = (fecha, total, nombre_usuario ) => {
    let sql = "INSERT INTO ventas (fecha, total, nombre_usuario) VALUES (?, ?, ?)";

    return connection.query(sql, [fecha, total, nombre_usuario]);
};

const insertarProductoVenta = (productoId, ventaId, precio, cantidad) => {
    let sql = "INSERT INTO ventas_productos (producto_id, venta_id, precio, cantidad) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [productoId, ventaId, precio, cantidad]);
};



export default {
    registrarVenta,
    insertarProductoVenta
}