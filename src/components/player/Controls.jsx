import { usePlayer } from "../../context/PlayerContext";

export default function Controls({ tamaño = "md" }) {
    const { cancionActual, reproduciendo, pausarReanudar, siguiente, anterior } = usePlayer();

    // Tamaños de botones según prop
    const tamañoBoton = { sm: "size-9", md: "size-11", lg: "size-14" }[tamaño];
    const tamañoIconoPlay = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" }[tamaño];
    const tamañoIconoSaltar = { sm: "text-xl", md: "text-3xl", lg: "text-3xl" }[tamaño];

    return (
        <div className="flex items-center gap-6">
            {/* Botón anterior */}
            <button
                onClick={anterior}
                disabled={!cancionActual}
                aria-label="Anterior"
                className="text-text hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <span className={`material-symbols-outlined ${tamañoIconoSaltar}`}>
                    skip_previous
                </span>
            </button>

            {/* Botón play/pausa */}
            <button
                onClick={pausarReanudar}
                disabled={!cancionActual}
                aria-label={reproduciendo ? "Pausar" : "Reproducir"}
                className={`${tamañoBoton} bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
                <span
                    className={`material-symbols-outlined ${tamañoIconoPlay}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    {reproduciendo ? "pause" : "play_arrow"}
                </span>
            </button>

            {/* Botón siguiente */}
            <button
                onClick={siguiente}
                disabled={!cancionActual}
                aria-label="Siguiente"
                className="text-text hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <span className={`material-symbols-outlined ${tamañoIconoSaltar}`}>
                    skip_next
                </span>
            </button>
        </div>
    );
}