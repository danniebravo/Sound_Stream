export default function Input({ placeholder = "Escribe aquí...", icon, ...props }) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`input-sp w-full ${icon ? "!pl-16" : ""}`}
        {...props}
      />
    </div>
  );
}