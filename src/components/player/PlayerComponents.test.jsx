import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import * as PlayerContext from '../context/PlayerContext';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import Volume from './Volume';

describe('Player components', () => {
    let usePlayerSpy;

    beforeEach(() => {
        usePlayerSpy = vi.spyOn(PlayerContext, 'usePlayer');
    });

    afterEach(() => {
        usePlayerSpy.mockRestore();
    });

    it('renders Controls with disabled buttons when no song', () => {
        usePlayerSpy.mockReturnValue({ cancionActual: null, reproduciendo: false, pausarReanudar: vi.fn(), siguiente: vi.fn(), anterior: vi.fn() });
        render(<Controls />);

        const playButton = screen.getByLabelText('Reproducir');
        expect(playButton.disabled).toBe(true);
    });

    it('renders Controls and toggles icon when playing', () => {
        usePlayerSpy.mockReturnValue({ cancionActual: { trackId: 1 }, reproduciendo: true, pausarReanudar: vi.fn(), siguiente: vi.fn(), anterior: vi.fn() });
        render(<Controls tamaño="sm" />);

        expect(screen.getByLabelText('Pausar')).toBeTruthy();
    });

    it('updates ProgressBar when clicked and key pressed', () => {
        const cambiarProgreso = vi.fn();
        usePlayerSpy.mockReturnValue({ progreso: 0.5, duracion: 120, cambiarProgreso });
        render(<ProgressBar />);

        const slider = screen.getByRole('slider');
        slider.getBoundingClientRect = () => ({ left: 0, width: 200 });
        fireEvent.click(slider, { clientX: 100 });
        expect(cambiarProgreso).toHaveBeenCalled();

        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(cambiarProgreso).toHaveBeenCalled();
    });

    it('renders Volume and toggles mute/unmute', () => {
        const cambiarVolumen = vi.fn();
        usePlayerSpy.mockReturnValue({ volumen: 0.2, cambiarVolumen });
        render(<Volume />);

        fireEvent.click(screen.getByLabelText('Volumen'));
        expect(cambiarVolumen).toHaveBeenCalled();

        fireEvent.keyDown(screen.getByLabelText('Volumen'), { key: 'ArrowLeft' });
        expect(cambiarVolumen).toHaveBeenCalled();
    });
});
