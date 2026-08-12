/*=============================================
        IMPORTACIÓN DE MÓDULOS
=============================================*/
import express from "express";
import cors from "cors";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import path from "path";
import { fileURLToPath } from "url";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import { productoRoutes, usuarioRoutes, ventasRoutes, vistasRoutes } from "./src/api/routes/index.js";

const app = express();

/*=============================================
        CONFIGURACIÓN DE RUTAS (ESTO ES CLAVE)
=============================================*/
// Definimos __dirname de forma local para no depender de archivos externos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*=============================================
        MIDDLEWARES
=============================================*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Confianza en el proxy para cookies seguras en Vercel/Railway
app.set('trust proxy', 1);

// Store de sesiones en MySQL: reutiliza el mismo pool de conexión que ya
// tenías en db.js. Así, sin importar a qué instancia de Vercel llegue cada
// request, todas leen y escriben la sesión desde el mismo lugar (la base
// de datos), en vez de depender de la memoria de un proceso puntual.
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, connection);

app.use(session({
    store: sessionStore,
    secret: environments.session_key,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // true en Vercel, false en local
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

/*=============================================
        CONFIGURACIÓN DE VISTAS Y ESTÁTICOS
=============================================*/
// IMPORTANTE: Según tu estructura, las vistas están en src/views
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Archivos estáticos (CSS, Imágenes, JS del cliente)
app.use(express.static(path.join(__dirname, "src", "public")));

/*=============================================
        RUTAS DE LA APLICACIÓN
=============================================*/
app.use("/", vistasRoutes);
app.use("/", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventasRoutes);

/*=============================================
        ARRANQUE DEL SERVIDOR
=============================================*/
if (process.env.NODE_ENV !== 'production') {
    const PORT = environments.port || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local en: http://localhost:${PORT}`);
    });
}

// Exportación para Vercel
export default app;