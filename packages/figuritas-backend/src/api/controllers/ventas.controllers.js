// Traemos el modelo de productos con un nombre
import ventaModelo from "../models/ventas.models.js"; 


// Endpoint para crear ventas
export const registrarVentas = async (req, res) => {
    try {
        // Recibimos los datos del cuerpo de la peticion HTTP
        let { fecha, total, nombre_usuario, productos } = req.body;

        // Validacion de datos obligatorios
        if(!fecha || !total || !nombre_usuario || !Array.isArray(productos)) {
            return res.status(400).json({
                message: "Datos invalidos, debes enviar fecha, total, nombre_usuario y productos (array)"
            });
        }

        // 1. Insertar la venta en la tabla "ventas"
        const [ventaResult] = await ventaModelo.registrarVenta(fecha, total, nombre_usuario);

        // 2. Obtenemos el id de la venta recien creada
        const ventaId = ventaResult.insertId;

        // 3. Insertamos los productos en "ventas_productos"
        // Como tenemos una relacion N a N, debemos insertar una fila por cada producto vendido
        
        

        for (const productoId of productos) {
            
            await ventaModelo.insertarProductoVenta(productoId[0], ventaId, productoId[1], 1); // la cantidad siempre va a ser 1
        }

        // Respuesta de exito
        res.status(201).json({
            message: "Venta registrada con exito!"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
};