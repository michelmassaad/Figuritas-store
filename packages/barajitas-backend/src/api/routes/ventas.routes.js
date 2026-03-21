import { Router } from "express";
const router = Router();

import { registrarVentas } from "../controllers/ventas.controllers.js";

// POST -> crear venta
router.post("/", registrarVentas);

export default router;