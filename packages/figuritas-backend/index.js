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
import path from 'path'; // 👈 AGREGÁ ESTO ARRIBA DE TODO
// app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
// app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs
import { fileURLToPath } from 'url';

// Esto calcula la ruta exacta de donde está el archivo index.js
const __filename = fileURLToPath(import.meta.url);

// Configuramos las vistas usando la ruta absoluta
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Lo mismo para la carpeta public (CSS/JS)
app.use(express.static(path.join(__dirname, "src", "public")));
// Si tenés archivos estáticos (CSS, JS del cliente), hacé lo mismo:
// app.use(express.static(path.join(process.cwd(), "src", "public")));
// las rutas de las vistas las gestiona Router
app.use("/", vistasRoutes);

// Ahora las rutas las gestiona el middleware Router
app.use("/api/productos", productoRoutes);

// Rutas usuario y login
app.use("/", usuarioRoutes);

// Rutas ventas
app.use("/api/ventas", ventasRoutes);

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
// });


// Solo escucha el puerto si NO estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor local en puerto ${port}`);
    });
}

// ESTO ES LO QUE VERCEL NECESITA
export default app;


