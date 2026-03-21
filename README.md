# 🃏 Figuritas Store - Plataforma de E-Commerce Fullstack

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-3.x-orange.svg)](https://ejs.co/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)
[![Railway](https://img.shields.io/badge/Railway-Deployed-blue.svg)](https://railway.app/)

Una plataforma completa de e-commerce fullstack para gestionar y mostrar tarjetas coleccionables deportivas (figuritas). Construida con una arquitectura de monorepo con despliegue desacoplado: frontend estático para la tienda pública y backend renderizado en servidor para gestión administrativa.

## 🌐 Demos en Vivo

- **🛒 Tienda Pública (Frontend):** [Visitar Tienda](https://figuritas-store-figuritas-backend.vercel.app/)
- **⚙️ Panel de Administración (Backend):** [Acceso Admin](https://figuritas-backend.up.railway.app/login)

### ⚡ Acceso Rápido (Modo Demo)
En la página de login del backend encontrarás un **botón de "Acceso Rápido"** que rellena automáticamente las credenciales de demostración (`test@test.com`).

>🛡️ **Nota de Seguridad:** Por motivos de protección del portfolio, este usuario tiene **permisos de solo lectura**. Podrás explorar toda la interfaz del panel EJS, visualizar productos y familiarizarte con la arquitectura del backend, pero las acciones destructivas (Crear, Modificar, Eliminar) están interceptadas por un middleware de seguridad que previene alteraciones en la base de datos pública.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Documentación API](#-documentación-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuyendo](#-contribuyendo)
- [Licencia](#-licencia)

## ✨ Características

### 🛒 Experiencia del Cliente
- **Navegación Dinámica del Catálogo:** Explora tarjetas coleccionables con filtrado en tiempo real
- **Carrito de Compras:** Carrito persistente usando sessionStorage
- **Búsqueda y Filtros:** Búsqueda interactiva y filtrado por categorías
- **Diseño Responsivo:** Interfaz moderna glassmorphism con tema oscuro y acentos cyan
- **Mobile-First:** Optimizado para todos los tamaños de dispositivo

### 👨‍💼 Gestión Administrativa
- **Autenticación Segura:** Acceso protegido al panel administrativo
- **Operaciones CRUD Completas:** Crear, Leer, Actualizar, Eliminar productos
- **Gestión de Estados de Producto:** Activar/Desactivar artículos del inventario
- **Renderizado en Servidor:** Plantillas EJS para interfaz administrativa
- **CORS Habilitado:** Comunicación segura cross-origin con frontend

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Markup semántico
- **CSS3** - Diseño glassmorphism, layouts responsivos
- **Vanilla JavaScript (ES6+)** - Manipulación DOM, consumo de API
- **SessionStorage** - Persistencia del carrito en cliente

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web y API
- **EJS** - Plantillas del lado servidor
- **MySQL** - Base de datos relacional para inventario, productos y usuarios
- **Bcrypt** - Hasheo y encriptación de contraseñas de administrador
- **Middleware de Seguridad** - Protección de rutas sensibles para usuario demo
- **CORS** - Compartir recursos cross-origin

### Despliegue y DevOps
- **Vercel** - Hosting de frontend estático
- **Railway** - Hosting de API backend y panel admin
- **npm Workspaces** - Gestión de monorepo

## 🏗️ Arquitectura

Este proyecto utiliza una **estructura de monorepo** con npm workspaces para mantener dos paquetes independientes:

```
figuritas-store/
├── packages/
│   ├── frontend/          # Interfaz estática de tienda
│   └── backend/           # API + Panel Admin
├── package.json           # Configuración raíz del workspace
└── README.md
```

### Paquete Frontend
- **Sitio Estático:** HTML/CSS/JS puro desplegado en Vercel
- **Consumo de API:** Obtiene datos del backend en Railway
- **Gestión de Estado:** sessionStorage para carrito

### Paquete Backend
- **API REST:** Endpoints para gestión de productos
- **Panel Admin:** Interfaz renderizada con EJS para operaciones CRUD
- **Autenticación:** Login simple basado en sesiones
- **CORS:** Configurado para comunicación con frontend en Vercel

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Git

### Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/michelmassaad/Figuritas-store.git
   cd figuritas-store
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidores de desarrollo:**

   **Backend (Panel Admin + API):**
   ```bash
   npm run dev -w figuritas-backend
   ```
   El servidor correrá en `http://localhost:3000`

   **Frontend (Tienda):**
   ```bash
   npm run dev -w figuritas-frontend
   ```
   O abrir `packages/frontend/index.html` en el navegador

## 📖 Uso

### Para Clientes
1. Visitar la tienda pública
2. Navegar productos por categoría
3. Agregar artículos al carrito
4. Usar funcionalidad de búsqueda

### Para Administradores
1. Acceder panel admin en `/login`
2. Hacer clic en el botón **"Acceso Rápido (Modo Demo)"** para rellenar automáticamente las credenciales
3. Explorar la interfaz EJS y visualizar productos
4. **Nota:** En modo demo, las operaciones de creación, actualización y eliminación están protegidas por middleware de seguridad

## 📚 Documentación API

### URL Base
```
https://barajitas-backend-production.up.railway.app
```

### Endpoints

#### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto (Solo Admin)
- `PUT /api/productos/:id` - Actualizar producto (Solo Admin)
- `DELETE /api/productos/:id` - Eliminar producto (Solo Admin)

#### Autenticación
- `POST /login` - Login administrativo
- `POST /logout` - Logout administrativo

### Ejemplo de Respuesta API
```json
{
  "id": 1,
  "nombre": "Messi - Barcelona",
  "categoria": "Fútbol",
  "precio": 25.99,
  "activo": true,
  "imagen": "/images/messi.jpg"
}
```

## 📁 Estructura del Proyecto

```
packages/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Manejadores de rutas
│   │   ├── models/          # Modelos de datos
│   │   ├── routes/          # Rutas API
│   │   ├── views/           # Plantillas EJS
│   │   ├── public/          # Assets estáticos (CSS, JS, imágenes)
│   │   └── middleware/      # Middleware de auth, CORS
│   ├── server.js            # Archivo principal del servidor
│   └── package.json
└── frontend/
    ├── index.html           # Página principal de tienda
    ├── css/
    │   └── styles.css       # Estilos de tienda
    ├── js/
    │   └── app.js           # Funcionalidad de tienda
    └── assets/               # Imágenes, íconos
```

## 🤝 Contribuyendo

1. Hacer fork del repositorio
2. Crear rama de feature: `git checkout -b feature/caracteristica-increible`
3. Commitear cambios: `git commit -m 'Agregar caracteristica increible'`
4. Pushear a la rama: `git push origin feature/caracteristica-increible`
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Michel Massa'ad**
- GitHub: [@michelmassaad](https://github.com/michelmassaad)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/michel-massaad)

---

⭐ **Dale estrella a este repo** si te resultó útil!