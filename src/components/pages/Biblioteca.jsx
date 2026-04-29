import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";

const playlistsEjemplo = [
    { id: 1, nombre: "Morning Vibes", desc: "Para empezar el día", canciones: 12, portada: "https://picsum.photos/300/300?random=30" },
    { id: 2, nombre: "Workout Mix", desc: "Energía total", canciones: 8, portada: "https://picsum.photos/300/300?random=31" },
    { id: 3, nombre: "Chill Nights", desc: "Relax y tranquilidad", canciones: 15, portada: "https://picsum.photos/300/300?random=32" },
    { id: 4, nombre: "Road Trip", desc: "Para el camino", canciones: 20, portada: "https://picsum.photos/300/300?random=33" },
    { id: 5, nombre: "Late Night Lo-Fi", desc: "Concentración", canciones: 10, portada: "https://picsum.photos/300/300?random=34" },
    { id: 6, nombre: "Throwback 90s", desc: "Clásicos que no fallan", canciones: 18, portada: "https://picsum.photos/300/300?random=35" },
];

const likedEjemplo = [
    { trackId: 1, trackName: "Bohemian Rhapsody", artistName: "Queen", artworkUrl100: "https://picsum.photos/100/100?random=10", trackTimeMillis: 354000, primaryGenreName: "Rock" },
    { trackId: 2, trackName: "Blinding Lights", artistName: "The Weeknd", artworkUrl100: "https://picsum.photos/100/100?random=11", trackTimeMillis: 200000, primaryGenreName: "Pop" },
    { trackId: 3, trackName: "Levitating", artistName: "Dua Lipa", artworkUrl100: "https://picsum.photos/100/100?random=12", trackTimeMillis: 203000, primaryGenreName: "Pop" },
    { trackId: 4, trackName: "Starboy", artistName: "The Weeknd", artworkUrl100: "https://picsum.photos/100/100?random=13", trackTimeMillis: 230000, primaryGenreName: "R&B" },
    { trackId: 5, trackName: "Peaches", artistName: "Justin Bieber", artworkUrl100: "https://picsum.photos/100/100?random=14", trackTimeMillis: 198000, primaryGenreName: "Pop" },
];

// ── Modal crear playlist ─────────────────────────────────────────
function ModalPlaylist({ onCerrar }) {
    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <h3 className="text-base font-black text-text mb-4">Nueva Playlist</h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Nombre *</label>
                        <input type="text" placeholder="Mi playlist" className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Descripción</label>
                        <input type="text" placeholder="Descripción opcional" className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">URL Portada</label>
                        <input type="url" placeholder="https://..." className="input-sp w-full" />
                    </div>
                </div>
                <div className="flex gap-2 mt-5">
                    <button className="flex-1 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 cursor-pointer">Guardar</button>
                    <button onClick={onCerrar} className="flex-1 py-2.5 bg-surface border border-border text-text font-bold text-sm rounded-xl hover:opacity-80 cursor-pointer">Cancelar</button>
                </div>
            </div>
        </div>
    );
}

// ── Componente principal ─────────────────────────────────────────
export default function Biblioteca({ onLogout }) {
    
    const [tab, setTab] = useState("playlists");
    const [modalOpen, setModal] = useState(false);

    return (
        <MainLayout onLogout={onLogout}>
            {/* Título + tabs + botón */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-text">Tus Playlists</h1>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setTab("playlists")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${tab === "playlists"
                                ? "bg-primary text-white"
                                : "bg-surface text-text-muted hover:text-text"
                                }`}
                        >
                            Playlists
                        </button>
                        <button
                            onClick={() => setTab("liked")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${tab === "liked"
                                ? "bg-primary text-white"
                                : "bg-surface text-text-muted hover:text-text"
                                }`}
                        >
                            Me gusta
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setModal(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-text font-bold text-sm hover:bg-surface transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Nueva playlist
                </button>
            </div>

            {/* Tab Playlists */}
            {tab === "playlists" && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {playlistsEjemplo.map(pl => (
                        <div key={pl.id} className="group cursor-pointer">
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-surface">
                                <img
                                    src={pl.portada}
                                    alt={pl.nombre}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                        <span className="material-symbols-outlined text-white text-xl">play_arrow</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-text font-bold text-sm truncate">{pl.nombre}</p>
                            <p className="text-text-muted text-xs mt-0.5">{pl.canciones} canciones</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab Me gusta */}
            {tab === "liked" && (
                <SongList
                    canciones={likedEjemplo}
                    mostrarIndice={true}
                    textoVacio="No tienes canciones con me gusta aún"
                />
            )}

            {/* Modal */}
            {modalOpen && <ModalPlaylist onCerrar={() => setModal(false)} />}
        </MainLayout>
    );
}