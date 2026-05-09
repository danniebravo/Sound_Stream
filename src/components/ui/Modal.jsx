export default function Modal({ title = "Modal", children, overlay = true }) {
  const content = (
    <div className="bg-surface rounded-xl p-6 w-full max-w-md shadow-xl border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text text-lg font-bold">{title}</h2>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text hover:bg-bg cursor-pointer">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
      <div className="text-text-muted text-sm leading-relaxed">
        {children || "Este es un contenido de prueba dentro del modal."}
      </div>
    </div>
  );

  if (!overlay) return content;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {content}
    </div>
  );
}
