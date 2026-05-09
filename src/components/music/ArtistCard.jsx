export default function ArtistCard({ artista, alHacerClic }) {  // artist → artista, onClick → alHacerClic
    // Generar color único basado en el nombre del artista
    const hue = [...(artista.artistName ?? "")].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
    const colorFondo = `hsl(${hue}, 55%, 38%)`;

    // Generar iniciales (máximo 2 letras)
    const iniciales = (artista.artistName ?? "?")
        .split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

    return (
        <div
            onClick={() => alHacerClic?.(artista)}
            className="group hover-card-enhanced cursor-pointer flex flex-col items-center text-center p-4 rounded-2xl bg-surface border border-border transition-all duration-200"
        >
            {/* Avatar circular con iniciales */}
            <div className="relative size-20 mb-3">
                <div
                    className="size-20 rounded-full border-2 border-border group-hover:border-primary/40 transition-colors duration-200 flex items-center justify-center"
                    style={{ backgroundColor: colorFondo }}
                >
                    <span className="text-white font-black text-xl select-none">{iniciales}</span>
                </div>

                {/* Overlay con ícono play al hacer hover */}
                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
            </div>

            {/* Nombre del artista */}
            <p className="text-sm font-bold truncate w-full text-text">{artista.artistName}</p>

            {/* Género musical (opcional) */}
            {artista.primaryGenreName && (
                <span className="mt-1.5 text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full truncate max-w-full">
                    {artista.primaryGenreName}
                </span>
            )}
        </div>
    );
}