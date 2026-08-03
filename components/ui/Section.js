const backgrounds = {
  claro: "bg-white text-texto",
  costa: "bg-costa-100 text-texto",
  mar: "bg-mar-800 text-white",
};

export default function Section({
  fondo = "claro",
  className = "",
  innerClassName = "",
  children,
  ...props
}) {
  return (
    <section className={`${backgrounds[fondo]} ${className}`} {...props}>
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
