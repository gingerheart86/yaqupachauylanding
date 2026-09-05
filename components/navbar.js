"use client";

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import TopBarReporte from "./TopBarReporte";
import ContadorCarrito from "./ContadorCarrito";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Headless UI no desmonta el Popover/Disclosure al navegar con
// next/link (la navegacion del lado del cliente no remonta el layout
// persistente), asi que el desplegable se queda abierto tapando la
// pagina nueva. Se cierra a mano escuchando el cambio de ruta -
// cubre tanto el clic en un item como el boton de atras del
// navegador, que tambien cambia el pathname. No toca el cierre con
// Escape ni la devolucion de foco: eso lo sigue manejando Headless UI
// por su cuenta, sin tocar.
function CerrarAlNavegar({ close }) {
  const pathname = usePathname();
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Menu por funcion, no por tipo de objeto - docs/fase3-navegacion-portada.md
// seccion 2. Cada rama es bilingue o solo-ES; dentro de una rama bilingue,
// un item hijo puede igual ser solo-ES (colabora/donaciones), asi que el
// filtro se aplica en los dos niveles.
const NAV = [
  {
    key: "nosotros",
    bilingue: true,
    dictKey: "nosotrosMenu",
    children: [
      { key: "ong", slug: "nosotros/ong", bilingue: true },
      { key: "integrantes", slug: "nosotros/integrantes", bilingue: true },
    ],
  },
  {
    key: "especies",
    bilingue: true,
    dictKey: "especiesMenu",
    children: [
      { key: "tonina", slug: "especies/tonina", bilingue: true },
      { key: "ballenaFranca", slug: "especies/ballena-franca", bilingue: true },
      { key: "franciscana", slug: "especies/franciscana", bilingue: true },
      { key: "orca", slug: "especies/orca", bilingue: true },
    ],
  },
  {
    key: "investigacion",
    bilingue: true,
    dictKey: "investigacionMenu",
    children: [
      { key: "toninas", slug: "investigacion/toninas", bilingue: true },
      { key: "gephyreus", slug: "investigacion/gephyreus", bilingue: true },
      { key: "varamientos", slug: "investigacion/varamientos", bilingue: true },
      { key: "identidadFranca", slug: "investigacion/identidad-franca", bilingue: true },
      { key: "publicaciones", slug: "investigacion/publicaciones", bilingue: true },
    ],
  },
  {
    key: "educacion",
    bilingue: false,
    dictKey: "educacionMenu",
    children: [
      { key: "libros", slug: "educacion/libros", bilingue: false },
      { key: "prensa", slug: "educacion/prensa", bilingue: false },
      { key: "recursos", slug: "educacion/materiales", bilingue: false },
    ],
  },
  {
    key: "colabora",
    bilingue: true,
    dictKey: "colaboraMenu",
    children: [
      { key: "contacto", slug: "colabora/contacto", bilingue: true },
      { key: "donaciones", slug: "colabora/donaciones", bilingue: false },
      { key: "voluntariado", slug: "colabora/voluntariado", bilingue: true },
    ],
  },
  {
    key: "tienda",
    bilingue: false,
    slug: "tienda",
  },
];

function ramasParaLocale(locale) {
  return NAV.filter((rama) => rama.bilingue || locale !== "en").map((rama) => ({
    ...rama,
    children: rama.children?.filter(
      (hijo) => hijo.bilingue || locale !== "en"
    ),
  }));
}

export default function Navbar({ locale = "es" }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);
  const ramas = ramasParaLocale(locale);

  const isActive = (href) => pathname.startsWith(href);
  const esRamaActiva = (rama) => {
    if (rama.slug) return isActive(`/${locale}/${rama.slug}`);
    return rama.children?.some((hijo) =>
      isActive(`/${locale}/${hijo.slug}`)
    );
  };

  return (
    <>
      <TopBarReporte locale={locale} />
      <Disclosure
        as="nav"
        className="bg-costa-100 border-b border-marca-grafito/10 shadow-sm z-50 relative"
      >
        {({ open, close }) => (
          <>
            <CerrarAlNavegar close={close} />
            <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton
                    className={classNames(
                      "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-marca-grafito hover:bg-marca-oscuro hover:text-white",
                      FOCUS_RING
                    )}
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-shrink-0 items-center justify-end w-full xl:w-auto xl:justify-start">
                  <Link href={`/${locale}`} className={FOCUS_RING}>
                    <Image
                      src="/logo2.png"
                      className="w-36 mr-4"
                      alt="Yaqu Pacha Uruguay"
                      width={600}
                      height={178}
                      priority
                    />
                  </Link>
                </div>

                <div className="flex flex-1 items-center justify-center xl:items-stretch xl:justify-center">
                  <div className="hidden xl:ml-6 xl:block">
                    <div className="flex items-center space-x-6">
                      {ramas.map((rama) => {
                        if (!rama.children) {
                          const href = `/${locale}/${rama.slug}`;
                          return (
                            <Link
                              key={rama.key}
                              href={href}
                              className={classNames(
                                isActive(href)
                                  ? "bg-marca-oscuro text-white"
                                  : "text-marca-oscuro hover:bg-costa-300",
                                "px-3 py-2 rounded-md text-sm font-medium",
                                FOCUS_RING
                              )}
                              aria-current={isActive(href) ? "page" : undefined}
                            >
                              {dict.nav[rama.key]}
                              {rama.key === "tienda" && <ContadorCarrito />}
                            </Link>
                          );
                        }

                        const activa = esRamaActiva(rama);
                        return (
                          <Popover key={rama.key} className="relative">
                            {({ close }) => (
                              <>
                                <CerrarAlNavegar close={close} />
                                <PopoverButton
                                  className={classNames(
                                    activa
                                      ? "bg-marca-oscuro text-white"
                                      : "text-marca-oscuro hover:bg-costa-300",
                                    "group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium",
                                    FOCUS_RING
                                  )}
                                >
                                  {dict.nav[rama.key]}
                                  <ChevronDownIcon
                                    className={classNames(
                                      activa
                                        ? "text-white"
                                        : "text-marca-oscuro/60 group-hover:text-marca-oscuro",
                                      "h-5 w-5"
                                    )}
                                    aria-hidden="true"
                                  />
                                </PopoverButton>

                                <PopoverPanel
                                  transition
                                  className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0 transition duration-200 ease-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
                                >
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-marca-grafito/10">
                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                      {rama.children.map((hijo) => (
                                        <Link
                                          key={hijo.key}
                                          href={`/${locale}/${hijo.slug}`}
                                          className={classNames(
                                            "-m-3 block rounded-md p-3 hover:bg-costa-100",
                                            FOCUS_RING
                                          )}
                                        >
                                          <p className="text-base font-medium text-marca-oscuro">
                                            {dict[rama.dictKey][hijo.key]}
                                          </p>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </PopoverPanel>
                              </>
                            )}
                          </Popover>
                        );
                      })}
                      <LanguageSwitcher locale={locale} className="ml-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="xl:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {ramas.map((rama) => {
                  if (!rama.children) {
                    const href = `/${locale}/${rama.slug}`;
                    return (
                      <DisclosureButton
                        key={rama.key}
                        as={Link}
                        href={href}
                        className={classNames(
                          isActive(href)
                            ? "bg-marca-oscuro text-white"
                            : "text-marca-oscuro hover:bg-marca-oscuro hover:text-white",
                          "flex min-h-11 items-center px-3 py-2 rounded-md text-base font-medium",
                          FOCUS_RING
                        )}
                        aria-current={isActive(href) ? "page" : undefined}
                      >
                        {dict.nav[rama.key]}
                        {rama.key === "tienda" && <ContadorCarrito />}
                      </DisclosureButton>
                    );
                  }

                  return (
                    <Fragment key={rama.key}>
                      <div className="py-2 bg-costa-300 -mx-2 px-2">
                        <h2 className="px-3 font-semibold text-texto text-base py-2">
                          {dict.nav[rama.key]}
                        </h2>
                        {rama.children.map((hijo) => {
                          const href = `/${locale}/${hijo.slug}`;
                          return (
                            <DisclosureButton
                              key={hijo.key}
                              as={Link}
                              href={href}
                              className={classNames(
                                isActive(href)
                                  ? "bg-marca-oscuro text-white"
                                  : "text-marca-oscuro hover:bg-marca-oscuro hover:text-white",
                                "flex min-h-11 items-center px-3 py-2 rounded-md text-base font-medium",
                                FOCUS_RING
                              )}
                              aria-current={isActive(href) ? "page" : undefined}
                            >
                              {dict[rama.dictKey][hijo.key]}
                            </DisclosureButton>
                          );
                        })}
                      </div>
                    </Fragment>
                  );
                })}
                <div className="px-3 pt-2">
                  <LanguageSwitcher locale={locale} />
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
}
