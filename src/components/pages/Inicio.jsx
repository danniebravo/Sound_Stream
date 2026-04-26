import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";
import AlbumCard from "../music/AlbumCard";

const cancionesEjemplo = [
    { trackId: 1, trackName: "Neon Horizon", artistName: "Midnight Glow", artworkUrl100: "https://picsum.photos/100/100?random=10", trackTimeMillis: 245000, primaryGenreName: "Indie" },
    { trackId: 2, trackName: "After Hours", artistName: "Urban Jungle", artworkUrl100: "https://picsum.photos/100/100?random=11", trackTimeMillis: 234000, primaryGenreName: "Pop" },
    { trackId: 3, trackName: "Sunset Drive", artistName: "Chill Vibes", artworkUrl100: "https://picsum.photos/100/100?random=12", trackTimeMillis: 212000, primaryGenreName: "Lo-Fi" },
    { trackId: 4, trackName: "Electric Pulse", artistName: "Retro Pulse", artworkUrl100: "https://picsum.photos/100/100?random=13", trackTimeMillis: 198000, primaryGenreName: "Electronic" },
    { trackId: 5, trackName: "Quiet Echoes", artistName: "Luna Whisper", artworkUrl100: "https://picsum.photos/100/100?random=14", trackTimeMillis: 220000, primaryGenreName: "Ambient" },
];

const albumesEjemplo = [
    { collectionId: 1, collectionName: "Midnight Dreams", artistName: "Neon Pulse", artworkUrl100: "https://picsum.photos/300/300?random=20", trackCount: 10 },
    { collectionId: 2, collectionName: "Ocean Waves", artistName: "Chill Vibes", artworkUrl100: "https://picsum.photos/300/300?random=21", trackCount: 8 },
    { collectionId: 3, collectionName: "Urban Jungle", artistName: "Urban Beats", artworkUrl100: "https://picsum.photos/300/300?random=22", trackCount: 12 },
    { collectionId: 4, collectionName: "Electric Horizons", artistName: "Electric Vortex", artworkUrl100: "https://picsum.photos/300/300?random=23", trackCount: 9 },
    { collectionId: 5, collectionName: "Neon Nights", artistName: "Daft Punk", artworkUrl100: "https://picsum.photos/300/300?random=24", trackCount: 11 },
];

export default function Inicio() {
    return (
        <MainLayout>
            {/* Bienvenida */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black tracking-tight">¡Bienvenido de nuevo!</h2>
                    <button className="text-primary text-sm font-bold hover:underline cursor-pointer">Ver todo</button>
                </div>
            </section>

            {/* Canciones */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Canciones</h2>
                </div>
                <SongList
                    canciones={cancionesEjemplo}
                    mostrarIndice={true}
                    textoVacio="No hay canciones aún"
                />
            </section>

            {/* Álbumes */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Álbumes</h2>
                </div>
                <div className="albums-grid">
                    {albumesEjemplo.map(album => (
                        <AlbumCard key={album.collectionId} album={album} />
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}