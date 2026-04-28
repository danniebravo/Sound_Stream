import MainLayout from "../layout/MainLayout";

export default function NotFound() {
    return (
        <MainLayout >
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <span className="material-symbols-outlined text-8xl text-primary/30 mb-6">music_off</span>
                <h1 className="text-6xl font-black text-text mb-3">404</h1>
                <p className="text-xl font-bold text-text mb-2">Página no encontrada</p>
                <p className="text-text-muted text-sm mb-8">La página que buscas no existe o fue movida.</p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 cursor-pointer"
                >
                    Volver atrás
                </button>
            </div>
        </MainLayout>
    );
}