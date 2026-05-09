import { useState, useEffect } from "react";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

export default function ModalVerAlbum({ album, onCerrar }) {
    const [canciones, setCanciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const { cancionActual, reproduciendo, reproducir, pausarReanudar } = usePlayer();

    useEffect(() => {
        axios
            .get(`https://itunes.apple.com/lookup?id=${album.collectionId}&entity=song`)
            .then(res => {
                // El primer resultado es el álbum en sí, los demás son canciones
                const tracks = res.data.results.filter(r => r.wrapperType === "track");
                setCanciones(tracks);
            })
            .catch(() => setError(true))
            .finally(() => setCargando(false));
    }, [album.collectionId]);

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

    const portadaGrande = album.artworkUrl100?.replace("100x100", "300x300") ?? null;
    const año = album.releaseDate ? new Date(album.releaseDate).getFullYear() : null;

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-lg z-10 flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="flex items-center gap-4 p-5 border-b border-border shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface border border-border">
                        {portadaGrande ? (
                            <img src={portadaGrande} alt={album.collectionName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-text-muted text-3xl">album</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-black text-text truncate">{album.collectionName}</h3>
                        <p className="text-xs text-text-muted mt-0.5">{album.artistName}{año ? ` · ${año}` : ""}</p>
                        <p className="text-xs text-text-muted mt-0.5">
                            {cargando ? "Cargando..." : `${canciones.length} ${canciones.length === 1 ? "canción" : "canciones"}`}
                        </p>
                    </div>
                    <button
                        onClick={onCerrar}
                        className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:opacity-80 cursor-pointer shrink-0"
                    >
                        <span className="material-symbols-outlined text-text-muted text-base">close</span>
                    </button>
                </div>

                {/* Lista de canciones */}
                <div className="overflow-y-auto flex-1 p-3">
                    {cargando && (
                        <div className="flex justify-center py-10">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {!cargando && error && (
                        <p className="text-center text-text-muted text-sm py-10">No se pudieron cargar las canciones.</p>
                    )}

                    {!cargando && !error && canciones.length === 0 && (
                        <div className="flex flex-col items-center py-12 text-text-muted gap-2">
                            <span className="material-symbols-outlined text-4xl">queue_music</span>
                            <p className="text-sm">Este álbum no tiene canciones disponibles</p>
                        </div>
                    )}

                    {!cargando && !error && canciones.map((cancion, i) => {
                        const esActiva = cancionActual?.trackId === cancion.trackId;
                        const portada = cancion.artworkUrl100?.replace("100x100", "60x60") ?? null;
                        const sinPreview = !cancion.previewUrl;

                        return (
                            <div
                                key={cancion.trackId}
                                onClick={() => !sinPreview && reproducirCancion(cancion, i)}
                                className={[
                                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 border",
                                    sinPreview ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
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
                                            <span className="text-xs font-bold text-text-muted group-hover:hidden block">
                                                {cancion.trackNumber ?? i + 1}
                                            </span>
                                            {!sinPreview && (
                                                <span className="material-symbols-outlined text-primary text-lg hidden group-hover:block">
                                                    play_arrow
                                                </span>
                                            )}
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