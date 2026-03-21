import dotenv from "dotenv";

dotenv.config(); // El metodo config carga las variables de entornop desde nuestro archivo .env

export default{ // Vamos a exportar esta informacion
    port: process.env.PORT,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT, //
    },
    session_key: process.env.SESSION_KEY
};