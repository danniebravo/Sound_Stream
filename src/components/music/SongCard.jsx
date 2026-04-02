import { usePlayer } from "../../context/PlayerContext";

export default function SongCard({ song, colaCanciones = [], indice = 0, mostrarIndice = false }) {
    const { cancionActual, reproduciendo, reproducir, pausarReanudar } = usePlayer();
    const esActiva = cancionActual?.trackId === song.trackId;

    const manejarClic = () => {
        esActiva 
            ? pausarReanudar() 
            : reproducir(song, colaCanciones.length ? colaCanciones : [song], indice);
    };

    const formatearDuracion = (milisegundos) => {
        if (!milisegundos) return "—";
        const totalSegundos = Math.floor(milisegundos / 1000);
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = String(totalSegundos % 60).padStart(2, "0");
        return `${minutos}:${segundos}`;
    };

    const portada = song.artworkUrl100?.replace("100x100", "60x60") ?? null;

    return (
        <div
            onClick={manejarClic}
            className={[
                "group flex items-center gap-4 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 border",
                esActiva ? "bg-primary/10 border-primary/20" : "border-transparent song-row-hover",
            ].join(" ")}
        >
            {/* Índice / reproducción */}
            <div className="w-8 shrink-0 flex items-center justify-center">
                {esActiva ? (
                    <span className="material-symbols-outlined text-primary text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}>
                        {reproduciendo ? "pause" : "play_arrow"}
                    </span>
                ) : (
                    <>
                        {mostrarIndice && (
                            <span className="text-sm font-bold text-text-muted group-hover:hidden block">
                                {song.trackNumber ?? indice + 1}
                            </span>
                        )}
                        <span className={`material-symbols-outlined text-primary text-xl ${mostrarIndice ? "hidden group-hover:block" : "opacity-0 group-hover:opacity-100"}`}>
                            play_arrow
                        </span>
                    </>
                )}
            </div>

            {/* Portada */}
            <div className="size-11 rounded-lg overflow-hidden shrink-0 bg-surface border border-border">
                {portada ? (
                    <img src={portada} alt={song.trackName} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-text-muted text-lg">music_note</span>
                    </div>
                )}
            </div>

            {/* Información */}
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${esActiva ? "text-primary" : "text-text"}`}>
                    {song.trackName}
                </p>
                <p className="text-xs text-text-muted truncate">
                    {song.artistName}{song.collectionName ? ` · ${song.collectionName}` : ""}
                </p>
            </div>

            {/* Género */}
            {song.primaryGenreName && (
                <span className="hidden lg:block text-xs text-text-muted shrink-0 bg-surface px-2 py-0.5 rounded-full">
                    {song.primaryGenreName}
                </span>
            )}

            {/* Duración */}
            <span className="text-xs text-text-muted font-medium shrink-0 tabular-nums w-10 text-right">
                {formatearDuracion(song.trackTimeMillis)}
            </span>
        </div>
    );
}