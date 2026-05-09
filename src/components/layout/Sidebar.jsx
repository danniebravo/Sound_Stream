import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({onLogout}) {
    const location = useLocation();

    return (
        <aside className="w-60 h-screen sticky top-0 bg-surface border-r border-border flex flex-col p-4 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 px-2">
                <span className="material-symbols-outlined text-primary text-2xl">headphones</span>
                <h1 className="text-primary text-xl font-bold tracking-tight">SoundStream</h1>
            </div>

            {/* Navegación */}
            <nav className="flex flex-col gap-1 flex-1">
                <Link to="/inicio" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline ${location.pathname === "/inicio" ? "bg-primary/10 text-primary" : "text-text hover:bg-primary/10"}`}>
                    <span className="material-symbols-outlined text-xl">home</span>
                    Inicio
                </Link>
                <Link to="/buscar" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline ${location.pathname === "/buscar" ? "bg-primary/10 text-primary" : "text-text hover:bg-primary/10"}`}>
                    <span className="material-symbols-outlined text-xl">search</span>
                    Buscar
                </Link>
                <Link to="/biblioteca" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline ${location.pathname === "/biblioteca" ? "bg-primary/10 text-primary" : "text-text hover:bg-primary/10"}`}>
                    <span className="material-symbols-outlined text-xl">library_music</span>
                    Biblioteca
                </Link>
                <Link to="/perfil" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline ${location.pathname === "/perfil" ? "bg-primary/10 text-primary" : "text-text hover:bg-primary/10"}`}>
                    <span className="material-symbols-outlined text-xl">person</span>
                    Mi perfil
                </Link>
                <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline text-text hover:bg-primary/10 cursor-pointer">
                    <span className="material-symbols-outlined text-xl">logout</span>
                    Cerrar sesión
                </button>
            </nav>

            {/* Botón crear playlist */}
            <button className="bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer">
                <span className="material-symbols-outlined text-lg">add</span>
                Crear playlist
            </button>
        </aside>
    );
}