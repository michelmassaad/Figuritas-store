// conexion a base de datos
// importamos el modulo mysql2 en modo promesas, para poder hacer peticiones

import mysql from "mysql2/promise";

import environments from "../config/environments.js";

// destructuring para guardar en la variable database la info de la conexion bbdd

const { database } = environments;

// creamos conexion a la bbdd
const connection = mysql.createPool({ // createPool: crear conexion
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password,
    port: database.port
});

export default connection;