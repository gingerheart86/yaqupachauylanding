import { Section, PageHeader } from "../../../components/ui";

export const metadata = {
  title: "Red Nacional de Varamientos",
  description:
    "Proyecto en el que Yaqu Pacha Uruguay participa junto a otras instituciones para monitorear varamientos de mamíferos acuáticos en la costa uruguaya.",
};

export default function Home() {
  return (
    <Section fondo="claro">
      <PageHeader
        title="Red Nacional de Varamientos"
        description="Estamos preparando esta página. Yaqu Pacha Uruguay forma parte de este proyecto junto a otras instituciones."
      />
    </Section>
  );
}
