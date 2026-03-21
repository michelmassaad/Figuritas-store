import express from "express";
const app = express();
import environments from "./src/api/config/environments.js";
import cors from "cors"; 
// Importamos las rutas de producto
import { productoRoutes, usuarioRoutes, ventasRoutes, vistasRoutes } from "./src/api/routes/index.js";


// Importamos la configuracion para trabajar con rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";

import session from "express-session"; // Importamos session despues de instalar npm i express-session


const PORT = environments.port;
// Importamos session_key de environments
const session_key = environments.session_key;

/*===================
    Middlewares
===================*/
app.use(cors());

// Middleware que convierte los datos "application/json" 
app.use(express.json()); 

// Le dice a Express que confíe en el "Proxy" (el intermediario de Railway) 
// para que pueda leer las cookies seguras.
app.set('trust proxy', 1);

// Middleware para servir archivos estaticos: construimos la ruta relativa para servir los archivos de la carpeta /public
app.use(express.static(join(__dirname, "src", "public"))); // Gracias a esto podemos servir los archivos de la carpeta public, como http://localhost:3000/img/haring1.png

// Middleware para parsear las solicitudes POST que enviamos desde el <form> HTML
app.use(express.urlencoded({ extended: true }));

// Middleware de sesion 
app.use(session({
    secret: session_key, // Esto firma las cookies para evitar manipulacion, un mecanismo de seguridad que usa una key o contraseña bien fuerte y larga
    resave: false, // Esto evita guardar la sesion si no hubo cambios
    saveUninitialized: false, // No guarde sesiones vacias
    cookie: { 
        secure: true, // 👈 OBLIGATORIO para HTTPS en producción
        httpOnly: true 
    }
}));

/*===================
    Configuracion
===================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs

// las rutas de las vistas las gestiona Router
app.use("/", vistasRoutes);

// Ahora las rutas las gestiona el middleware Router
app.use("/api/productos", productoRoutes);

// Rutas usuario y login
app.use("/", usuarioRoutes);

// Rutas ventas
app.use("/api/ventas", ventasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});





