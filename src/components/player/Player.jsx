import { usePlayer } from "../context/PlayerContext";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Volume from "./Volume";

export default function Player() {
    const { cancionActual, favorito, cambiarFavorito } = usePlayer();
    const cover = cancionActual?.artworkUrl100?.replace("100x100", "60x60") ?? null;

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-24 bg-surface border-t border-border flex items-center px-6 z-20">

            {/* Izquierda */}
            <div className="flex items-center gap-4 w-1/4 min-w-0">
                <div className="size-14 rounded-lg shadow-md bg-border overflow-hidden shrink-0 flex items-center justify-center">
                    {cover ? (
                        <img src={cover} alt={cancionActual.trackName} className="w-full h-full object-cover" />
                    ) : (
                        <span className="material-symbols-outlined text-text-muted">music_note</span>
                    )}
                </div>
                <div className="overflow-hidden min-w-0">
                    <p className="text-sm font-bold truncate text-text">
                        {cancionActual?.trackName ?? "Sin reproducir"}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                        {cancionActual ? `${cancionActual.artistName} · ${cancionActual.collectionName ?? ""}` : "—"}
                    </p>
                </div>
                <button onClick={cambiarFavorito} disabled={!cancionActual} aria-label="Favorito"
                    className="text-text-muted hover:text-primary transition-colors ml-2 shrink-0 disabled:opacity-30">
                    <span className={`material-symbols-outlined text-lg ${favorito ? "text-primary" : ""}`}
                        style={{ fontVariationSettings: favorito ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
            </div>

            {/* Centro */}
            <div className="flex-1 flex flex-col items-center max-w-2xl px-8">
                <Controls />
                <div className="w-full mt-2">
                    <ProgressBar />
                </div>
            </div>

            {/* Derecha */}
            <div className="w-1/4 flex items-center justify-end gap-4">
                <button aria-label="Cola" className="text-text-muted hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">queue_music</span>
                </button>
                <Volume />
            </div>
        </footer>
    );
}