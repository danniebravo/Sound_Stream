import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';
import Buscar from './Buscar';
import NotFound from './NotFound';

vi.mock('axios');

describe('Page components', () => {
    beforeEach(() => {
        sessionStorage.clear();
        axios.post.mockReset();
        axios.get.mockReset();
    });

    afterEach(() => {
        cleanup();
    });

    it('logs in successfully and stores user', async () => {
        const onLogin = vi.fn();
        axios.post.mockResolvedValueOnce({ data: { id: 1, nombre: 'Test User', nombreUsuario: 'testuser' } });
        render(
            <MemoryRouter>
                <Login onLogin={onLogin} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('nombre@email.com'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Iniciar Sesión'));

        await waitFor(() => expect(onLogin).toHaveBeenCalled());
        expect(JSON.parse(sessionStorage.getItem('usuario')).nombreUsuario).toBe('testuser');
    });

    it('shows login error when credentials are wrong', async () => {
        axios.post.mockRejectedValueOnce(new Error('Invalid'));
        render(
            <MemoryRouter>
                <Login onLogin={() => { }} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getAllByPlaceholderText('nombre@email.com')[0], { target: { value: 'bad@example.com' } });
        fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], { target: { value: 'bad' } });
        fireEvent.click(screen.getByText('Iniciar Sesión'));

        await screen.findByText('Correo o contraseña incorrectos');
    });

    it('registers successfully and shows notification', async () => {
        axios.post.mockResolvedValueOnce({ data: {} });
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('nombre'), { target: { value: 'Nombre' } });
        fireEvent.change(screen.getByPlaceholderText('usuario'), { target: { value: 'usuario' } });
        fireEvent.change(screen.getByPlaceholderText('email@ejemplo.com'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('https://...'), { target: { value: 'https://avatar.com/img.png' } });
        fireEvent.click(screen.getByText('Registrarse'));

        await screen.findByText('Registro exitoso. Redirigiendo...');
    });

    it('renders Buscar and performs search', async () => {
        axios.get.mockImplementation((url) => {
            if (url.includes('top+hits')) {
                return Promise.resolve({ data: { results: [{ wrapperType: 'track', trackId: 1, trackName: 'Top Song', artistName: 'Artista', primaryGenreName: 'Pop', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 100000 }] } });
            }
            return Promise.resolve({ data: { results: [{ wrapperType: 'track', trackId: 2, trackName: 'Search Result', artistName: 'Buscado', primaryGenreName: 'Rock', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 120000 }] } });
        });

        render(
            <MemoryRouter>
                <Buscar onLogout={() => { }} />
            </MemoryRouter>
        );

        await screen.findByText('Canciones populares');

        fireEvent.change(screen.getByPlaceholderText('Buscar artistas, canciones...'), { target: { value: 'rock' } });
        await screen.findByText('Top Result');
    });

    it('renders NotFound and goes back', () => {
        const backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => { });
        render(
            <MemoryRouter>
                <NotFound onLogout={() => { }} />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Volver atrás'));
        expect(backSpy).toHaveBeenCalled();
        backSpy.mockRestore();
    });
});
