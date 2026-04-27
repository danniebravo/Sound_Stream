# SoundStream 🎵

Aplicación web de música construida con React + Vite en el frontend y Spring Boot en el backend.

## Funcionalidades implementadas

- **Autenticación** — Registro e inicio de sesión conectados al backend
- **Tema oscuro/claro** — Toggle de tema persistente con localStorage
- **Navegación** — Rutas con react-router-dom y sidebar con link activo
- **Páginas** — Inicio, Buscar, Biblioteca, Perfil, Login, Registro, NotFound
- **Reproductor** — Player de música con contexto global
- **Notificaciones** — Componente de notificación reutilizable

## Instalación

### Frontend

```bash
git clone https://github.com/TU_USUARIO/Sound_Stream.git
cd Sound_Stream
npm install
npm run dev
```

### Backend

```bash
git clone https://github.com/TU_USUARIO/Sound_Stream_API.git
cd Sound_Stream_API
./mvnw spring-boot:run
```

> El backend corre en `http://localhost:8080` y el frontend en `http://localhost:5173`

## Protección de rutas

Las rutas privadas usan el componente `PrivateRoute` que verifica si existe un usuario guardado en `localStorage`. Si no hay sesión activa, redirige automáticamente al `/login`.

```jsx
<Route
  path="/inicio"
  element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }
/>
```

## Tecnologías

- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Spring Boot
- H2 Database / Por ahora
- Lombok
