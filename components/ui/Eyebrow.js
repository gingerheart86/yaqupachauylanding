const tonos = {
  limon: "text-acento-limon",
  marca: "text-marca",
  grafito: "text-marca-grafito",
};

export default function Eyebrow({ tono = "grafito", className = "", children }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-widest ${tonos[tono]} ${className}`}>
      {children}
    </p>
  );
}
