

// middleware de ruta para validar el id en la ruta /api/productos/id
const verificarId = (req, res, next) => {
    const { id } = req.params;  // tomamos los parametros de la peticion ( :id )

    if(!id || isNaN(id)) {
        return res.status(400).json({
            message: "El id debe ser un numero"
        });
    }

    // convertimos el parametro id (originamente string de una url) en un entero
    req.id = parseInt(id, 10);

    console.log("Id validado! : ", req.id);

    next(); // continuar al siguiente middleware si es que hay, o con la respuesta
    
};

// Middleware de ruta, para proteger las vistas si no se hizo login
const exigirLogin = (req, res, next) => {

    if(!req.session.user) {
        return res.redirect("/login");
    }

    next(); // Sin next, la peticion nunca llega a la respuesta (res)
}

export {
    verificarId,
    exigirLogin
}