import { Section, PageHeader } from "../../../components/ui";

export const metadata = {
  title: "Identidad Franca",
  description:
    "Proyecto en el que Yaqu Pacha Uruguay participa junto a otras instituciones para el estudio y la identificación de la ballena franca austral.",
};

export default function Home() {
  return (
    <Section fondo="claro">
      <PageHeader
        title="Identidad Franca"
        description="Estamos preparando esta página. Yaqu Pacha Uruguay forma parte de este proyecto junto a otras instituciones."
      />
    </Section>
  );
}
