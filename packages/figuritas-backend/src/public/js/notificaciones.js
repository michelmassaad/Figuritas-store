/*=============================================
    NOTIFICACIONES.JS
    Reemplazo de alert() y confirm() nativos por
    toasts y modales con el estilo del sitio.

    Uso:
      mostrarToast("Mensaje", "exito" | "error" | "info");
      const ok = await mostrarConfirmacion("¿Estás seguro?");
=============================================*/

function asegurarContenedorToasts() {
    let contenedor = document.getElementById("toast-contenedor");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "toast-contenedor";
        // Se cuelga de <html>, no de <body>: el <body> del sitio tiene
        // backdrop-filter, lo que rompe el posicionamiento de los "fixed"
        // que estén adentro (pasan a centrarse respecto a todo el body,
        // no respecto a lo que se ve en pantalla). <html> no tiene ese
        // problema.
        document.documentElement.appendChild(contenedor);
    }
    return contenedor;
}

/**
 * Reemplazo de alert(). No bloquea la ejecución.
 * @param {string} mensaje
 * @param {"exito"|"error"|"info"} tipo
 */
function mostrarToast(mensaje, tipo = "info") {
    const contenedor = asegurarContenedorToasts();

    const toast = document.createElement("div");
    toast.className = `toast-notif toast-${tipo}`;
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
        <span class="toast-icono">${iconoPorTipo(tipo)}</span>
        <span class="toast-mensaje">${mensaje}</span>
        <button class="toast-cerrar" aria-label="Cerrar">&times;</button>
    `;

    contenedor.appendChild(toast);

    // Forzamos un reflow para que la animación de entrada dispare siempre,
    // incluso si se agregan varios toasts en el mismo instante.
    requestAnimationFrame(() => toast.classList.add("toast-visible"));

    const cerrar = () => {
        toast.classList.remove("toast-visible");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    };

    toast.querySelector(".toast-cerrar").addEventListener("click", cerrar);
    setTimeout(cerrar, 4500);
}

function iconoPorTipo(tipo) {
    if (tipo === "exito") return "✅";
    if (tipo === "error") return "⛔";
    return "ℹ️";
}

/**
 * Reemplazo de confirm(). Es asíncrono: hay que usar await o .then().
 * @param {string} mensaje
 * @param {{aceptar?: string, cancelar?: string}} opciones
 * @returns {Promise<boolean>}
 */
function mostrarConfirmacion(mensaje, opciones = {}) {
    const { aceptar = "Aceptar", cancelar = "Cancelar" } = opciones;

    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "modal-confirm-overlay";
        overlay.innerHTML = `
            <div class="modal-confirm" role="dialog" aria-modal="true">
                <p class="modal-confirm-mensaje">${mensaje}</p>
                <div class="modal-confirm-botones">
                    <button class="modal-confirm-btn modal-confirm-cancelar">${cancelar}</button>
                    <button class="modal-confirm-btn modal-confirm-aceptar">${aceptar}</button>
                </div>
            </div>
        `;
        // Mismo motivo que el toast: colgamos del <html>, no del <body>,
        // para que el backdrop-filter del body no rompa el centrado.
        document.documentElement.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add("modal-confirm-visible"));

        const cerrar = (resultado) => {
            overlay.classList.remove("modal-confirm-visible");
            overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
            resolve(resultado);
        };

        overlay.querySelector(".modal-confirm-aceptar").addEventListener("click", () => cerrar(true));
        overlay.querySelector(".modal-confirm-cancelar").addEventListener("click", () => cerrar(false));
        // Click afuera del cuadro = cancelar, mismo comportamiento intuitivo que un modal común
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) cerrar(false);
        });
    });
}