import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../ui/Loader"
import ArtistCard from "../music/ArtistCard"
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";
import AlbumCard from "../music/AlbumCard";

const generosEjemplo = [
    { id: 1, nombre: "Pop", color: "bg-pink-500" },
    { id: 2, nombre: "Rock", color: "bg-red-500" },
    { id: 3, nombre: "Electronic", color: "bg-blue-500" },
    { id: 4, nombre: "Hip-Hop", color: "bg-yellow-500" },
    { id: 5, nombre: "Lo-Fi", color: "bg-green-500" },
    { id: 6, nombre: "Indie", color: "bg-purple-500" },
    { id: 7, nombre: "Jazz", color: "bg-orange-500" },
    { id: 8, nombre: "Clásica", color: "bg-teal-500" },
];

const cancionesEjemplo = [
    { trackId: 1, trackName: "Neon Dreams", artistName: "Midnight Echoes", artworkUrl100: "https://picsum.photos/100/100?random=10", trackTimeMillis: 210000, primaryGenreName: "Electronic" },
    { trackId: 2, trackName: "Silent Pulse", artistName: "Midnight Echoes", artworkUrl100: "https://picsum.photos/100/100?random=11", trackTimeMillis: 195000, primaryGenreName: "Electronic" },
    { trackId: 3, trackName: "Beyond the Horizon", artistName: "Luna Sky", artworkUrl100: "https://picsum.photos/100/100?random=12", trackTimeMillis: 240000, primaryGenreName: "Indie" },
    { trackId: 4, trackName: "City Lights", artistName: "Urban Beats", artworkUrl100: "https://picsum.photos/100/100?random=13", trackTimeMillis: 180000, primaryGenreName: "Pop" },
];

const albumesEjemplo = [
    { collectionId: 1, collectionName: "Neon Dreams", artistName: "Midnight Echoes", artworkUrl100: "https://picsum.photos/300/300?random=20", trackCount: 10 },
    { collectionId: 2, collectionName: "Silent Waves", artistName: "Luna Sky", artworkUrl100: "https://picsum.photos/300/300?random=21", trackCount: 8 },
    { collectionId: 3, collectionName: "Urban Jungle", artistName: "Urban Beats", artworkUrl100: "https://picsum.photos/300/300?random=22", trackCount: 12 },
    { collectionId: 4, collectionName: "Electric Horizons", artistName: "Electric Vortex", artworkUrl100: "https://picsum.photos/300/300?random=23", trackCount: 9 },
    { collectionId: 5, collectionName: "Indie Mornings", artistName: "Luna Sky", artworkUrl100: "https://picsum.photos/300/300?random=24", trackCount: 7 },
];

const tabs = [
    { id: "todo", label: "Todos los resultados" },
    { id: "canciones", label: "Canciones" },
    { id: "albums", label: "Álbumes" },
];

export default function Buscar({ onLogout }) {
    const [filtro, setFiltro] = useState("todo");
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState(null);
    const [cargando, setCargando] = useState(false);
    const hayQuery = query.trim().length > 0;

    const buscar = async (termino) => {
        if (!termino.trim()) {
            setResultados(null);
            return;
        }
        setCargando(true);
        try {
            const respuesta = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&limit=20&entity=musicTrack,album,musicArtist`);
            const data = respuesta.data.results;
            setResultados({
                canciones: data.filter(item => item.wrapperType === "track"),
                albumes: data.filter(item => item.wrapperType === "collection"),
                artistas: data.filter(item => item.wrapperType === "artist"),
            });
        } catch (error) {
            console.error("Error al buscar:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        const valor = e.target.value;
        setQuery(valor);
        buscar(valor);
    }

    //
    useEffect(() => {
        const cargarPopulares = async () => {
            setCargando(true)
            try {
                const respuesta = await axios.get(`https://itunes.apple.com/search?term=top+hits&limit=12&entity=musicTrack`);
                const data = respuesta.data.results;
                setResultados({
                    canciones: data,
                    albumes: [],
                    artistas: []
                });
            } catch (error) {
                console.log("Error al cargar populares: ", error);
            } finally {
                setCargando(false);
            }

        };
        cargarPopulares();
    }, []);

    return (
        <MainLayout onLogout={onLogout}>
            {/* Tabs */}
            <div className="-mx-6 -mt-6 px-6 border-b border-border mb-8">
                <div className="flex gap-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFiltro(tab.id)}
                            className={`py-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${filtro === tab.id
                                ? "border-primary text-primary"
                                : "border-transparent text-text-muted hover:text-text"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Buscador */}
            <div className="mb-8 max-w-xl">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl pointer-events-none">search</span>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Buscar artistas, canciones..."
                        className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-sm text-text placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
            </div>

            {/* Loader */}
            {cargando && (
                <div className="flex justify-center py-16">
                    <Loader />
                </div>
            )}

            {/* Estado inicial — géneros + canciones populares */}
            {!cargando && !hayQuery && (
                <div className="space-y-10">
                    <div>
                        <h2 className="text-xl font-bold mb-6 text-text">Explorar categorías</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {generosEjemplo.map(genero => (
                                <div
                                    key={genero.id}
                                    onClick={() => buscar(genero.nombre)}
                                    className={`${genero.color} rounded-xl p-5 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden`}
                                >
                                    <p className="text-white font-bold text-base">{genero.nombre}</p>
                                    <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-white/20 text-7xl">music_note</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {resultados?.canciones?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-text mb-4">Canciones populares</h2>
                            <SongList canciones={resultados.canciones} mostrarIndice={true} textoVacio="Sin canciones" />
                        </section>
                    )}
                </div>
            )}

            {/* Resultados de búsqueda */}
            {!cargando && hayQuery && (
                <div className="space-y-10">

                    {/* Top Result + Canciones */}
                    {(filtro === "todo" || filtro === "canciones") && resultados?.canciones?.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4">
                                <h2 className="text-base font-semibold text-text">Top Result</h2>
                                <img
                                    src={resultados.canciones[0].artworkUrl100?.replace("100x100", "200x200")}
                                    alt={resultados.canciones[0].trackName}
                                    className="w-24 h-24 rounded-xl object-cover"
                                />
                                <div>
                                    <p className="text-text font-bold text-lg leading-tight">{resultados.canciones[0].trackName}</p>
                                    <p className="text-text-muted text-sm mt-1">
                                        {resultados.canciones[0].artistName} · {resultados.canciones[0].primaryGenreName}
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
                                <h2 className="text-base font-semibold text-text mb-4">Canciones</h2>
                                <SongList canciones={resultados.canciones.slice(0, 5)} mostrarIndice={true} textoVacio="Sin canciones" />
                            </div>
                        </div>
                    )}

                    {/* Artistas */}
                    {filtro === "todo" && resultados?.artistas?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-text mb-4">Artistas</h2>
                            <div className="artists-grid">
                                {resultados.artistas.slice(0, 4).map(artista => (
                                    <ArtistCard key={artista.artistId} artista={artista} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Álbumes */}
                    {(filtro === "todo" || filtro === "albums") && resultados?.albumes?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-text mb-6">Álbumes</h2>
                            <div className="albums-grid">
                                {resultados.albumes.map(album => (
                                    <AlbumCard key={album.collectionId} album={album} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Sin resultados */}
                    {resultados && resultados.canciones.length === 0 && resultados.albumes.length === 0 && (
                        <div className="flex flex-col items-center py-16 text-text-muted gap-3">
                            <span className="material-symbols-outlined text-5xl">search_off</span>
                            <p>No se encontraron resultados para "{query}"</p>
                        </div>
                    )}
                </div>
            )}
        </MainLayout>
    );
}