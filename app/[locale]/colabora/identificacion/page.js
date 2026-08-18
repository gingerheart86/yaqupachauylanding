import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
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
  return (
    <Section fondo="claro">
      <PageHeader
        title={
          locale === "en"
            ? "Not sure what you saw?"
            : "No sé qué vi, ayudame a identificarlo"
        }
      />
      <TodoAviso locale={locale} />
    </Section>
  );
}
