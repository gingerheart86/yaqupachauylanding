import Link from "next/link";
import Image from "next/image";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export function ProjectCardDestacado({ href, title, description, image, imageAlt }) {
  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 ${FOCUS_RING}`}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 1024px, 100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-mar-900/80 via-mar-900/10 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 max-w-2xl text-mar-100">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProjectCardCompacta({ href, title, description }) {
  return (
    <Link
      href={href}
      className={`block rounded-lg border-[0.5px] border-marca-grafito/20 p-5 hover:bg-costa-100 ${FOCUS_RING}`}
    >
      <h3 className="font-semibold text-mar-800">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-texto">{description}</p>
      )}
    </Link>
  );
}
