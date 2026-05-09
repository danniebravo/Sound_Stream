import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalAgregarPlaylist({ song, onCerrar }) {
    const [playlists, setPlaylists] = useState([]);
    const [notificacion, setNotificacion] = useState(null);

    const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/playlists/usuario/${usuario.id}`);
                setPlaylists(res.data);
            } catch (err) {
                console.error("Error al cargar playlists:", err);
            }
        };
        cargar();
    }, []);

    const agregar = async (playlistId) => {
        try {
            await axios.post(`http://localhost:8080/api/playlists/${playlistId}/canciones`, {
                trackId: song.trackId,
                trackName: song.trackName,
                artistName: song.artistName,
                artworkUrl: song.artworkUrl100,
                previewUrl: song.previewUrl,
                trackTimeMillis: song.trackTimeMillis,
            });
            setNotificacion({ tipo: "exito", mensaje: `Agregada a la playlist` });
            setTimeout(() => { setNotificacion(null); onCerrar(); }, 1500);
        } catch (err) {
            setNotificacion({ tipo: "error", mensaje: "Ya está en esta playlist" });
            setTimeout(() => setNotificacion(null), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <h3 className="text-base font-black text-text mb-1">Agregar a playlist</h3>
                <p className="text-xs text-text-muted mb-4 truncate">{song.trackName} — {song.artistName}</p>

                {notificacion && (
                    <div className={`mb-3 px-4 py-2 rounded-xl text-sm font-medium ${notificacion.tipo === "exito" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"}`}>
                        {notificacion.mensaje}
                    </div>
                )}

                {playlists.length === 0 && (
                    <p className="text-text-muted text-sm text-center py-6">No tienes playlists aún</p>
                )}

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {playlists.map(pl => (
                        <div
                            key={pl.id}
                            onClick={() => agregar(pl.id)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface cursor-pointer transition-colors border border-transparent hover:border-border"
                        >
                            <img
                                src={pl.portada || "https://picsum.photos/300/300?random=1"}
                                alt={pl.nombre}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-text font-bold text-sm truncate">{pl.nombre}</p>
                                <p className="text-text-muted text-xs">{pl.descripcion || "Sin descripción"}</p>
                            </div>
                            <span className="material-symbols-outlined text-primary text-xl">add</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onCerrar}
                    className="w-full mt-4 py-2.5 bg-surface border border-border text-text font-bold text-sm rounded-xl hover:opacity-80 cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}