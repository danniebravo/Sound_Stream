export default function Sidebar() {
  const links = [
    { icon: "home", label: "Inicio" },
    { icon: "search", label: "Buscar" },
    { icon: "library_music", label: "Biblioteca" },
    { icon: "person", label: "Mi perfil" },
    { icon: "logout", label: "Cerrar sesión" },
  ];

  return (
    <aside className="w-60 h-screen sticky top-0 bg-surface border-r border-border flex flex-col p-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <span className="material-symbols-outlined text-primary text-2xl">headphones</span>
        <h1 className="text-primary text-xl font-bold tracking-tight">SoundStream</h1>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <a
            key={link.label}
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text hover:bg-primary/10 text-sm font-medium no-underline"
          >
            <span className="material-symbols-outlined text-xl">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </nav>

      {/* Botón crear playlist */}
      <button className="bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer">
        <span className="material-symbols-outlined text-lg">add</span>
        Crear playlist
      </button>
    </aside>
  );
}
