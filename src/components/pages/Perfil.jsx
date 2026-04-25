import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";

const usuario = {
    nombre: "Pepito Pérez",
    handle: "@pepito_perez",
    avatar: "https://picsum.photos/200/200?random=99",
};

const stats = [
    { label: "Playlists", valor: 12, subtexto: "Creadas por ti", icono: "library_music" },
    { label: "Me gusta", valor: 48, subtexto: "Canciones favoritas", icono: "favorite" },
    { label: "Canciones", valor: 5, subtexto: "En biblioteca", icono: "music_note" },
];

const playlistsEjemplo = [
    { id: 1, nombre: "Morning Vibes", canciones: 12, icono: "☀️" },
    { id: 2, nombre: "Workout Mix", canciones: 8, icono: "💪" },
    { id: 3, nombre: "Chill Nights", canciones: 15, icono: "🌙" },
];

const favoritosEjemplo = [
    { trackId: 1, trackName: "Bohemian Rhapsody", artistName: "Queen", artworkUrl100: "https://picsum.photos/100/100?random=10", trackTimeMillis: 354000, primaryGenreName: "Rock" },
    { trackId: 2, trackName: "Blinding Lights", artistName: "The Weeknd", artworkUrl100: "https://picsum.photos/100/100?random=11", trackTimeMillis: 200000, primaryGenreName: "Pop" },
    { trackId: 3, trackName: "Levitating", artistName: "Dua Lipa", artworkUrl100: "https://picsum.photos/100/100?random=12", trackTimeMillis: 203000, primaryGenreName: "Pop" },
    { trackId: 4, trackName: "Starboy", artistName: "The Weeknd", artworkUrl100: "https://picsum.photos/100/100?random=13", trackTimeMillis: 230000, primaryGenreName: "R&B" },
];

// ── Modal editar perfil ──────────────────────────────────────────
function ModalEditarPerfil({ onCerrar }) {
    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <h3 className="text-base font-black text-text mb-4">Editar Perfil</h3>
                <div className="flex gap-3 items-center mb-4">
                    <div className="size-14 rounded-xl bg-border border border-border shrink-0 overflow-hidden flex items-center justify-center">
                        <span className="material-symbols-outlined text-text-muted">person</span>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">URL Avatar</label>
                        <input type="url" placeholder="https://..." className="input-sp w-full" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nombre *</label>
                        <input type="text" defaultValue={usuario.nombre} className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nueva contraseña</label>
                        <input type="password" placeholder="••••••••" className="input-sp w-full" />
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
export default function Perfil() {
    const [modalEditar, setModalEditar] = useState(false);

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto">

                {/* Avatar + nombre */}
                <div className="flex flex-col items-center gap-4 py-8">
                    <div className="relative">
                        <img
                            src={usuario.avatar}
                            alt={usuario.nombre}
                            className="size-32 md:size-40 rounded-full border-4 border-border shadow-sm object-cover"
                        />
                        <button
                            onClick={() => setModalEditar(true)}
                            className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer hover:opacity-90"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-text">{usuario.nombre}</h1>
                        <p className="text-text-muted text-base mt-1">{usuario.handle}</p>
                    </div>
                    <button
                        onClick={() => setModalEditar(true)}
                        className="px-6 h-11 bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 cursor-pointer"
                    >
                        Editar Perfil
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {stats.map(stat => (
                        <div key={stat.label} className="flex flex-col gap-2 rounded-xl p-6 bg-surface hover:shadow-sm transition-shadow">
                            <div className="flex items-center justify-between">
                                <p className="text-primary text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                <span className="material-symbols-outlined text-primary text-sm">{stat.icono}</span>
                            </div>
                            <p className="text-text text-3xl font-bold tracking-tight">{stat.valor}</p>
                            <p className="text-text-muted text-sm font-medium">{stat.subtexto}</p>
                        </div>
                    ))}
                </div>

                {/* Mis Playlists */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-text">Mis Playlists</h2>
                        <button className="text-primary text-sm font-bold hover:underline cursor-pointer">Ver todas →</button>
                    </div>
                    <div className="flex flex-col gap-1">
                        {playlistsEjemplo.map(pl => (
                            <div key={pl.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface cursor-pointer transition-colors">
                                <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center text-xl shrink-0">
                                    {pl.icono}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-text font-semibold text-sm truncate">{pl.nombre}</p>
                                    <p className="text-text-muted text-xs">{pl.canciones} canciones</p>
                                </div>
                                <span className="material-symbols-outlined text-text-muted text-lg">chevron_right</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tus Favoritos */}
                <section className="pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-text">Tus Favoritos</h2>
                        <button className="text-primary text-sm font-bold hover:underline cursor-pointer">Ver todos →</button>
                    </div>
                    <SongList canciones={favoritosEjemplo} mostrarIndice={true} textoVacio="No tienes favoritos aún" />
                </section>
            </div>

            {/* Modal editar perfil */}
            {modalEditar && <ModalEditarPerfil onCerrar={() => setModalEditar(false)} />}
        </MainLayout>
    );
}