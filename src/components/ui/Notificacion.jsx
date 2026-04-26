export default function Notificacion({ tipo = "exito", mensaje = "Operación exitosa", fixed = true, className = "" }) {
  const isExito = tipo === "exito";
  const position = fixed ? "fixed top-12 right-4 z-50" : "";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium shadow-lg ${isExito
        ? "bg-primary text-white"
        : "bg-rose-500 text-white"
        } ${position} ${className}`}
    >
      <span className="material-symbols-outlined text-lg">
        {isExito ? "check_circle" : "error"}
      </span>
      {mensaje}
    </div>
  );
}