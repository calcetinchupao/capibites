# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# proyecto_react

## Sistema de diseño (UI/UX)

Este proyecto incorpora un sistema de diseño unificado con tokens, tipografía y componentes reutilizables para asegurar consistencia visual, accesibilidad y mantenibilidad.

### Tokens de diseño

Los tokens están definidos en `src/index.css` dentro de `:root`.

- Colores: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-primary`, `--color-primary-contrast`, `--color-accent`, `--color-border`, `--color-success`, `--color-warning`, `--color-danger`.
- Espaciado: `--space-1` … `--space-6`.
- Tipografía: `--fs-xs`, `--fs-sm`, `--fs-md`, `--fs-lg`, `--fs-xl`, `--fs-2xl`.
- Bordes y sombras: `--radius-sm`, `--radius-md`, `--radius-lg`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`.

Actualiza la paleta modificando estos tokens para propagar cambios a toda la interfaz.

### Tipografía

Se utiliza la fuente `Inter` desde Google Fonts y un stack de sistema como respaldo. El `body` define `line-height` y suavizado de fuentes para legibilidad.

### Componentes y utilidades globales

Disponibles en `src/index.css`:

- `container`: contenedor responsivo con ancho máximo y padding horizontal.
- `btn` y `btn--primary`: botones con estados `hover`/`active` y foco accesible.
- `card`: superficies con sombra, radio y transición sutil.
- `grid` y `grid--3`: rejilla responsiva (3/2/1 columnas).
- `sr-only`: texto solo para lectores de pantalla.

### Accesibilidad (WCAG)

- Enlaces y botones tienen foco visible con `:focus-visible`.
- Paleta con contraste alto para texto y elementos interactivos.
- Animaciones respetan `prefers-reduced-motion`.
- Landmarks semánticos: `header`, `nav[aria-label="Principal"]`, `main`.

### Navbar

- Código en `src/components/Layout.js` y estilos en `src/styles/nav.css`.
- Mobile: botón `menu-toggle` con `aria-expanded` y `aria-controls`.
- Desktop: navegación horizontal con acciones a la derecha.

### Buenas prácticas de uso

- Usa tokens en nuevos estilos: `color: var(--color-text)`, `background: var(--color-surface)`, etc.
- Reutiliza `btn`, `card` y `grid` en nuevas pantallas.
- Evita colores y tamaños hardcodeados; usa variables.
- Define contenido alternativo (`alt`) en imágenes y etiquetas accesibles en botones.

### Mantenimiento

- Cambios globales: editar tokens en `src/index.css`.
- Iconografía: preferir SVG inline en componentes para consistencia y accesibilidad.
