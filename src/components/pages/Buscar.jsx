import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";
import AlbumCard from "../music/AlbumCard";

const generosEjemplo = [
    { id: 1, nombre: "Pop", color: "bg-pink-500" },
    { id: 2, nombre: "Rock", color: "bg-red-500" },
    { id: 3, nombre: "Electronic", color: "bg-blue-500" },
    { id: 4, nombre: "Hip-Hop", color: "bg-yellow-500" },
    { id: 5, nombre: "Lo-Fi", color: "bg-green-500" },
    { id: 6, nombre: "Indie", color: "bg-purple-500" },
    { id: 7, nombre: "Jazz", color: "bg-orange-500" },
    { id: 8, nombre: "Clásica", color: "bg-teal-500" },
];

const cancionesEjemplo = [
    { trackId: 1, trackName: "Neon Dreams", artistName: "Midnight Echoes", artworkUrl100: "https://picsum.photos/100/100?random=10", trackTimeMillis: 210000, primaryGenreName: "Electronic" },
    { trackId: 2, trackName: "Silent Pulse", artistName: "Midnight Echoes", artworkUrl100: "https://picsum.photos/100/100?random=11", trackTimeMillis: 195000, primaryGenreName: "Electronic" },
    { trackId: 3, trackName: "Beyond the Horizon", artistName: "Luna Sky", artworkUrl100: "https://picsum.photos/100/100?random=12", trackTimeMillis: 240000, primaryGenreName: "Indie" },
    { trackId: 4, trackName: "City Lights", artistName: "Urban Beats", artworkUrl100: "https://picsum.photos/100/100?random=13", trackTimeMillis: 180000, primaryGenreName: "Pop" },
];

const albumesEjemplo = [
    { collectionId: 1, collectionName: "Neon Dreams", artistName: "Midnight Echoes", artworkUrl100: "https://picsum.photos/300/300?random=20", trackCount: 10 },
    { collectionId: 2, collectionName: "Silent Waves", artistName: "Luna Sky", artworkUrl100: "https://picsum.photos/300/300?random=21", trackCount: 8 },
    { collectionId: 3, collectionName: "Urban Jungle", artistName: "Urban Beats", artworkUrl100: "https://picsum.photos/300/300?random=22", trackCount: 12 },
    { collectionId: 4, collectionName: "Electric Horizons", artistName: "Electric Vortex", artworkUrl100: "https://picsum.photos/300/300?random=23", trackCount: 9 },
    { collectionId: 5, collectionName: "Indie Mornings", artistName: "Luna Sky", artworkUrl100: "https://picsum.photos/300/300?random=24", trackCount: 7 },
];

const tabs = [
    { id: "todo", label: "Todos los resultados" },
    { id: "canciones", label: "Canciones" },
    { id: "albums", label: "Álbumes" },
];

export default function Buscar() {
    const [filtro, setFiltro] = useState("todo");
    const [query, setQuery] = useState("");
    const hayQuery = query.trim().length > 0;

    return (
        <MainLayout>
            {/* Tabs */}
            <div className="-mx-6 -mt-6 px-6 border-b border-border mb-8">
                <div className="flex gap-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFiltro(tab.id)}
                            className={`py-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${filtro === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Buscador */}
            <div className="mb-8 max-w-xl">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl pointer-events-none">search</span>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Buscar artistas, canciones..."
                        className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-sm text-text placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
            </div>

            {/* Estado inicial — géneros */}
            {!hayQuery && (
                <div>
                    <h2 className="text-xl font-bold mb-6 text-text">Explorar categorías</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {generosEjemplo.map(genero => (
                            <div
                                key={genero.id}
                                className={`${genero.color} rounded-xl p-5 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden`}
                            >
                                <p className="text-white font-bold text-base">{genero.nombre}</p>
                                <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-white/20 text-7xl">music_note</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Resultados */}
            {hayQuery && (
                <div className="space-y-10">
                    {/* Canciones */}
                    {(filtro === "todo" || filtro === "canciones") && (
                        <section>
                            <h2 className="text-xl font-bold text-text mb-4">Canciones</h2>
                            <SongList
                                canciones={cancionesEjemplo}
                                mostrarIndice={true}
                                textoVacio="Sin canciones"
                            />
                        </section>
                    )}

                    {/* Álbumes */}
                    {(filtro === "todo" || filtro === "albums") && (
                        <section>
                            <h2 className="text-xl font-bold text-text mb-6">Álbumes</h2>
                            <div className="albums-grid">
                                {albumesEjemplo.map(album => (
                                    <AlbumCard key={album.collectionId} album={album} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </MainLayout>
    );
}