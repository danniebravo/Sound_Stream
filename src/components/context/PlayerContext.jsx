
import { createContext, useContext, useState, useRef, useCallback } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
    // Estados renombrados al español
    const [cancionActual, setCancionActual] = useState(null);
    const [cola, setCola] = useState([]);
    const [indiceCola, setIndiceCola] = useState(0);
    const [reproduciendo, setReproduciendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [duracion, setDuracion] = useState(0);
    const [volumen, setVolumen] = useState(0.7);
    const [favorito, setFavorito] = useState(false);

    const audioRef = useRef(new Audio());
    const audio = audioRef.current;

    audio.volume = volumen;
    audio.ontimeupdate = () => { if (audio.duration) setProgreso(audio.currentTime / audio.duration); };
    audio.onloadedmetadata = () => setDuracion(audio.duration);
    audio.onended = () => siguiente();

    // Función reproducir (antes play)
    const reproducir = useCallback((cancion, colaCanciones = [], indice = 0) => {
        if (!cancion) return;
        setCancionActual(cancion);
        setCola(colaCanciones.length ? colaCanciones : [cancion]);
        setIndiceCola(indice);
        setFavorito(false);
        audio.src = cancion.previewUrl || "";
        audio.play().then(() => setReproduciendo(true)).catch(() => setReproduciendo(false));
    }, [audio]);

    // Función pausar/reanudar (antes togglePlay)
    const pausarReanudar = useCallback(() => {
        if (!cancionActual) return;
        if (reproduciendo) {
            audio.pause();
            setReproduciendo(false);
        } else {
            audio.play().then(() => setReproduciendo(true));
        }
    }, [audio, cancionActual, reproduciendo]);

    const siguiente = useCallback(() => {
        const nuevoIndice = indiceCola + 1;
        if (nuevoIndice < cola.length) {
            reproducir(cola[nuevoIndice], cola, nuevoIndice);
        } else {
            setReproduciendo(false);
            setProgreso(0);
            audio.pause();
        }
    }, [cola, indiceCola, reproducir, audio]);

    const anterior = useCallback(() => {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            setProgreso(0);
            return;
        }
        const indiceAnterior = indiceCola - 1;
        if (indiceAnterior >= 0) {
            reproducir(cola[indiceAnterior], cola, indiceAnterior);
        }
    }, [audio, cola, indiceCola, reproducir]);

    const cambiarProgreso = useCallback((ratio) => {
        if (!audio.duration) return;
        audio.currentTime = ratio * audio.duration;
        setProgreso(ratio);
    }, [audio]);

    const cambiarVolumen = useCallback((v) => {
        setVolumen(v);
        audio.volume = v;
    }, [audio]);

    const cambiarFavorito = useCallback(() => setFavorito((f) => !f), []);

    return (
        <PlayerContext.Provider value={{
            // Lo que necesita SongCard
            cancionActual,
            reproduciendo,
            reproducir,
            pausarReanudar,

            // Lo que necesitan otros componentes
            cola,
            indiceCola,
            progreso,
            duracion,
            volumen,
            favorito,
            siguiente,
            anterior,
            cambiarProgreso,
            cambiarVolumen,
            cambiarFavorito,
        }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const ctx = useContext(PlayerContext);
    if (!ctx) throw new Error("usePlayer debe usarse dentro de <PlayerProvider>");
    return ctx;
}