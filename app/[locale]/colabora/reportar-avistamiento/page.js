import Image from "next/image";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Section, PageHeader } from "../../../../components/ui";
import {
  SURVEY123_TONINA_URL,
  SURVEY123_GENERICO_URL,
  TELEGRAM_BALLENASUY_URL,
  WHATSAPP_VARAMIENTOS,
  TELEFONO_VARAMIENTOS,
  TELEFONO_VARAMIENTOS_TEL,
} from "../../../../lib/contacto";
import { SILUETAS } from "../../../../lib/especies";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("colabora/reportar-avistamiento");
  if (locale === "en") {
    return {
      title: "Report a sighting",
      description:
        "Report a tonina, whale, orca or franciscana sighting off the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Reportar un avistamiento",
    description:
      "Reportá un avistamiento de tonina, ballena, orca o franciscana en la costa uruguaya.",
    alternates,
  };
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

function Tarjeta({ silueta, titulo, nota, href, notaDestino }) {
  return (
    <a
      href={href}
      className={`group flex flex-col items-center rounded-lg border-[0.5px] border-marca-grafito/20 bg-white p-6 text-center hover:bg-costa-100 ${FOCUS_RING}`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mar-800">
        <Image
          src={silueta.src}
          alt=""
          aria-hidden="true"
          width={silueta.width}
          height={silueta.height}
          className="h-10 w-auto"
        />
      </div>
      <h3 className="mt-4 font-semibold text-mar-800">{titulo}</h3>
      {notaDestino && (
        <p className="mt-1 text-xs text-marca-grafito">{notaDestino}</p>
      )}
      {nota && <p className="mt-2 text-sm text-texto">{nota}</p>}
    </a>
  );
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const hrefContacto = `/${locale}/colabora/contacto`;

  const tarjetas = [
    {
      silueta: SILUETAS.tonina,
      titulo: "Tonina",
      href: SURVEY123_TONINA_URL,
      notaDestino: esIngles ? "Opens the report form" : "Abre el formulario de reporte",
    },
    {
      silueta: SILUETAS["ballena-franca"],
      titulo: esIngles ? "Whale" : "Ballena",
      href: TELEGRAM_BALLENASUY_URL ?? hrefContacto,
      notaDestino: TELEGRAM_BALLENASUY_URL
        ? esIngles
          ? "Opens the BallenasUY Telegram group"
          : "Abre el grupo de Telegram de BallenasUY"
        : esIngles
          ? "Coming soon — contact us for now"
          : "Próximamente — mientras tanto, escribinos por contacto",
    },
    {
      silueta: SILUETAS.orca,
      titulo: esIngles ? "Other" : "Otros",
      href: SURVEY123_GENERICO_URL ?? hrefContacto,
      notaDestino: SURVEY123_GENERICO_URL
        ? esIngles
          ? "Opens the report form"
          : "Abre el formulario de reporte"
        : esIngles
          ? "Coming soon — contact us for now"
          : "Próximamente — mientras tanto, escribinos por contacto",
    },
  ];

  if (esIngles) {
    return (
      <Section fondo="claro">
        <PageHeader
          title="Report a sighting"
          description="Every opportunistic sighting reported by the public helps us monitor these species and build citizen-science projects along the Uruguayan coast."
        />

        <div className="mt-8 max-w-2xl mx-auto rounded-lg border-[0.5px] border-acento-medusa bg-acento-medusa/10 p-6">
          <div className="flex items-start gap-2">
            <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-mar-800" aria-hidden="true" />
            <p className="font-semibold text-mar-800">
              A sighting is the observation of <strong>live animals</strong>, from the coast or from a boat.
            </p>
          </div>
          <p className="mt-3 text-texto">
            If the animal is <strong>dead or stranded on the beach</strong>, it is not a
            sighting — you need to report a stranding instead.
          </p>
          <p className="mt-3">
            <a
              href={WHATSAPP_VARAMIENTOS}
              className={`font-semibold text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
            >
              Report a stranding: {TELEFONO_VARAMIENTOS}
            </a>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {tarjetas.map((t) => (
            <Tarjeta key={t.titulo} {...t} />
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            href={`/${locale}/colabora/identificacion`}
            className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
          >
            Not sure what you saw? Help me identify it
          </Link>
        </p>
      </Section>
    );
  }

  return (
    <Section fondo="claro">
      <PageHeader
        title="Reportá un avistamiento"
        description="Cada avistamiento oportunista que reporta la gente nos ayuda a monitorear estas especies y a construir proyectos de ciencia ciudadana en la costa uruguaya."
      />

      <div className="mt-8 max-w-2xl mx-auto rounded-lg border-[0.5px] border-acento-medusa bg-acento-medusa/10 p-6">
        <div className="flex items-start gap-2">
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-mar-800" aria-hidden="true" />
          <p className="font-semibold text-mar-800">
            Un avistamiento es la observación de <strong>animales vivos</strong>, desde la costa o a bordo de una embarcación.
          </p>
        </div>
        <p className="mt-3 text-texto">
          Si el animal está <strong>muerto o varado en la playa</strong>, no es un
          avistamiento: hay que reportar un varamiento.
        </p>
        <p className="mt-3">
          <a
            href={WHATSAPP_VARAMIENTOS}
            className={`font-semibold text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
          >
            Avisá al {TELEFONO_VARAMIENTOS}
          </a>
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {tarjetas.map((t) => (
          <Tarjeta key={t.titulo} {...t} />
        ))}
      </div>

      <p className="mt-8 text-center">
        <Link
          href={`/${locale}/colabora/identificacion`}
          className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          No sé qué vi, ayudame a identificarlo
        </Link>
      </p>
    </Section>
  );
}
