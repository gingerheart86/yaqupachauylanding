import Section from "./Section";
import PageHeader from "./PageHeader";
import TodoAviso from "../TodoAviso";

export default function PaginaProyecto({
  eyebrow,
  titulo,
  descripcion,
  logosSocios,
  locale = "es",
  todo = false,
  children,
}) {
  return (
    <Section fondo="claro">
      <PageHeader eyebrow={eyebrow} title={titulo} description={descripcion} />
      {todo ? (
        <TodoAviso locale={locale} />
      ) : (
        <div className="mt-8">{children}</div>
      )}
      {logosSocios && <div className="mt-12">{logosSocios}</div>}
    </Section>
  );
}
