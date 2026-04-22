export default function Button({ children = "Botón", variant = "primary", ...props }) {
  const base = "px-5 py-2.5 rounded-lg font-medium text-sm cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:opacity-80",
    ghost: "bg-transparent text-text hover:bg-surface",
    secondary: "bg-surface text-text border border-border hover:opacity-80",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary}`} {...props}>
      {children}
    </button>
  );
}

