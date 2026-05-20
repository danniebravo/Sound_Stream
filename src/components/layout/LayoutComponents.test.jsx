import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MainLayout from './MainLayout';

describe('Layout components', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('renders Navbar and toggles theme and navigation buttons', () => {
        render(
            <MemoryRouter initialEntries={['/inicio']}>
                <ThemeProvider>
                    <Navbar />
                </ThemeProvider>
            </MemoryRouter>
        );

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(3);
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);

        const toggleButton = screen.getByTitle('Cambiar a modo oscuro');
        expect(toggleButton).toBeTruthy();
        fireEvent.click(toggleButton);
        expect(screen.getByTitle('Cambiar a modo claro')).toBeTruthy();
    });

    it('renders Sidebar and calls logout', () => {
        const onLogout = vi.fn();
        render(
            <MemoryRouter initialEntries={['/buscar']}>
                <Sidebar onLogout={onLogout} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Cerrar sesión'));
        expect(onLogout).toHaveBeenCalled();
    });

    it('renders Footer and MainLayout children', () => {
        render(
            <MemoryRouter>
                <MainLayout onLogout={() => { }}>
                    <div data-testid="child">Contenido</div>
                </MainLayout>
            </MemoryRouter>
        );

        expect(screen.getByTestId('child')).toBeTruthy();
        expect(screen.getAllByText('SoundStream').length).toBeGreaterThan(0);
    });
});
