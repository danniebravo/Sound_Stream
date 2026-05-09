import { useState, useEffect } from "react";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

export default function ModalVerPlaylist({ playlist, onCerrar, onPlaylistActualizada }) {
    const [canciones, setCanciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [notificacion, setNotificacion] = useState(null);
    const { cancionActual, reproduciendo, reproducir, pausarReanudar } = usePlayer();

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/playlists/${playlist.id}/canciones`);
                setCanciones(res.data);
            } catch (err) {
                console.error("Error al cargar canciones:", err);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, [playlist.id]);

    const eliminarCancion = async (trackId, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`http://localhost:8080/api/playlists/${playlist.id}/canciones/${trackId}`);
            const nuevas = canciones.filter(c => c.trackId !== trackId);
            setCanciones(nuevas);
            setNotificacion({ tipo: "exito", mensaje: "Canción eliminada" });
            setTimeout(() => setNotificacion(null), 2000);
            if (onPlaylistActualizada) onPlaylistActualizada(playlist.id, nuevas.length);
        } catch (err) {
            setNotificacion({ tipo: "error", mensaje: "Error al eliminar la canción" });
            setTimeout(() => setNotificacion(null), 2000);
        }
    };

    const reproducirCancion = (cancion, indice) => {
        const esActiva = cancionActual?.trackId === cancion.trackId;
        if (esActiva) {
            pausarReanudar();
        } else {
            reproducir(cancion, canciones, indice);
        }
    };

    const formatearDuracion = (ms) => {
        if (!ms) return "—";
        const seg = Math.floor(ms / 1000);
        const min = Math.floor(seg / 60);
        const s = String(seg % 60).padStart(2, "0");
        return `${min}:${s}`;
    };

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-lg z-10 flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="flex items-center gap-4 p-5 border-b border-border shrink-0">
                    <img
                        src={playlist.portada || "https://picsum.photos/300/300?random=1"}
                        alt={playlist.nombre}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-black text-text truncate">{playlist.nombre}</h3>
                        <p className="text-xs text-text-muted mt-0.5">{playlist.descripcion || "Sin descripción"}</p>
                        <p className="text-xs text-text-muted mt-0.5">
                            {canciones.length} {canciones.length === 1 ? "canción" : "canciones"}
                        </p>
                    </div>
                    <button
                        onClick={onCerrar}
                        className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:opacity-80 cursor-pointer shrink-0"
                    >
                        <span className="material-symbols-outlined text-text-muted text-base">close</span>
                    </button>
                </div>

                {/* Notificación */}
                {notificacion && (
                    <div className={`mx-5 mt-3 px-4 py-2 rounded-xl text-sm font-medium shrink-0 ${notificacion.tipo === "exito" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"}`}>
                        {notificacion.mensaje}
                    </div>
                )}

                {/* Lista de canciones */}
                <div className="overflow-y-auto flex-1 p-3">
                    {cargando && (
                        <div className="flex justify-center py-10">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {!cargando && canciones.length === 0 && (
                        <div className="flex flex-col items-center py-12 text-text-muted gap-2">
                            <span className="material-symbols-outlined text-4xl">queue_music</span>
                            <p className="text-sm">Esta playlist está vacía</p>
                        </div>
                    )}

                    {!cargando && canciones.map((cancion, i) => {
                        const esActiva = cancionActual?.trackId === cancion.trackId;
                        const portada = cancion.artworkUrl?.replace("100x100", "60x60") ?? cancion.artworkUrl;

                        return (
                            <div
                                key={cancion.trackId ?? i}
                                onClick={() => reproducirCancion(cancion, i)}
                                className={[
                                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 border",
                                    esActiva ? "bg-primary/10 border-primary/20" : "border-transparent hover:bg-surface hover:border-border",
                                ].join(" ")}
                            >
                                {/* Índice / play */}
                                <div className="w-7 shrink-0 flex items-center justify-center">
                                    {esActiva ? (
                                        <span className="material-symbols-outlined text-primary text-lg"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {reproduciendo ? "pause" : "play_arrow"}
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-xs font-bold text-text-muted group-hover:hidden block">{i + 1}</span>
                                            <span className="material-symbols-outlined text-primary text-lg hidden group-hover:block">play_arrow</span>
                                        </>
                                    )}
                                </div>

                                {/* Portada */}
                                <div className="size-10 rounded-lg overflow-hidden shrink-0 bg-surface border border-border">
                                    {portada ? (
                                        <img src={portada} alt={cancion.trackName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-text-muted text-base">music_note</span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-bold truncate ${esActiva ? "text-primary" : "text-text"}`}>
                                        {cancion.trackName}
                                    </p>
                                    <p className="text-xs text-text-muted truncate">{cancion.artistName}</p>
                                </div>

                                {/* Duración */}
                                <span className="text-xs text-text-muted tabular-nums shrink-0 w-9 text-right">
                                    {formatearDuracion(cancion.trackTimeMillis)}
                                </span>

                                {/* Botón eliminar */}
                                <button
                                    onClick={(e) => eliminarCancion(cancion.trackId, e)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 cursor-pointer shrink-0"
                                    title="Eliminar canción"
                                >
                                    <span className="material-symbols-outlined text-red-500 text-base">remove</span>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border shrink-0">
                    <button
                        onClick={onCerrar}
                        className="w-full py-2.5 bg-surface border border-border text-text font-bold text-sm rounded-xl hover:opacity-80 cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}