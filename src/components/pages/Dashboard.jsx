import MainLayout from "../layout/MainLayout";

// Importación de los gráficos generados por el análisis de datos en Python
import lineasBohemian from "../../assets/graficos/lineas_bohemian_por_fecha.png";
import barrasArtista from "../../assets/graficos/barras_reproducciones_por_artista.png";
import tortaCancion from "../../assets/graficos/torta_minutos_por_cancion.png";
import barrasLargas from "../../assets/graficos/barras_canciones_largas_por_artista.png";
import mapaCalor from "../../assets/graficos/mapa_calor_artista_cancion.png";

export default function Dashboard({ onLogout }) {
    const graficos = [
        {
            id: 1,
            titulo: "Reproducciones por fecha",
            descripcion: "Evolución diaria de las reproducciones de Bohemian Rhapsody.",
            imagen: lineasBohemian,
            icono: "show_chart",
        },
        {
            id: 2,
            titulo: "Reproducciones por artista",
            descripcion: "Comparativa del total de reproducciones acumuladas por cada artista.",
            imagen: barrasArtista,
            icono: "bar_chart",
        },
        {
            id: 3,
            titulo: "Minutos totales por canción",
            descripcion: "Distribución del tiempo total escuchado en cada canción del catálogo.",
            imagen: tortaCancion,
            icono: "pie_chart",
        },
        {
            id: 4,
            titulo: "Canciones largas por artista",
            descripcion: "Conteo de reproducciones de temas con duración superior a cuatro minutos.",
            imagen: barrasLargas,
            icono: "equalizer",
        },
        {
            id: 5,
            titulo: "Mapa de calor: artista vs canción",
            descripcion: "Intensidad de las reproducciones cruzando artistas y canciones.",
            imagen: mapaCalor,
            icono: "grid_view",
        },
    ];

    return (
        <MainLayout onLogout={onLogout} ocultarPlayer={true}>

            {/* Encabezado */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-black tracking-tight">Dashboard de análisis</h2>
                </div>
                <p className="text-text-muted text-sm">
                    Visualización de los datos procesados a partir del catálogo de canciones y reproducciones.
                </p>
            </section>

            {/* Métricas rápidas */}
            <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary">music_note</span>
                            <span className="text-text-muted text-xs uppercase tracking-wide">Canciones</span>
                        </div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-text-muted text-xs">en el catálogo analizado</p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary">analytics</span>
                            <span className="text-text-muted text-xs uppercase tracking-wide">Gráficos</span>
                        </div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-text-muted text-xs">visualizaciones generadas</p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary">filter_alt</span>
                            <span className="text-text-muted text-xs uppercase tracking-wide">Filtros</span>
                        </div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-text-muted text-xs">agrupaciones aplicadas</p>
                    </div>
                </div>
            </section>

            {/* Galería de gráficos */}
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {graficos.map((grafico) => (
                        <article
                            key={grafico.id}
                            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
                        >
                            <div className="p-5 border-b border-border">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        {grafico.icono}
                                    </span>
                                    <h3 className="text-lg font-bold">{grafico.titulo}</h3>
                                </div>
                                <p className="text-text-muted text-sm">{grafico.descripcion}</p>
                            </div>
                            <div className="p-4 bg-background flex items-center justify-center">
                                <img
                                    src={grafico.imagen}
                                    alt={grafico.titulo}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}