export default function AlbumCard({ album, alHacerClic }) {  // onClick → alHacerClic
    const portada = album.artworkUrl100?.replace("100x100", "300x300") ?? null;
    const año = album.releaseDate ? new Date(album.releaseDate).getFullYear() : null;

    return (
        <div
            onClick={() => alHacerClic?.(album)}
            className="group hover-card-enhanced cursor-pointer rounded-2xl p-3 bg-surface border border-border transition-all duration-200"
        >
            {/* Portada */}
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-border">
                {portada ? (
                    <img src={portada} alt={album.collectionName} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <span className="material-symbols-outlined text-primary/40 text-5xl">album</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <div className="size-12 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                        <span className="material-symbols-outlined text-white text-2xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                </div>
            </div>

            <p className="text-sm font-bold truncate text-text">{album.collectionName}</p>
            <p className="text-xs text-text-muted truncate mt-0.5">
                {album.artistName}{año ? ` · ${año}` : ""}
            </p>
            {album.trackCount != null && (
                <p className="text-xs text-text-muted mt-1 opacity-70">
                    {album.trackCount} {album.trackCount === 1 ? "canción" : "canciones"}
                </p>
            )}
        </div>
    );
}