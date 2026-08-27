import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { getPagina } from "../../../../lib/paginas";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("colabora/identificacion");
  if (locale === "en") {
    return {
      title: "Not sure what you saw?",
      description: "A short guide to help identify what you spotted in the water.",
      alternates,
    };
  }
  return {
    title: "No sé qué vi, ayudame a identificarlo",
    description: "Una guía breve para identificar lo que viste en el agua.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const pagina = getPagina("identificacion");
  return (
    <Section fondo="claro">
      <PageHeader
        title={
          locale === "en"
            ? "Not sure what you saw?"
            : pagina.titulo
        }
      />
      {/* components/GuiaIdentificacion.js esta construido y probado
          (docs/panel-completo.md Bloque 6), pero content/guia-identificacion.json
          todavia es un placeholder sin revision biologica - ver su
          campo "_aviso". No se activa en produccion hasta que ese
          archivo tenga el arbol real revisado por el equipo. */}
      <TodoAviso locale={locale} />
    </Section>
  );
}
