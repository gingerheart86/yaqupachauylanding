const backgrounds = {
  claro: "bg-white text-texto",
  costa: "bg-costa-100 text-texto",
  mar: "bg-mar-800 text-white",
  // textura-guarda.webp: luminancia clara (194), exige texto oscuro y
  // links en marca-oscuro en vez de marca pleno - seccion 5 de
  // docs/fase2-assets-yez.md.
  textura: "bg-costa-100 text-texto bg-cover bg-center [&_a]:text-marca-oscuro",
};

const estiloTextura = {
  backgroundImage: "url(/decor/textura-guarda.webp)",
};

export default function Section({
  fondo = "claro",
  className = "",
  innerClassName = "",
  children,
  ...props
}) {
  return (
    <section
      className={`${backgrounds[fondo]} ${className}`}
      style={fondo === "textura" ? estiloTextura : undefined}
      {...props}
    >
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
