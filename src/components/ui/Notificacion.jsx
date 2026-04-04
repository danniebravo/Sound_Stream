export default function Notificacion({ tipo = "exito", mensaje = "Operación exitosa", fixed = true, className = "" }) {
  const isExito = tipo === "exito";

  const position = fixed ? "fixed bottom-4 right-4 z-50" : "";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white text-sm font-medium shadow-lg ${
        isExito ? "bg-green-600" : "bg-red-600"
      } ${position} ${className}`}
    >
      <span className="material-symbols-outlined text-lg">
        {isExito ? "check_circle" : "error"}
      </span>
      {mensaje}
    </div>
  );
}
