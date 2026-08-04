import Image from "next/image";
import { socialLinks } from "./social-icons";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2 rounded-sm";

export default function FooterFC() {
  return (
    <footer className="bg-costa-300">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-marca-grafito hover:text-marca-oscuro ${FOCUS_RING}`}
            >
              <span className="sr-only">{item.name}</span>
              <item.Icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0 flex items-center ">
          <Image
            src="/logo2.png"
            className="w-36 mr-4 hidden sm:block"
            alt="Yaqu Pacha Uruguay"
            width={600}
            height={178}
          />
          <p className="text-center text-base text-texto">
            &copy; Yaqu Pacha Uruguay {new Date().getFullYear()}. Hecho con ❤️ por{" "}
            <a
              className={`font-semibold hover:underline underline-offset-4 ${FOCUS_RING}`}
              href="https://kalagmitan.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              sansil
            </a>
            {" "}y{" "}
            <a
              className={`font-semibold hover:underline underline-offset-4 ${FOCUS_RING}`}
              href="https://github.com/gingerheart86"
              target="_blank"
              rel="noopener noreferrer"
            >
              gingerheart
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
