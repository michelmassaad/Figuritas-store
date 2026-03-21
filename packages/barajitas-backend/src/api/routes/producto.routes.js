import { Router } from "express"; // Importamos el middleware Router
const router = Router(); // Lo mismo que hacemos en express con const app = express()
// Router es un middleware que inicializa parte de la aplicacion
/*
En palabras simples, un middleware es un "intermediario".
Es una parte del programa que se ejecuta antes o entre las rutas/endpoints.
Sirve para revisar, modificar o validar la información que llega
antes de que llegue al controlador final.
*/
import { verificarId } from "../middlewares/middlewares.js";
import{ crearProducto, eliminarProducto, getProductoPorId, getProductos, modificarProducto, getProductosActivos } from "../controllers/producto.controllers.js";

// Get => obtener todos los productos
router.get("/", getProductos);

//GET => obtener productos activos
router.get("/activos", getProductosActivos);

// Get product by id => consultar producto por id
router.get("/:id", verificarId, getProductoPorId);

// POST -> crear nuevo producto
router.post("/", crearProducto);

// PUT-> Modificar producto
router.put("/", modificarProducto);

// DELETE-> Eliminar producto
router.delete("/:id", verificarId, eliminarProducto);


// Exportamos todas las rutas
export default router;