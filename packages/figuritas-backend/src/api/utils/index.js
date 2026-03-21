// Logica para trabajar con archivos y rutas de proyecto

// Importacion de modulos para poder trabajar con rutas
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Logica para obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url); // Convertimos las rutas file de nuestra carpeta /public en rutas normales

// Obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../"); // Apuntamos a la carpeta raiz del proyecto retrocediento 3 niveles -> utils a api, api a src, src a carpetaRaiz


export {
    __dirname,
    join
}
