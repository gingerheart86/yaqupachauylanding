import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader } from "../../../../components/ui";
import { getNoticia, getSlugsDeNoticias, fechaLegible } from "../../../../lib/noticias";
import { alternatesPara } from "../../../../lib/i18n";

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
    </Section>
  );
}
