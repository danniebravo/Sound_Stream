import { usePlayer } from "../../context/PlayerContext";

export default function Volume() {
    const { volumen, cambiarVolumen } = usePlayer();
    const estaSilenciado = volumen === 0;
    const icono = estaSilenciado ? "volume_off" : volumen < 0.4 ? "volume_down" : "volume_up";

    const manejarClic = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const nuevoVolumen = (e.clientX - rect.left) / rect.width;
        cambiarVolumen(Math.min(1, Math.max(0, nuevoVolumen)));
    };

    const manejarTecla = (e) => {
        if (e.key === "ArrowRight") cambiarVolumen(Math.min(1, volumen + 0.05));
        if (e.key === "ArrowLeft") cambiarVolumen(Math.max(0, volumen - 0.05));
    };

    return (
        <div className="flex items-center gap-2 w-32">
            {/* Botón de silenciar/activar */}
            <button 
                onClick={() => cambiarVolumen(estaSilenciado ? 0.7 : 0)} 
                aria-label={estaSilenciado ? "Activar" : "Silenciar"}
                className="text-text-muted hover:text-primary transition-colors shrink-0"
            >
                <span className="material-symbols-outlined text-xl">{icono}</span>
            </button>

            {/* Barra de volumen */}
            <div 
                role="slider" 
                tabIndex={0} 
                aria-label="Volumen"
                aria-valuenow={Math.round(volumen * 100)} 
                aria-valuemin={0} 
                aria-valuemax={100}
                onClick={manejarClic} 
                onKeyDown={manejarTecla}
                className="flex-1 h-1 bg-border rounded-full relative group cursor-pointer"
            >
                {/* Barra de relleno */}
                <div 
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    style={{ width: `${volumen * 100}%` }} 
                />
                
                {/* Burbuja indicadora */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ left: `${volumen * 100}%` }} 
                />
            </div>
        </div>
    );
}