import Image from "next/image";

/**
 * logos: [{ src, alt, width, height, href? }]
 * Uso: <LogoGrid logos={logosGephyreus} />
 */
export default function LogoGrid({ logos }) {
  return (
    <div className="rounded-lg bg-costa-100 px-6 py-10 sm:px-10">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {logos.map((logo) => {
          const img = (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 160}
              height={logo.height ?? 80}
              className="mx-auto h-12 w-auto object-contain grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100"
            />
          );
          return logo.href ? (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2 rounded-sm"
            >
              {img}
            </a>
          ) : (
            <div key={logo.alt} className="flex items-center justify-center">
              {img}
            </div>
          );
        })}
      </div>
    </div>
  );
}
