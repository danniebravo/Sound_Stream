import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { tema, toggleTema } = useTheme();
  const navigate = useNavigate();

  //
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <nav className="sticky top-0 z-10 bg-surface border-b border-border flex items-center px-10 py-3">
      {/* Izquierda: navegación + búsqueda */}
      <div className="flex items-center gap-2 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-80 cursor-pointer">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-80 cursor-pointer">
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
        <div className="relative ml-3 flex-1 max-w-xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full rounded-xl border border-border bg-surface py-3 pl-14 pr-4 text-text outline-none"
          />
        </div>
      </div>

      {/* Derecha: tema + avatar */}
      <div className="flex items-center gap-4 ml-auto mr-10">
        <button
          onClick={toggleTema}
          title={tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-80 cursor-pointer transition-transform hover:scale-110"
        >
          <span className="material-symbols-outlined text-lg">
            {tema === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <Link to="/perfil" className="flex items-center gap-2 bg-bg rounded-full pl-1 pr-3 py-1 cursor-pointer hover:opacity-80">
          {usuario.avatar ? (
            <img src={usuario.avatar} alt={usuario.nombre} className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
              {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <span className="text-text text-sm font-medium">{usuario.nombre || "Usuario"}</span>
        </Link>
      </div>
    </nav>
  );
}