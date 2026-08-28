import { Section, PageHeader } from "../../../../components/ui";
import VoluntariadoForm from "../../../../components/VoluntariadoForm";
import { getPagina } from "../../../../lib/paginas";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("colabora/voluntariado");
  if (locale === "en") {
    return {
      title: "Volunteer with us",
      description: "Join Yaqu Pacha Uruguay as a volunteer.",
      alternates,
    };
  }
  return {
    title: "Sumate como voluntaria",
    description: "Sumate como voluntaria a Yaqu Pacha Uruguay.",
    alternates,
  };
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Los campos reales del formulario estan pendientes de que el equipo
// los defina a partir del formulario de Google actual - mientras
// content/paginas/voluntariado.mdx tenga "campos" vacio, se muestra
// el enlace al formulario de Google en vez de un formulario a medio
// hacer. docs/correcciones-revision-local.md punto 6,
// docs/catalogo-figuritas-y-voluntariado.md Bloque B.
const FORMULARIO_GOOGLE = "https://forms.gle/NT2VNtnA7VurywrB7";

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const pagina = getPagina("voluntariado");
  const hayCampos = Array.isArray(pagina.campos) && pagina.campos.length > 0;

  return (
    <Section fondo="claro">
      <PageHeader
        title={esIngles ? "Volunteer with us" : pagina.titulo}
        description={pagina.intro}
      />

      <div className="mt-10 max-w-lg mx-auto">
        {hayCampos ? (
          <VoluntariadoForm
            campos={pagina.campos}
            mensajeExito={pagina.mensaje_exito}
            avisoDatos={pagina.aviso_datos}
          />
        ) : (
          <div className="rounded-lg border-[0.5px] border-marca-grafito/20 bg-costa-100 p-6 text-center">
            <p className="text-texto">
              {esIngles
                ? "Our own form is on its way. Meanwhile, use this form to sign up:"
                : "Nuestro formulario propio está en camino. Mientras tanto, sumate con este:"}
            </p>
            <a
              href={FORMULARIO_GOOGLE}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-block rounded-md bg-marca-oscuro px-6 py-3 font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
            >
              {esIngles ? "Open the form" : "Abrir el formulario"}
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}
