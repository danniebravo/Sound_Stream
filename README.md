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

### Requisitos
- Node.js 18+
- Java 17
- Maven

### Frontend
```bash
git clone https://github.com/ECelis18/Sound_Stream.git
cd Sound_Stream
npm install
npm run dev
```

### Backend
```bash
git clone https://github.com/ECelis18/Sound_Stream_Backend.git
cd Sound_Stream_Backend
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

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Java 17
- Spring Boot 3.5.14
- Spring Data JPA
- H2 Database *(temporal, migración a SQL Server pendiente)*
- Lombok

## Estructura del proyecto
```jsx  
src/
├── components/
│   ├── context/        # ThemeContext, PlayerContext
│   ├── layout/         # MainLayout, Sidebar, Navbar
│   ├── music/          # SongCard, SongList, AlbumCard, ArtistCard
│   ├── pages/          # Inicio, Buscar, Biblioteca, Perfil, Login, Registro
│   ├── player/         # Player, Controls, ProgressBar, Volume
│   ├── routes/         # AppRouter, PrivateRoute
│   └── ui/             # Button, Input, Loader, Notificacion, Modal
```
