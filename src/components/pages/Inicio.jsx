import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";
import AlbumCard from "../music/AlbumCard";
import Loader from "../ui/Loader";
import ModalVerAlbum from "../music/ModalVerAlbum";

export default function Inicio({ onLogout }) {
    const [canciones, setCanciones] = useState([]);
    const [albumes, setAlbumes] = useState([]);
    const [cargandoCanciones, setCargandoCanciones] = useState(true);
    const [cargandoAlbumes, setCargandoAlbumes] = useState(true);
    const [errorCanciones, setErrorCanciones] = useState(false);
    const [errorAlbumes, setErrorAlbumes] = useState(false);
    const [albumSeleccionado, setAlbumSeleccionado] = useState(null);

    useEffect(() => {
        axios
            .get("https://itunes.apple.com/search?term=top+hits&entity=musicTrack&limit=10")
            .then(res => setCanciones(res.data.results ?? []))
            .catch(() => setErrorCanciones(true))
            .finally(() => setCargandoCanciones(false));

        axios
            .get("https://itunes.apple.com/search?term=pop&entity=album&limit=8")
            .then(res => setAlbumes(res.data.results ?? []))
            .catch(() => setErrorAlbumes(true))
            .finally(() => setCargandoAlbumes(false));
    }, []);

    return (
        <MainLayout onLogout={onLogout}>
            {/* Bienvenida */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black tracking-tight">¡Bienvenido de nuevo!</h2>
                </div>
            </section>

            {/* Canciones */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Canciones</h2>
                </div>

                {cargandoCanciones && <Loader />}

                {!cargandoCanciones && errorCanciones && (
                    <p className="text-text-muted text-sm">No se pudieron cargar las canciones. Intenta más tarde.</p>
                )}

                {!cargandoCanciones && !errorCanciones && (
                    <SongList
                        canciones={canciones}
                        mostrarIndice={true}
                        textoVacio="No hay canciones disponibles"
                    />
                )}
            </section>

            {/* Álbumes */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Álbumes</h2>
                </div>

                {cargandoAlbumes && <Loader />}

                {!cargandoAlbumes && errorAlbumes && (
                    <p className="text-text-muted text-sm">No se pudieron cargar los álbumes. Intenta más tarde.</p>
                )}

                {!cargandoAlbumes && !errorAlbumes && (
                    <div className="albums-grid">
                        {albumes.map(album => (
                            <AlbumCard
                                key={album.collectionId}
                                album={album}
                                alHacerClic={setAlbumSeleccionado}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Modal ver álbum */}
            {albumSeleccionado && (
                <ModalVerAlbum
                    album={albumSeleccionado}
                    onCerrar={() => setAlbumSeleccionado(null)}
                />
            )}
        </MainLayout>
    );
}