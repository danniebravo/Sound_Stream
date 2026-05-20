import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PlayerProvider, usePlayer } from './components/context/PlayerContext';

const songA = { trackId: 1, previewUrl: 'https://example.com/a.mp3' };
const songB = { trackId: 2, previewUrl: 'https://example.com/b.mp3' };

class MockAudio {
    constructor() {
        this.src = '';
        this.volume = 1;
        this.currentTime = 0;
        this.duration = 100;
        this.events = {};
        this.playCalls = 0;
        this.pauseCalls = 0;
    }

    addEventListener(event, callback) {
        this.events[event] = callback;
    }

    removeEventListener(event) {
        delete this.events[event];
    }

    load() {
        if (this.events.loadedmetadata) {
            this.events.loadedmetadata();
        }
    }

    play() {
        this.playCalls += 1;
    }

    pause() {
        this.pauseCalls += 1;
    }
}

function PlayerConsumer() {
    const {
        cancionActual,
        reproduciendo,
        favorito,
        volumen,
        reproducir,
        pausarReanudar,
        siguiente,
        anterior,
        cambiarFavorito,
        cambiarVolumen,
    } = usePlayer();

    return (
        <>
            <span data-testid="trackId">{cancionActual?.trackId ?? 'none'}</span>
            <span data-testid="playing">{String(reproduciendo)}</span>
            <span data-testid="favorite">{String(favorito)}</span>
            <span data-testid="volume">{String(volumen)}</span>
            <button onClick={() => reproducir(songA, [songA, songB], 0)}>Play A</button>
            <button onClick={() => reproducir(songB, [songA, songB], 1)}>Play B</button>
            <button onClick={() => pausarReanudar()}>Pause/Resume</button>
            <button onClick={() => siguiente()}>Next</button>
            <button onClick={() => anterior()}>Previous</button>
            <button onClick={() => cambiarFavorito()}>Favorite</button>
            <button onClick={() => cambiarVolumen(0.3)}>Volume</button>
        </>
    );
}

describe('PlayerContext', () => {
    let audioMock;
    let AudioMock;

    beforeEach(() => {
        audioMock = new MockAudio();
        AudioMock = vi.fn(function () {
            return audioMock;
        });
        global.Audio = AudioMock;
        localStorage.clear();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('should play a song and set its state correctly', () => {
        render(
            <PlayerProvider>
                <PlayerConsumer />
            </PlayerProvider>
        );

        fireEvent.click(screen.getByText('Play A'));

        expect(screen.getByTestId('trackId').textContent).toBe('1');
        expect(screen.getByTestId('playing').textContent).toBe('true');
        expect(audioMock.src).toBe(songA.previewUrl);
        expect(AudioMock).toHaveBeenCalled();
    });

    it('should toggle favorite and store it in localStorage', () => {
        render(
            <PlayerProvider>
                <PlayerConsumer />
            </PlayerProvider>
        );

        fireEvent.click(screen.getByText('Play A'));
        fireEvent.click(screen.getByText('Favorite'));

        expect(screen.getByTestId('favorite').textContent).toBe('true');
        expect(JSON.parse(localStorage.getItem('favoritos'))).toContain(1);
    });

    it('should pause and resume playback', () => {
        render(
            <PlayerProvider>
                <PlayerConsumer />
            </PlayerProvider>
        );

        fireEvent.click(screen.getByText('Play A'));
        fireEvent.click(screen.getByText('Pause/Resume'));
        expect(screen.getByTestId('playing').textContent).toBe('false');
        expect(audioMock.pauseCalls).toBe(1);

        fireEvent.click(screen.getByText('Pause/Resume'));
        expect(screen.getByTestId('playing').textContent).toBe('true');
        expect(audioMock.playCalls).toBeGreaterThan(0);
    });

    it('should navigate to next and previous songs', () => {
        render(
            <PlayerProvider>
                <PlayerConsumer />
            </PlayerProvider>
        );

        fireEvent.click(screen.getByText('Play A'));
        fireEvent.click(screen.getByText('Next'));

        expect(screen.getByTestId('trackId').textContent).toBe('2');

        fireEvent.click(screen.getByText('Previous'));
        expect(screen.getByTestId('trackId').textContent).toBe('1');
    });

    it('should change volume and propagate to audio element', () => {
        render(
            <PlayerProvider>
                <PlayerConsumer />
            </PlayerProvider>
        );

        fireEvent.click(screen.getByText('Play A'));
        fireEvent.click(screen.getByText('Volume'));

        expect(screen.getByTestId('volume').textContent).toBe('0.3');
        expect(audioMock.volume).toBe(0.3);
    });
});
