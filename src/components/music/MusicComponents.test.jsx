import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { fireEvent, render, screen } from '@testing-library/react';
import { PlayerProvider } from '../context/PlayerContext';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';
import SongList from './SongList';
import SongCard from './SongCard';
import ModalAgregarPlaylist from './ModalAgregarPlaylist';

vi.mock('axios');

describe('Music components', () => {
    it('renders AlbumCard and calls click callback', () => {
        const album = { collectionId: 1, collectionName: 'Test Album', artistName: 'Test Artist', artworkUrl100: 'https://picsum.photos/100/100', trackCount: 4, releaseDate: '2024-01-01' };
        const onClick = vi.fn();
        render(<AlbumCard album={album} alHacerClic={onClick} />);

        fireEvent.click(screen.getByText('Test Album'));
        expect(onClick).toHaveBeenCalledWith(album);
    });

    it('renders ArtistCard with initials and genre', () => {
        const artista = { artistName: 'Luna Sky', primaryGenreName: 'Indie' };
        render(<ArtistCard artista={artista} />);

        expect(screen.getByText('LS')).toBeTruthy();
        expect(screen.getByText('Indie')).toBeTruthy();
    });

    it('renders SongList with no songs and with songs', () => {
        render(<SongList canciones={[]} textoVacio="Nada" />);
        expect(screen.getByText('Nada')).toBeTruthy();

        render(
            <PlayerProvider>
                <SongList canciones={[{ trackId: 1, trackName: 'Song 1', artistName: 'Artista', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 120000 }]} mostrarIndice={true} />
            </PlayerProvider>
        );
        expect(screen.getByText('Song 1')).toBeTruthy();
    });

    it('plays a SongCard when clicked', async () => {
        render(
            <PlayerProvider>
                <SongCard song={{ trackId: 10, trackName: 'Hit', artistName: 'Star', artworkUrl100: 'https://picsum.photos/100/100', trackTimeMillis: 90000, previewUrl: 'https://example.com/preview.mp3' }} colaCanciones={[]} indice={0} mostrarIndice={true} />
            </PlayerProvider>
        );

        fireEvent.click(screen.getByText('Hit'));
        expect(await screen.findByText('pause')).toBeTruthy();
    });

    it('renders ModalAgregarPlaylist and loads playlists', async () => {
        sessionStorage.setItem('usuario', JSON.stringify({ id: 1 }));
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, nombre: 'Mi playlist', descripcion: 'Prueba', portada: '' }] });
        const onCerrar = vi.fn();
        render(<ModalAgregarPlaylist song={{ trackId: 1, trackName: 'Test Song', artistName: 'Test' }} onCerrar={onCerrar} />);

        expect(await screen.findByText('Mi playlist')).toBeTruthy();
        fireEvent.click(screen.getByText('Cancelar'));
        expect(onCerrar).toHaveBeenCalled();
    });
});
