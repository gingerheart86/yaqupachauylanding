import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader } from "../../../../components/ui";
import {
  getNoticia,
  getSlugsDeNoticias,
  fechaLegible,
  getNoticiasAdyacentes,
} from "../../../../lib/noticias";
import { alternatesPara } from "../../../../lib/i18n";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export async function generateStaticParams() {
  return getSlugsDeNoticias().map((slug) => ({ locale: "es", slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params: { slug } }) {
  const noticia = getNoticia(slug);
  if (!noticia) return {};
  return {
    title: noticia.titulo,
    description: noticia.resumen,
    alternates: alternatesPara(`noticias/${slug}`, { soloEs: true }),
  };
}

export default function Page({ params: { slug } }) {
  const noticia = getNoticia(slug);
  if (!noticia) notFound();
  const { anterior, siguiente } = getNoticiasAdyacentes(slug);

  return (
    <Section fondo="claro">
      {noticia.categoria && (
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-marca-oscuro">
          {noticia.categoria}
        </p>
      )}
      <PageHeader title={noticia.titulo} className={noticia.categoria ? "mt-2" : ""} />
      <p className="text-center text-sm text-marca-grafito">
        {fechaLegible(noticia.fecha)}
      </p>

      {noticia.imagen && (
        <div className="relative aspect-[16/9] w-full max-w-3xl mx-auto mt-8 overflow-hidden rounded-lg">
          <Image
            src={noticia.imagen}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
      )}

      <div className="prose max-w-3xl mx-auto mt-8 text-texto [&_a]:text-marca-oscuro">
        <MDXRemote source={noticia.content} />
      </div>

      {(anterior || siguiente) && (
        <nav
          aria-label="Navegación entre noticias"
          className="mt-12 max-w-3xl mx-auto flex items-start justify-between gap-4 border-t border-marca-grafito/20 pt-6 text-sm"
        >
          <div className="flex-1">
            {anterior && (
              <Link
                href={`/es/noticias/${anterior.slug}`}
                className={`block rounded-md p-2 -m-2 ${FOCUS_RING} hover:bg-costa-100`}
              >
                <span className="text-marca-grafito">← Anterior</span>
                <span className="mt-1 block font-semibold text-mar-800">
                  {anterior.titulo}
                </span>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {siguiente && (
              <Link
                href={`/es/noticias/${siguiente.slug}`}
                className={`block rounded-md p-2 -m-2 ${FOCUS_RING} hover:bg-costa-100`}
              >
                <span className="text-marca-grafito">Siguiente →</span>
                <span className="mt-1 block font-semibold text-mar-800">
                  {siguiente.titulo}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      <p className="mt-8 text-center text-sm">
        <Link href="/es/noticias" className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}>
          ← Volver a Noticias
        </Link>
      </p>
    </Section>
  );
}
