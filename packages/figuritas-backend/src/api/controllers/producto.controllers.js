/*
CONTROLADORES DE PRODUCTO
*/

import ProductoModelo from "../models/producto.models.js"

// Get => obtener todos los productos
export const getProductos = async (req, res) => { // peticion para puerto/productos
    try{
        const [rows] = await ProductoModelo.seleccionarProductos();  // ProductoModelo es un alias para acceder a las funciones y variables de models
        console.log("error")
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados" // con el placeholders devuelve una rta o la otra
        });
        // 
    }catch(error) {
        // console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
};

// GET => obtener productos activos
export const getProductosActivos = async (req, res) => { // peticion para puerto/productos
    try{
        const [rows] = await ProductoModelo.seleccionarProductosActivos();  // ProductoModelo es un alias para acceder a las funciones y variables de models
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados" // con el placeholders devuelve una rta o la otra
        });
        // 
    }catch(error) {
        // console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
};

// Get product by id => consultar producto por id
export const getProductoPorId = async (req, res) => {
    try{
        let { id } = req.params;
        // extraemos el valor id de la url con la sentencia sql
        const [rows] = await ProductoModelo.seleccionarProductoPorId(id); 
        
        // comprobamos que exista el producto con ese id
        if(rows.length === 0) {
            return res.status(404).json({ // RETURN es clave porque aca se termina la ejecucion del codigo
                message: `No se encontro producto con id ${id}`
            });
        }
        
        res.status(200).json({
            payload: rows,
        });

    }catch(error) {
        // console.log("Error obteniendo producto por id: " , error);
        
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
};


// POST -> crear nuevo producto
export const crearProducto = async (req, res) => {

    try {
        // extraemos e imprimimos los datos del body para ver si llegan correctamente
        let {nombre, img_url, tipo, precio} = req.body;
        
        // validamos datos de entrada que no sean nulos
        if(!tipo || !img_url || !nombre || !precio){
            return  res.status(500).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }

        let [rows] = await ProductoModelo.insertarProducto(nombre, img_url, tipo, precio); // hacemos la conexion a la base de datos, y se crea el producto con los nuevos datos

        res.status(201).json({
            message: "Producto creado con exito"
        });
        

    }catch (error) {
        console.log("Error al crear producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
        
    }
};


// PUT-> Modificar producto
export const modificarProducto = async (req, res) => {
    try {
        let { id, nombre, img_url, tipo, precio, activo } = req.body;


        if(!id || !nombre || !img_url || !tipo || !precio || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let [result] = await ProductoModelo.actualizarProducto(nombre, img_url, tipo, precio, activo, id);

        console.log(result);

        res.status(200).json({
            message: `Producto con id: ${id} actualizado correctamente`
        });

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        res.status(500).json({
            message: `Error interno del servidor: ${error}`
        });
    }
}


// DELETE-> Eliminar producto
export const eliminarProducto = async (req, res) => {
    try {
        let { id } = req.params;

        let [result] = await ProductoModelo.borrarProducto(id);

        // Comprobamos si realmente se elimino un producto
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: `No se elimino el producto con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error al eliminar un producto por su id: ", error);

        res.status(500).json({
            message: `Error al eliminar producto con id: ${id}`,
            error: error.message
        });
    }
}