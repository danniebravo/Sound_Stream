// context/PlayerContext.jsx
import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    // Estados principales
    const [cancionActual, setCancionActual] = useState(null);
    const [colaCanciones, setColaCanciones] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [reproduciendo, setReproduciendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [duracion, setDuracion] = useState(0);
    const [volumen, setVolumen] = useState(0.7);
    const [favorito, setFavorito] = useState(false);

    // Referencia al elemento audio
    const audioRef = useRef(null);

    // Inicializar audio
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = volumen;

        // Event listeners
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setProgreso(audio.currentTime / audio.duration);
        };

        const handleLoadedMetadata = () => {
            setDuracion(audio.duration);
        };

        const handleEnded = () => {
            siguiente();
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
            audio.pause();
            audio.src = "";
        };
    }, []);

    // Efecto para cambiar volumen
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volumen;
        }
    }, [volumen]);

    // Reproducir canción
    const reproducir = (cancion, cola = [cancion], indice = 0) => {
        if (!cancion?.previewUrl) {
            console.warn("No hay preview URL para esta canción");
            return;
        }

        // Si es la misma canción, solo reanudar
        if (cancionActual?.trackId === cancion.trackId && audioRef.current) {
            audioRef.current.play();
            setReproduciendo(true);
            return;
        }

        // Cargar nueva canción
        setCancionActual(cancion);
        setColaCanciones(cola);
        setIndiceActual(indice);

        if (audioRef.current) {
            audioRef.current.src = cancion.previewUrl;
            audioRef.current.load();
            audioRef.current.play();
            setReproduciendo(true);
        }

        // Verificar si es favorito (podrías cargar desde localStorage)
        const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setFavorito(favoritos.includes(cancion.trackId));
    };

    // Pausar/Reanudar
    const pausarReanudar = () => {
        if (!audioRef.current || !cancionActual) return;

        if (reproduciendo) {
            audioRef.current.pause();
            setReproduciendo(false);
        } else {
            audioRef.current.play();
            setReproduciendo(true);
        }
    };

    // Siguiente canción
    const siguiente = () => {
        if (colaCanciones.length === 0) return;

        const nuevoIndice = (indiceActual + 1) % colaCanciones.length;
        const nuevaCancion = colaCanciones[nuevoIndice];

        if (nuevaCancion) {
            reproducir(nuevaCancion, colaCanciones, nuevoIndice);
        }
    };

    // Anterior canción
    const anterior = () => {
        if (colaCanciones.length === 0) return;

        const nuevoIndice = (indiceActual - 1 + colaCanciones.length) % colaCanciones.length;
        const nuevaCancion = colaCanciones[nuevoIndice];

        if (nuevaCancion) {
            reproducir(nuevaCancion, colaCanciones, nuevoIndice);
        }
    };

    // Cambiar progreso
    const cambiarProgreso = (nuevoProgreso) => {
        if (audioRef.current && duracion) {
            audioRef.current.currentTime = nuevoProgreso * duracion;
            setProgreso(nuevoProgreso);
        }
    };

    // Cambiar favorito
    const cambiarFavorito = () => {
        if (!cancionActual) return;

        const nuevosFavoritos = !favorito;
        setFavorito(nuevosFavoritos);

        // Guardar en localStorage
        const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
        if (nuevosFavoritos) {
            if (!favoritos.includes(cancionActual.trackId)) {
                favoritos.push(cancionActual.trackId);
            }
        } else {
            const index = favoritos.indexOf(cancionActual.trackId);
            if (index > -1) favoritos.splice(index, 1);
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    const value = {
        cancionActual,
        reproduciendo,
        progreso,
        duracion,
        volumen,
        favorito,
        reproducir,
        pausarReanudar,
        siguiente,
        anterior,
        cambiarProgreso,
        cambiarVolumen: setVolumen,
        cambiarFavorito,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer debe usarse dentro de PlayerProvider");
    }
    return context;
}