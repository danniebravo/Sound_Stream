import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";
import ModalVerPlaylist from "../music/ModalVerPlaylist";
import Notificacion from "../ui/Notificacion"
import Loader from "../ui/Loader"


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
function ModalPlaylist({ onCerrar, onCreada, usuarioId }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [portada, setPortada] = useState("");

    const handleGuardar = async () => {
        if (!nombre.trim()) return;
        try {
            const res = await axios.post(
                `http://localhost:8080/api/playlists?usuarioId=${usuarioId}`,
                { nombre, descripcion, portada }
            );
            onCreada(res.data);
            onCerrar();
        } catch (error) {
            console.error("Error al crear playlist:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <h3 className="text-base font-black text-text mb-4">Nueva Playlist</h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Nombre *</label>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Mi playlist" className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Descripción</label>
                        <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción opcional" className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">URL Portada</label>
                        <input type="url" value={portada} onChange={e => setPortada(e.target.value)} placeholder="https://..." className="input-sp w-full" />
                    </div>
                </div>
                <div className="flex gap-2 mt-5">
                    <button onClick={handleGuardar} className="flex-1 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 cursor-pointer">Guardar</button>
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
    const [playlistSeleccionada, setPlaylistSeleccionada] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [notificacion, setNotificacion] = useState(null);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = usuario.id;

    useEffect(() => {
        const cargarPlaylists = async () => {
            if (!usuarioId) return;
            setCargando(true);
            try {
                const res = await axios.get(`http://localhost:8080/api/playlists/usuario/${usuarioId}`);
                setPlaylists(res.data);
            } catch (error) {
                console.error("Error al cargar playlists:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarPlaylists();
    }, [usuarioId]);

    const handleCreada = (nuevaPlaylist) => {
        setPlaylists(prev => [...prev, nuevaPlaylist]);
        setNotificacion({ tipo: "exito", mensaje: "Playlist creada correctamente" });
        setTimeout(() => setNotificacion(null), 3000);
    };

    const eliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/playlists/${id}`);
            setPlaylists(prev => prev.filter(pl => pl.id !== id));
            setNotificacion({ tipo: "exito", mensaje: "Playlist eliminada" });
            setTimeout(() => setNotificacion(null), 3000);
        } catch (error) {
            setNotificacion({ tipo: "error", mensaje: "Error al eliminar la playlist" });
            setTimeout(() => setNotificacion(null), 3000);
        }
    };

    return (
        <MainLayout onLogout={onLogout}>
            {/* Notificación */}
            {notificacion && (
                <Notificacion tipo={notificacion.tipo} mensaje={notificacion.mensaje} fixed={true} />
            )}

            {/* Título + tabs + botón */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-text">Tus Playlists</h1>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setTab("playlists")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${tab === "playlists" ? "bg-primary text-white" : "bg-surface text-text-muted hover:text-text"}`}
                        >
                            Playlists
                        </button>
                        <button
                            onClick={() => setTab("liked")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${tab === "liked" ? "bg-primary text-white" : "bg-surface text-text-muted hover:text-text"}`}
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
                <>
                    {cargando && (
                        <div className="flex justify-center py-16">
                            <Loader />
                        </div>
                    )}

                    {!cargando && playlists.length === 0 && (
                        <div className="flex flex-col items-center py-20 text-text-muted gap-3">
                            <span className="material-symbols-outlined text-5xl">library_music</span>
                            <p className="text-sm">No tienes playlists aún — ¡crea una!</p>
                        </div>
                    )}

                    {!cargando && playlists.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {playlists.map(pl => (
                                <div key={pl.id} className="group cursor-pointer relative" onClick={() => setPlaylistSeleccionada(pl)}>
                                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-surface">
                                        <img
                                            src={pl.portada || "https://picsum.photos/300/300?random=1"}
                                            alt={pl.nombre}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined text-white text-xl">play_arrow</span>
                                            </div>
                                        </div>
                                        {/* Botón eliminar */}
                                        <button
                                            onClick={e => { e.stopPropagation(); eliminar(pl.id); }}
                                            className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                    <p className="text-text font-bold text-sm truncate">{pl.nombre}</p>
                                    <p className="text-text-muted text-xs mt-0.5">{pl.descripcion || "Sin descripción"}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Tab Me gusta */}
            {tab === "liked" && (
                <SongList
                    canciones={[]}
                    mostrarIndice={true}
                    textoVacio="No tienes canciones con me gusta aún"
                />
            )}

            {/* Modal ver playlist */}
            {playlistSeleccionada && (
                <ModalVerPlaylist
                    playlist={playlistSeleccionada}
                    onCerrar={() => setPlaylistSeleccionada(null)}
                    onPlaylistActualizada={(id, cantCanciones) => {
                        // opcional: actualizar conteo si se expone en la card
                    }}
                />
            )}

            {/* Modal crear playlist */}
            {modalOpen && (
                <ModalPlaylist
                    onCerrar={() => setModal(false)}
                    onCreada={handleCreada}
                    usuarioId={usuarioId}
                />
            )}
        </MainLayout>
    );
}