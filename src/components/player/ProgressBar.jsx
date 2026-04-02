import { usePlayer } from "../../context/PlayerContext";

export default function ProgressBar() {
    const { progreso, duracion, cambiarProgreso } = usePlayer();  

    const formatearTiempo = (segundos) => { 
        if (!segundos || isNaN(segundos)) return "0:00";
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = String(Math.floor(segundos % 60)).padStart(2, "0");
        return `${minutos}:${segundosRestantes}`;
    };

    const manejarClic = (e) => { 
        const rect = e.currentTarget.getBoundingClientRect();
        const nuevaProgresion = (e.clientX - rect.left) / rect.width;
        cambiarProgreso(Math.min(1, Math.max(0, nuevaProgresion)));
    };

    const manejarTecla = (e) => { 
        if (e.key === "ArrowRight") cambiarProgreso(Math.min(1, progreso + 0.02));
        if (e.key === "ArrowLeft") cambiarProgreso(Math.max(0, progreso - 0.02));
    };

    return (
        <div className="w-full flex items-center gap-3">
            {/* Tiempo actual */}
            <span className="text-[10px] font-bold text-text-muted w-8 text-right tabular-nums shrink-0">
                {formatearTiempo(progreso * duracion)}
            </span>

            {/* Barra de progreso */}
            <div
                role="slider"
                tabIndex={0}
                aria-label="Progreso"
                aria-valuenow={Math.round(progreso * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                onClick={manejarClic}
                onKeyDown={manejarTecla}
                className="flex-1 h-1 bg-border rounded-full relative group cursor-pointer"
            >
                {/* Barra de relleno */}
                <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    style={{ width: `${progreso * 100}%` }}
                />

                {/* Burbuja indicadora */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ left: `${progreso * 100}%` }}
                />
            </div>

            {/* Duración total */}
            <span className="text-[10px] font-bold text-text-muted w-8 tabular-nums shrink-0">
                {formatearTiempo(duracion)}
            </span>
        </div>
    );
}