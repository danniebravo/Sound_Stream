// pages/TestComponents.jsx
import { PlayerProvider } from "../context/PlayerContext";
import { ThemeProvider } from "../context/ThemeContext";
import MainLayout from "../layout/MainLayout";
import SongCard from "../music/SongCard";
import SongList from "../music/SongList";
import AlbumCard from "../music/AlbumCard";
import ArtistCard from "../music/ArtistCard";
import Player from "../player/Player";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Loader from "../ui/Loader";
import Notificacion from "../ui/Notificacion";

// ─── Datos de prueba ───────────────────────────────────────────────────────────

const cancionesPrueba = [
    {
        trackId: 1,
        trackName: "Bohemian Rhapsody",
        artistName: "Queen",
        collectionName: "A Night at the Opera",
        artworkUrl100: "https://picsum.photos/100/100?random=1",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        trackTimeMillis: 354000,
        primaryGenreName: "Rock",
    },
    {
        trackId: 2,
        trackName: "Imagine",
        artistName: "John Lennon",
        collectionName: "Imagine",
        artworkUrl100: "https://picsum.photos/100/100?random=2",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        trackTimeMillis: 183000,
        primaryGenreName: "Pop",
    },
    {
        trackId: 3,
        trackName: "Billie Jean",
        artistName: "Michael Jackson",
        collectionName: "Thriller",
        artworkUrl100: "https://picsum.photos/100/100?random=3",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        trackTimeMillis: 294000,
        primaryGenreName: "Pop",
    },
];

const albumesPrueba = [
    {
        collectionId: 1,
        collectionName: "A Night at the Opera",
        artistName: "Queen",
        artworkUrl100: "https://picsum.photos/300/300?random=1",
        releaseDate: "1975-11-21",
        trackCount: 12,
    },
    {
        collectionId: 2,
        collectionName: "Thriller",
        artistName: "Michael Jackson",
        artworkUrl100: "https://picsum.photos/300/300?random=2",
        releaseDate: "1982-11-30",
        trackCount: 9,
    },
    {
        collectionId: 3,
        collectionName: "The Dark Side of the Moon",
        artistName: "Pink Floyd",
        artworkUrl100: "https://picsum.photos/300/300?random=3",
        releaseDate: "1973-03-01",
        trackCount: 10,
    },
];

const artistasPrueba = [
    { artistId: 1, artistName: "Queen",           primaryGenreName: "Rock" },
    { artistId: 2, artistName: "Michael Jackson", primaryGenreName: "Pop"  },
    { artistId: 3, artistName: "The Beatles",     primaryGenreName: "Rock" },
    { artistId: 4, artistName: "Pink Floyd",      primaryGenreName: "Rock" },
];

// ─── Componente principal ──────────────────────────────────────────────────────

function TestComponentsInner() {
    return (
        <PlayerProvider>
            <MainLayout>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-text">Panel principal</h1>
                    <p className="text-text-muted text-sm mt-1">
                        Vista previa de todos los componentes del sistema de interfaz
                    </p>
                </div>

                {/* ── UI Components ─────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

                    {/* Botones */}
                    <div className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">smart_button</span>
                            <h2 className="text-base font-semibold text-text">Botones</h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="ghost">Ghost</Button>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">text_fields</span>
                            <h2 className="text-base font-semibold text-text">Campos de texto</h2>
                        </div>
                        <div className="space-y-3">
                            <Input icon="search" placeholder="Buscar canciones..." />
                            <Input icon="person" placeholder="Nombre de usuario..." />
                        </div>
                    </div>

                    {/* Loader */}
                    <div className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">progress_activity</span>
                            <h2 className="text-base font-semibold text-text">Estado de carga</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <Loader size="w-8 h-8" />
                                <span className="text-text-muted text-xs">Pequeño</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Loader />
                                <span className="text-text-muted text-xs">Normal</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Loader size="w-14 h-14" />
                                <span className="text-text-muted text-xs">Grande</span>
                            </div>
                        </div>
                    </div>

                    {/* Notificaciones */}
                    <div className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">notifications</span>
                            <h2 className="text-base font-semibold text-text">Notificaciones</h2>
                        </div>
                        <div className="space-y-3">
                            <Notificacion fixed={false} tipo="exito" mensaje="Playlist creada correctamente" />
                            <Notificacion fixed={false} tipo="error" mensaje="Error al reproducir la canción" />
                        </div>
                    </div>

                    {/* Modal */}
                    <div className="bg-surface rounded-xl p-6 border border-border lg:col-span-2">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">web_asset</span>
                            <h2 className="text-base font-semibold text-text">Modal</h2>
                        </div>
                        <div className="flex justify-center">
                            <Modal title="Nueva playlist" overlay={false}>
                                Escribe el nombre de tu nueva playlist y selecciona las canciones que quieres agregar.
                            </Modal>
                        </div>
                    </div>
                </div>

                {/* ── Music Components ──────────────────────────────────── */}
                <div className="space-y-8 pb-32">

                    {/* SongCard individual */}
                    <section className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">music_note</span>
                            <h2 className="text-base font-semibold text-text">SongCard Individual</h2>
                        </div>
                        <SongCard song={cancionesPrueba[0]} />
                    </section>

                    {/* SongList */}
                    <section className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">queue_music</span>
                            <h2 className="text-base font-semibold text-text">Lista de Canciones</h2>
                        </div>
                        <SongList
                            canciones={cancionesPrueba}
                            mostrarIndice={true}
                            textoVacio="No hay canciones disponibles"
                        />
                    </section>

                    {/* AlbumCard */}
                    <section className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">album</span>
                            <h2 className="text-base font-semibold text-text">Álbumes</h2>
                        </div>
                        <div className="albums-grid">
                            {albumesPrueba.map((album) => (
                                <AlbumCard
                                    key={album.collectionId}
                                    album={album}
                                    alHacerClic={(a) => console.log("Álbum:", a.collectionName)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* ArtistCard */}
                    <section className="bg-surface rounded-xl p-6 border border-border">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-xl">person</span>
                            <h2 className="text-base font-semibold text-text">Artistas</h2>
                        </div>
                        <div className="artists-grid">
                            {artistasPrueba.map((artista) => (
                                <ArtistCard
                                    key={artista.artistId}
                                    artista={artista}
                                    alHacerClic={(a) => console.log("Artista:", a.artistName)}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </MainLayout>

            {/* Reproductor fijo abajo */}
            <Player />
        </PlayerProvider>
    );
}

export default function TestComponents() {
    return (
        <ThemeProvider>
            <TestComponentsInner />
        </ThemeProvider>
    );
}