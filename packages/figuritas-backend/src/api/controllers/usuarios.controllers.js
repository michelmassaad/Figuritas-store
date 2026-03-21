import bcrypt from "bcrypt";

// Traemos el modelo de productos con un nombre
import usuarioModelo from "../models/usuario.models.js"; 

// POST -> Crear nuevo usuario
export const crearUsuario = async (req, res) => {

    try {
        // Extraemos e imprimimos los datos del body para ver si llegan correctamente
        let { correo, password } = req.body;

        // Optimizacion 1: Validamos datos de entrada
        if(!correo || !password ) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }

        //Setup bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        // antes de hashear
        // let [rows] = await userModels.insertUsuario(correo, password);

        // despues de hashear la password
        let [rows] = await usuarioModelo.insertarUsuario(correo, hashedPassword);
        

        // Devolvemos una repuesta con codigo 201 Created
        res.status(201).json({
            message: "Usuario creado con exito!",
        });

    } catch (error) {
        console.log("Error al crear Usuario: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
};


export const iniciarSesion =  async(req, res) =>{
    try {
        const {correo,password} = req.body;

        if(!correo || !password){
            return res.render("login",{
                title: "Login",
                about: "Inicio de Sesion",
                error: "Todos los campos son obligatorios"
            });
        }

        //sentencia antes de bcrypt
        // const sql = "SELECT * FROM usuarios WHERE correo = ? AND password =?"
        // const [rows] = await connection.query(sql, [correo, password]);

        //Setup bcrypt parte I
        // Sentencia con bcrypt, traemos solo el email
        const [rows] = await usuarioModelo.crearSesion(correo);


        //Validacion 
        if (rows.length === 0) {
            return res.render("login",{
                title: "Login",
                about: "Inicio de Sesion",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];

        //Setup bcrypt parte II Comparamos el password hasheado (la contrase;a de login hasheada es igual a la BDD?)
        const match = await bcrypt.compare(password, user.password) //si ambos hash coinciden, es porque las password son iguales y match devuelve true

        if (match) {
            //Con el correo y password validos, guardamos la sesion 
            req.session.user = {
                id:user.id,
                nombre:user.nombre,
                correo:user.correo
            }
    
            res.redirect("/admin"); //redirigimos a la pagina principal
        }else{
            return res.render("login",{
                title: "Login",
                about: "Inicio de Sesion",
                error: "Password incorrecta"
            });
        }

    } catch (error) {
        console.error("Error en el login",error);
        // ✅ RESPUESTA DE SEGURIDAD: Evita que la página se quede cargando si algo falla
        res.status(500).render("login", {
            title: "Login",
            about: "Inicio de Sesión",
            error: "Error interno del servidor. Reintentá más tarde."
        });
        
    }
};


//Creamos el endpoint para destruir la sesion y redireccionar
export const cerrarSesion = (req,res) =>{

    // Destruimos la sesion
    req.session.destroy((err)=>{
        if (err) {
            
            // En caso de existir algun error, mandaremos una respuesta error
            console.log("Error al destruir la sesion", err);
            
            return res.status(500).json({
                error:"Error al cerrar la sesion"
            });
        }
       // Redirecciono al login principal
        res.redirect("/login");
        
    })
};