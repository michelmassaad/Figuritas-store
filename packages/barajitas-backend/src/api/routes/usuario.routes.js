import { Router } from "express";
const router = Router();

import { cerrarSesion, crearUsuario, iniciarSesion } from "../controllers/usuarios.controllers.js";

// POST -> Crear nuevo usuario
router.post("/api/usuarios", crearUsuario);

// POST -> iniciar sesion usuario
router.post("/login", iniciarSesion);

// POST -> cerrar sesion usuario
router.post("/logout", cerrarSesion);

export default router;