# FitCount

FitCount es una aplicación web diseñada para ayudarte a llevar un estilo de vida saludable, combinando el control de tus ejercicios, comidas y calorías en una sola plataforma fácil de usar.

## Características principales

- **Registro y autenticación de usuarios**: Crea una cuenta y accede a todas las funcionalidades.
- **Gestión de ejercicios**: Añade ejercicios manualmente o selecciona de una lista, marca los ejercicios completados y lleva un seguimiento diario.
- **Gestión de comidas**: Añade alimentos manualmente o selecciona de una lista, registra las calorías consumidas.
- **Control de calorías**: Visualiza el total de calorías consumidas y quemadas cada día.
- **Panel de administración**: Los administradores pueden aprobar ejercicios y comidas, editar o eliminar usuarios.
- **Chat en tiempo real**: Comunícate con otros usuarios desde cualquier parte de la app.
- **Interfaz moderna y responsive**: Adaptada para dispositivos móviles y escritorio.

## Instalación y ejecución

1. **Clona el repositorio:**
   ```sh
   git clone <url-del-repo>
   cd front-tfm
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Ejecuta la app en modo desarrollo:**
   ```sh
   npm run dev
   ```

4. **Abre tu navegador en** `http://localhost:5173` (o el puerto que indique la terminal).

## Uso de la aplicación

### Registro y login

- Haz clic en "Registrate" para crear una cuenta nueva. Completa el formulario con tus datos personales, sube una foto y define tu contraseña.
- Una vez registrado, inicia sesión con tu correo y contraseña.

### Ejercicios y comidas

- Desde el menú lateral, accede a "Ejercicios" o "Calorías".
- Puedes añadir ejercicios o comidas desde las opciones disponibles o crear nuevos manualmente.
- Marca los ejercicios o comidas como completados para llevar el control diario.
- Al finalizar tu rutina, pulsa "Finalizar Rutina" para guardar el resumen de calorías.

### Panel de administración

- Si tienes rol de administrador, accede al panel desde `/panelAdmin`.
- Desde aquí puedes aprobar ejercicios y comidas pendientes, editar o eliminar usuarios.

### Chat

- Haz clic en el icono de chat (abajo a la derecha) para abrir el chat en tiempo real y comunicarte con otros usuarios conectados.

## Estructura del proyecto

- `src/components`: Componentes reutilizables (Header, Footer, CardObj, Chat, etc).
- `src/pages`: Páginas principales de la app (Home, Register, Exercises, Calories, AdminPanel, NotFound).
- `src/services`: Servicios para llamadas a la API.
- `src/context`: Contextos globales para autenticación y modales.

## Tecnologías utilizadas

- React 19
- Vite
- Material UI
- SweetAlert2
- React Hook Form + Yup
- WebSockets para chat
- Cloudinary para gestión de imágenes

## Notas

- El backend debe estar disponible en la URL configurada en los servicios (`https://tfm-back-lzqq.onrender.com`).
- Las imágenes se suben automáticamente a Cloudinary.
- El almacenamiento de rutinas y comidas se realiza en localStorage por usuario.

---

¡Esperamos que FitCount te ayude a alcanzar tus objetivos de salud y bienestar!

###

<h2 align="left">Programado Con</h2>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" height="40" alt="fastapi logo"  />
</div>

###