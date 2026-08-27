import { Section, PageHeader } from "../../../../components/ui";
import Carrito from "../../../../components/tienda/Carrito";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Carrito",
  description: "Tu pedido de la Yaqutienda.",
  alternates: alternatesPara("tienda/carrito", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Tu carrito" />
      <div className="mt-8">
        <Carrito locale={locale} />
      </div>
    </Section>
  );
}
