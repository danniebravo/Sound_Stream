export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-surface border-b border-border flex items-center justify-between px-6 py-3">
      {/* Izquierda: navegación + búsqueda */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-80 cursor-pointer">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>
        <button className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-80 cursor-pointer">
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
        <div className="relative ml-3">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-64 rounded-xl border border-border bg-surface py-3 pl-14 pr-4 text-text outline-none"
          />
        </div>
      </div>

      {/* Derecha: tema + avatar */}
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-80 cursor-pointer">
          <span className="material-symbols-outlined text-lg">dark_mode</span>
        </button>
        <div className="flex items-center gap-2 bg-bg rounded-full pl-1 pr-3 py-1 cursor-pointer hover:opacity-80">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <span className="text-text text-sm font-medium">Usuario</span>
        </div>
      </div>
    </nav>
  );
}
