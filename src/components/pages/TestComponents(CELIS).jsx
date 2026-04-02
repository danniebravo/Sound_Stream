// pages/TestComponents.jsx
import { PlayerProvider } from "../context/PlayerContext";
import SongCard from "../music/SongCard";
import SongList from "../music/SongList";
import AlbumCard from "../music/AlbumCard";
import ArtistCard from "../music/ArtistCard";
import Player from "../player/Player";

// Datos de prueba con URLs reales de imágenes
const cancionesPrueba = [
    {
        trackId: 1,
        trackName: "Bohemian Rhapsody",
        artistName: "Queen",
        collectionName: "A Night at the Opera",
        artworkUrl100: "https://picsum.photos/100/100?random=1", // Placeholder image
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Audio de prueba
        trackTimeMillis: 354000,
        primaryGenreName: "Rock"
    },
    {
        trackId: 2,
        trackName: "Imagine",
        artistName: "John Lennon",
        collectionName: "Imagine",
        artworkUrl100: "https://picsum.photos/100/100?random=2",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        trackTimeMillis: 183000,
        primaryGenreName: "Pop"
    },
    {
        trackId: 3,
        trackName: "Billie Jean",
        artistName: "Michael Jackson",
        collectionName: "Thriller",
        artworkUrl100: "https://picsum.photos/100/100?random=3",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        trackTimeMillis: 294000,
        primaryGenreName: "Pop"
    }
];

const albumesPrueba = [
    {
        collectionId: 1,
        collectionName: "A Night at the Opera",
        artistName: "Queen",
        artworkUrl100: "https://picsum.photos/300/300?random=1",
        releaseDate: "1975-11-21",
        trackCount: 12
    },
    {
        collectionId: 2,
        collectionName: "Thriller",
        artistName: "Michael Jackson",
        artworkUrl100: "https://picsum.photos/300/300?random=2",
        releaseDate: "1982-11-30",
        trackCount: 9
    },
    {
        collectionId: 3,
        collectionName: "The Dark Side of the Moon",
        artistName: "Pink Floyd",
        artworkUrl100: "https://picsum.photos/300/300?random=3",
        releaseDate: "1973-03-01",
        trackCount: 10
    }
];

const artistasPrueba = [
    {
        artistId: 1,
        artistName: "Queen",
        primaryGenreName: "Rock"
    },
    {
        artistId: 2,
        artistName: "Michael Jackson",
        primaryGenreName: "Pop"
    },
    {
        artistId: 3,
        artistName: "The Beatles",
        primaryGenreName: "Rock"
    },
    {
        artistId: 4,
        artistName: "Pink Floyd",
        primaryGenreName: "Rock"
    }
];

export default function TestComponents() {
    return (
        <PlayerProvider>
            <div className="p-8 space-y-8 pb-32">
                <h1 className="text-2xl font-bold">Prueba de Componentes - Sound Stream</h1>
                <p className="text-gray-600">Haz clic en cualquier canción para reproducir el preview</p>

                {/* SongCard individual */}
                <section>
                    <h2 className="text-xl font-bold mb-4">SongCard Individual</h2>
                    <SongCard song={cancionesPrueba[0]} />
                </section>

                {/* SongList */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Lista de Canciones</h2>
                    <SongList
                        canciones={cancionesPrueba}
                        mostrarIndice={true}
                        textoVacio="No hay canciones disponibles"
                    />
                </section>

                {/* AlbumCard */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Álbumes</h2>
                    <div className="albums-grid">
                        {albumesPrueba.map(album => (
                            <AlbumCard
                                key={album.collectionId}
                                album={album}
                                alHacerClic={(a) => console.log("Álbum seleccionado:", a.collectionName)}
                            />
                        ))}
                    </div>
                </section>

                {/* ArtistCard */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Artistas</h2>
                    <div className="artists-grid">
                        {artistasPrueba.map(artista => (
                            <ArtistCard
                                key={artista.artistId}
                                artista={artista}
                                alHacerClic={(a) => console.log("Artista seleccionado:", a.artistName)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Reproductor fijo abajo */}
            <Player />
        </PlayerProvider>
    );
}