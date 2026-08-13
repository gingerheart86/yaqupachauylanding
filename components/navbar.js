"use client";

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Navegacion principal - seccion 2 del doc de fase 3 bloque 1:
// Especies · Proyectos · Avistamientos · Libros · Tienda · Nosotras
const navigationBase = [
  { key: "especies", slug: "especies", bilingue: true },
  { key: "proyectos", slug: "proyectos", bilingue: true, withResource: true },
  { key: "avistamientos", slug: "avistamientos", bilingue: true },
  { key: "libros", slug: "libros", bilingue: false },
  { key: "tienda", slug: "tienda", bilingue: false },
  { key: "nosotras", slug: "nosotras", bilingue: true },
];

const resourceSlugs = [
  "antecedentes",
  "toninas",
  "gephyreus",
  "varamientos",
  "identidad-franca",
];

export default function Navbar({ locale = "es" }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const navigation = navigationBase.filter(
    (item) => item.bilingue || locale !== "en"
  );
  const resources = resourceSlugs.map((slug) => ({
    slug,
    name:
      dict.proyectosMenu[
        slug === "identidad-franca"
          ? "identidadFranca"
          : slug
      ],
    href: `/${locale}/proyectos/${slug}`,
  }));

  const isActive = (href) => pathname.startsWith(href);
  const isResourceActive = resources.some((r) => isActive(r.href));

  return (
    <Disclosure
      as="nav"
      className="bg-costa-100 border-b border-marca-grafito/10 shadow-sm z-50 relative"
    >
      {({ open }) => (
        <>
          <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton
                  className={classNames(
                    "inline-flex items-center justify-center rounded-md p-2 text-marca-grafito hover:bg-marca-oscuro hover:text-white",
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
              <div className="flex flex-shrink-0 items-center justify-end w-full sm:w-auto sm:justify-start">
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

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center space-x-8">
                    {navigation.map((item) => {
                      const href = `/${locale}/${item.slug}`;
                      return (
                        <Fragment key={item.key}>
                          {item.withResource && (
                            <Popover className="relative">
                              {() => (
                                <>
                                  <PopoverButton
                                    className={classNames(
                                      isResourceActive
                                        ? "bg-marca-oscuro text-white"
                                        : "text-marca-oscuro hover:bg-costa-300",
                                      "group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium",
                                      FOCUS_RING
                                    )}
                                  >
                                    {dict.nav[item.key]}
                                    <ChevronDownIcon
                                      className={classNames(
                                        isResourceActive
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
                                        {resources.map((resource) => (
                                          <Link
                                            key={resource.slug}
                                            href={resource.href}
                                            className={classNames(
                                              "-m-3 block rounded-md p-3 hover:bg-costa-100",
                                              FOCUS_RING
                                            )}
                                          >
                                            <p className="text-base font-medium text-marca-oscuro">
                                              {resource.name}
                                            </p>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </PopoverPanel>
                                </>
                              )}
                            </Popover>
                          )}
                          {!item.withResource && (
                            <Link
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
                              {dict.nav[item.key]}
                            </Link>
                          )}
                        </Fragment>
                      );
                    })}
                    <LanguageSwitcher locale={locale} className="ml-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const href = `/${locale}/${item.slug}`;
                return (
                  <Fragment key={item.key}>
                    {!item.withResource && (
                      <DisclosureButton
                        as={Link}
                        href={href}
                        className={classNames(
                          isActive(href)
                            ? "bg-marca-oscuro text-white"
                            : "text-marca-oscuro hover:bg-marca-oscuro hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium",
                          FOCUS_RING
                        )}
                        aria-current={isActive(href) ? "page" : undefined}
                      >
                        {dict.nav[item.key]}
                      </DisclosureButton>
                    )}
                    {item.withResource && (
                      <div className="py-2 bg-costa-300 -mx-2 px-2">
                        <h2 className="px-3 font-semibold text-texto text-base py-2">
                          {dict.nav.proyectos}
                        </h2>
                        {resources.map((r) => (
                          <DisclosureButton
                            key={r.slug}
                            as={Link}
                            href={r.href}
                            className={classNames(
                              isActive(r.href)
                                ? "bg-marca-oscuro text-white"
                                : "text-marca-oscuro hover:bg-marca-oscuro hover:text-white",
                              "block px-3 py-2 rounded-md text-base font-medium",
                              FOCUS_RING
                            )}
                            aria-current={isActive(r.href) ? "page" : undefined}
                          >
                            {r.name}
                          </DisclosureButton>
                        ))}
                      </div>
                    )}
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
  );
}
