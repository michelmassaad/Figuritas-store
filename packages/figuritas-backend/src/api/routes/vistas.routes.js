import { Router } from "express";
const router = Router();

import productoModels from "../models/producto.models.js";
import { exigirLogin } from "../middlewares/middlewares.js";

// Devolveremos vistas
router.get("/admin", exigirLogin, async (req, res) => {

    try {
        const [rows] = await productoModels.seleccionarProductos();
        
        // Le devolvemos la pagina index.ejs
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            productos: rows
        }); 

    } catch (error) {
        console.log(error);
    }
});

router.get("/consultar", exigirLogin, (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});


router.get("/crear", exigirLogin, (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});


router.get("/modificar", exigirLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
})


router.get("/eliminar", exigirLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

//Vista de Login

router.get("/login", (req,res) =>{
    res.render("login",{
        title:"Login",
        about:"Inicio de Sesion"
    })    
})    



export default router;