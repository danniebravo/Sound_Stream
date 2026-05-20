import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PlayerProvider } from '../context/PlayerContext';
import AppRouter from '../routes/AppRouter';
import Biblioteca from './Biblioteca';
import Inicio from './Inicio';
import Perfil from './Perfil';
import ModalAgregarPlaylist from '../music/ModalAgregarPlaylist';
import ModalVerAlbum from '../music/ModalVerAlbum';
import ModalVerPlaylist from '../music/ModalVerPlaylist';

vi.mock('axios');

describe('Extra page coverage', () => {
    beforeEach(() => {
        sessionStorage.clear();
        localStorage.clear();
        axios.get.mockReset();
        axios.post.mockReset?.();
        axios.delete.mockReset?.();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders AppRouter login route when not authenticated', () => {
        sessionStorage.removeItem('usuario');
        window.history.pushState({}, '', '/login');
        render(<AppRouter />);
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    });

    it('redirects protected route to login when unauthenticated', () => {
        sessionStorage.removeItem('usuario');
        window.history.pushState({}, '', '/inicio');
        render(<AppRouter />);
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    });

    it('renders Inicio with songs and albums when authenticated', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        axios.get
            .mockResolvedValueOnce({ data: { results: [{ wrapperType: 'track', trackId: 1, trackName: 'Top Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 120000 }] } })
            .mockResolvedValueOnce({ data: { results: [{ collectionId: 1, collectionName: 'Top Album', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackCount: 5, releaseDate: '2024-01-01' }] } });
        window.history.pushState({}, '', '/inicio');
        render(<AppRouter />);

        expect(await screen.findByText('Top Song')).toBeTruthy();
        expect(screen.getByText('Top Album')).toBeTruthy();
    });

    it('renders Biblioteca and creates a new playlist', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        axios.get.mockResolvedValueOnce({ data: [] });
        axios.post.mockResolvedValueOnce({ data: { id: 42, nombre: 'Nueva Playlist', desc: 'Descripción', canciones: 0, portada: 'https://example.com/cover.jpg' } });

        render(
            <MemoryRouter>
                <Biblioteca onLogout={() => { }} />
            </MemoryRouter>
        );

        expect(await screen.findByText('Tus Playlists')).toBeTruthy();
        expect(screen.getByText('No tienes playlists aún — ¡crea una!')).toBeTruthy();

        fireEvent.click(screen.getByText('Nueva playlist'));
        fireEvent.change(screen.getByPlaceholderText('Mi playlist'), { target: { value: 'Nueva Playlist' } });
        fireEvent.change(screen.getByPlaceholderText('Descripción opcional'), { target: { value: 'Descripción' } });
        fireEvent.change(screen.getByPlaceholderText('https://...'), { target: { value: 'https://example.com/cover.jpg' } });
        fireEvent.click(screen.getByText('Guardar'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        expect(screen.getByText('Nueva Playlist')).toBeTruthy();
    });

    it('renders Perfil with playlists and favorites', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1, nombre: 'Test User', nombreUsuario: 'testuser', correo: 'test@example.com', avatar: '', rol: 'usuario' }));
        axios.get
            .mockResolvedValueOnce({ data: [{ id: 1, nombre: 'Playlist 1', descripcion: 'Desc', portada: '' }] })
            .mockResolvedValueOnce({ data: { results: [{ trackId: 1, trackName: 'Favorite Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 140000 }] } });

        localStorage.setItem('favoritos', JSON.stringify([1]));
        render(
            <MemoryRouter>
                <Perfil onLogout={() => { }} />
            </MemoryRouter>
        );

        expect(await screen.findByText('@testuser')).toBeTruthy();
        expect(screen.getByText('Playlist 1')).toBeTruthy();
        expect(screen.getByText('Favorite Song')).toBeTruthy();
    });

    it('renders AppRouter registro route when not authenticated', () => {
        sessionStorage.removeItem('usuario');
        window.history.pushState({}, '', '/registro');
        render(<AppRouter />);
        expect(screen.getByText('Crear cuenta')).toBeTruthy();
    });

    it('redirects login to inicio when already authenticated', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        window.history.pushState({}, '', '/login');
        axios.get
            .mockResolvedValueOnce({ data: { results: [{ wrapperType: 'track', trackId: 1, trackName: 'Top Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 120000 }] } })
            .mockResolvedValueOnce({ data: { results: [{ collectionId: 1, collectionName: 'Top Album', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackCount: 5, releaseDate: '2024-01-01' }] } });
        render(<AppRouter />);

        expect(await screen.findByText('Top Song')).toBeTruthy();
    });

    it('renders AppRouter buscar route when authenticated', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        window.history.pushState({}, '', '/buscar');
        axios.get.mockResolvedValueOnce({ data: { results: [{ wrapperType: 'track', trackId: 1, trackName: 'Top Search Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 100000 }] } });

        render(<AppRouter />);

        expect(await screen.findByText('Explorar categorías')).toBeTruthy();
    });

    it('renders AppRouter perfil route when authenticated', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1, nombre: 'Test User', nombreUsuario: 'testuser', correo: 'test@example.com', avatar: '', rol: 'usuario' }));
        localStorage.setItem('favoritos', JSON.stringify([1]));
        window.history.pushState({}, '', '/perfil');
        axios.get
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValueOnce({ data: { results: [{ trackId: 1, trackName: 'Favorite Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 140000 }] } });

        render(<AppRouter />);

        expect(await screen.findByText('@testuser')).toBeTruthy();
        expect(screen.getByText('Favorite Song')).toBeTruthy();
    });

    it('redirects root path to login', () => {
        sessionStorage.removeItem('usuario');
        window.history.pushState({}, '', '/');
        render(<AppRouter />);
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    });

    it('redirects registro to inicio when authenticated', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        window.history.pushState({}, '', '/registro');
        axios.get
            .mockResolvedValueOnce({ data: { results: [{ wrapperType: 'track', trackId: 1, trackName: 'Top Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 120000 }] } })
            .mockResolvedValueOnce({ data: { results: [{ collectionId: 1, collectionName: 'Top Album', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackCount: 5, releaseDate: '2024-01-01' }] } });

        render(<AppRouter />);
        expect(await screen.findByText('Top Song')).toBeTruthy();
    });

    it('calls handleLogin when login succeeds', async () => {
        sessionStorage.removeItem('usuario');
        window.history.pushState({}, '', '/login');

        axios.post.mockResolvedValueOnce({ data: { id: 1, nombre: 'Test User', nombreUsuario: 'testuser', correo: 'test@example.com', avatar: '', rol: 'usuario' } });

        render(<AppRouter />);

        fireEvent.change(screen.getByPlaceholderText('nombre@email.com'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Iniciar Sesión'));

        await waitFor(() => expect(window.location.href).toContain('/inicio'));
        expect(sessionStorage.getItem('usuario')).toBeTruthy();
    });

    it('calls handleLogout from Inicio route', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        window.history.pushState({}, '', '/inicio');
        axios.get
            .mockResolvedValueOnce({ data: { results: [{ wrapperType: 'track', trackId: 1, trackName: 'Top Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 120000 }] } })
            .mockResolvedValueOnce({ data: { results: [{ collectionId: 1, collectionName: 'Top Album', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackCount: 5, releaseDate: '2024-01-01' }] } });

        render(<AppRouter />);
        expect(await screen.findByText('Top Song')).toBeTruthy();

        fireEvent.click(screen.getByText('Cerrar sesión'));
        await waitFor(() => expect(sessionStorage.getItem('usuario')).toBeNull());
    });

    it('renders ModalAgregarPlaylist and adds a song to a playlist', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, nombre: 'Playlist Test', descripcion: 'Desc', portada: '' }] });
        axios.post.mockResolvedValueOnce({ data: {} });
        const onCerrar = vi.fn();

        render(
            <ModalAgregarPlaylist
                song={{ trackId: 101, trackName: 'Song to add', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', previewUrl: 'https://example.com/preview.mp3', trackTimeMillis: 123000 }}
                onCerrar={onCerrar}
            />
        );

        expect(await screen.findByText('Playlist Test')).toBeTruthy();
        fireEvent.click(screen.getByText('Playlist Test'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        expect(screen.getByText('Agregada a la playlist')).toBeTruthy();
    });

    it('renders Biblioteca and deletes a playlist', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, nombre: 'Playlist X', descripcion: 'Desc', canciones: 4, portada: '' }] });
        axios.delete.mockResolvedValueOnce({});

        render(
            <MemoryRouter>
                <Biblioteca onLogout={() => { }} />
            </MemoryRouter>
        );

        expect(await screen.findByText('Playlist X')).toBeTruthy();
        fireEvent.click(screen.getByText('delete'));
        await waitFor(() => expect(axios.delete).toHaveBeenCalled());
    });

    it('renders Perfil edit profile and saves changes', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1, nombre: 'Test User', nombreUsuario: 'testuser', correo: 'test@example.com', avatar: '', rol: 'usuario' }));
        axios.get
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValueOnce({ data: { results: [{ trackId: 1, trackName: 'Favorite Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 140000 }] } });
        axios.put.mockResolvedValueOnce({ data: { id: 1, nombre: 'User Updated', nombreUsuario: 'testuser', correo: 'test@example.com', avatar: '', rol: 'usuario' } });

        localStorage.setItem('favoritos', JSON.stringify([1]));
        render(
            <MemoryRouter>
                <Perfil onLogout={() => { }} />
            </MemoryRouter>
        );

        expect(await screen.findByRole('heading', { name: 'Test User' })).toBeTruthy();
        fireEvent.click(screen.getByText('Editar Perfil'));

        const nombreInput = screen.getByDisplayValue('Test User');
        fireEvent.change(nombreInput, { target: { value: '' } });
        fireEvent.click(screen.getByText('Guardar'));
        expect(await screen.findByText('El nombre es obligatorio')).toBeTruthy();

        fireEvent.change(nombreInput, { target: { value: 'User Updated' } });
        fireEvent.click(screen.getByText('Guardar'));
        await waitFor(() => expect(axios.put).toHaveBeenCalled());
        expect(await screen.findByRole('heading', { name: 'User Updated' })).toBeTruthy();
    });

    it('renders Perfil admin panel and edits a user', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1, nombre: 'Admin', nombreUsuario: 'admin', correo: 'admin@example.com', avatar: '', rol: 'admin' }));
        axios.get
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValueOnce({ data: [{ id: 2, nombre: 'Otro Usuario', nombreUsuario: 'otro', correo: 'otro@example.com', rol: 'usuario', avatar: '' }] });
        axios.put.mockResolvedValueOnce({ data: { id: 2, nombre: 'Otro Usuario Editado', nombreUsuario: 'otro', correo: 'otro@example.com', rol: 'usuario', avatar: '' } });

        render(
            <MemoryRouter>
                <Perfil onLogout={() => { }} />
            </MemoryRouter>
        );

        expect(await screen.findByText('Usuarios')).toBeTruthy();
        fireEvent.click(screen.getByText('Usuarios'));
        expect(await screen.findByText('Panel de Administrador')).toBeTruthy();

        const editarButtons = await screen.findAllByTitle('Editar usuario');
        fireEvent.click(editarButtons[0]);
        expect(await screen.findByText('Editar Usuario (Admin)')).toBeTruthy();
        const adminNameInput = screen.getByDisplayValue('Otro Usuario');
        fireEvent.change(adminNameInput, { target: { value: 'Otro Usuario Editado' } });
        fireEvent.click(screen.getByText('Guardar'));
        await waitFor(() => expect(axios.put).toHaveBeenCalled());
    });

    it('renders ModalVerPlaylist and removes a song', async () => {
        axios.get.mockResolvedValueOnce({ data: [{ trackId: 5, trackName: 'Playlist Song', artistName: 'Artista', artworkUrl: 'https://picsum.photos/100/100', trackTimeMillis: 95000 }] });
        axios.delete.mockResolvedValueOnce({});
        const onCerrar = vi.fn();
        const onPlaylistActualizada = vi.fn();

        render(
            <PlayerProvider>
                <ModalVerPlaylist playlist={{ id: 10, nombre: 'Lista', descripcion: 'Desc', portada: '' }} onCerrar={onCerrar} onPlaylistActualizada={onPlaylistActualizada} />
            </PlayerProvider>
        );

        expect(await screen.findByText('Playlist Song')).toBeTruthy();
        fireEvent.click(screen.getByTitle('Eliminar canción'));
        await waitFor(() => expect(axios.delete).toHaveBeenCalled());
        expect(onPlaylistActualizada).toHaveBeenCalled();
    });

    it('renders ModalVerAlbum and loads songs', async () => {
        axios.get.mockResolvedValueOnce({ data: { results: [{ wrapperType: 'collection', collectionId: 1 }, { wrapperType: 'track', trackId: 100, trackName: 'Album Song', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 90000, previewUrl: 'https://example.com/preview.mp3' }] } });
        const onCerrar = vi.fn();

        render(
            <PlayerProvider>
                <ModalVerAlbum album={{ collectionId: 1, collectionName: 'Mi Álbum', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', releaseDate: '2024-01-01' }} onCerrar={onCerrar} />
            </PlayerProvider>
        );

        expect(await screen.findByText('Album Song')).toBeTruthy();
        fireEvent.click(screen.getByText('Cerrar'));
        expect(onCerrar).toHaveBeenCalled();
    });

    it('renders ModalVerPlaylist empty state', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });
        const onCerrar = vi.fn();
        const onPlaylistActualizada = vi.fn();

        render(
            <PlayerProvider>
                <ModalVerPlaylist playlist={{ id: 10, nombre: 'Lista', descripcion: 'Desc', portada: '' }} onCerrar={onCerrar} onPlaylistActualizada={onPlaylistActualizada} />
            </PlayerProvider>
        );

        expect(await screen.findByText('Esta playlist está vacía')).toBeTruthy();
        fireEvent.click(screen.getByText('Cerrar'));
        expect(onCerrar).toHaveBeenCalled();
    });
});
