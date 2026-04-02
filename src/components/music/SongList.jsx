import SongCard from "./SongCard";

export default function SongList({
    canciones = [], 
    mostrarIndice = false,
    textoVacio = "No hay canciones" 
}) {
    // Si no hay canciones, mostrar mensaje de vacío
    if (!canciones.length) {
        return (
            <div className="text-center py-12 text-text-muted">
                <span className="material-symbols-outlined text-5xl block mb-3 opacity-30">
                    music_off
                </span>
                <p className="text-sm font-medium">{textoVacio}</p>
            </div>
        );
    }

    // Si hay canciones, renderizar la lista
    return (
        <div className="space-y-1">
            {canciones.map((cancion, i) => (
                <SongCard
                    key={cancion.trackId}
                    song={cancion}
                    colaCanciones={canciones}  
                    indice={i}
                    mostrarIndice={mostrarIndice}
                />
            ))}
        </div>
    );
}