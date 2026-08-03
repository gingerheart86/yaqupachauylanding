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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

const navigation = [
  { name: "Portada", href: "/", withResource: false },
  { name: "Nosotras", href: "/nosotras", withResource: false },
  { name: "Proyectos", href: "#", withResource: true },
  { name: "Especies", href: "/especies", withResource: false },
  { name: "Publicaciones", href: "/publicaciones", withResource: false },
  {
    name: "Prensa y Divulgación",
    href: "/prensa-y-divulgacion",
    withResource: false,
  },
  { name: "Contacto", href: "/contacto", withResource: false },
];

const resources = [
  {
    name: "Antecedentes",
    description: "",
    href: "/proyectos/antecedentes",
  },
  {
    name: "Toninas centinelas de la costa",
    description: "",
    href: "/proyectos/toninas",
  },
  {
    name: "Proyecto Gephyreus",
    description: "",
    href: "/proyectos/gephyreus",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
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
                    "inline-flex items-center justify-center rounded-md p-2 text-marca-grafito hover:bg-marca hover:text-white",
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
                <Image
                  src="/logo2.png"
                  className="w-36 mr-4"
                  alt="Yaqu Pacha Uruguay"
                  width={600}
                  height={178}
                  priority
                />
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-8">
                    {navigation.map((item) => (
                      <Fragment key={item.name}>
                        {item.withResource && (
                          <Popover className="relative">
                            {({ open }) => (
                              <>
                                <PopoverButton
                                  className={classNames(
                                    "group inline-flex items-center rounded-md text-base font-medium",
                                    FOCUS_RING
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      isResourceActive
                                        ? "bg-marca text-white"
                                        : "text-marca hover:bg-costa-200 hover:text-marca-oscuro",
                                      "px-3 py-2 rounded-md text-sm font-medium"
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "text-marca-grafito" : "text-marca-grafito/60",
                                      "ml-2 h-5 w-5 group-hover:text-marca-grafito"
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
                                          key={resource.name}
                                          href={resource.href}
                                          className={classNames(
                                            "-m-3 block rounded-md p-3 hover:bg-costa-100",
                                            FOCUS_RING
                                          )}
                                        >
                                          <p className="text-base font-medium text-marca-oscuro">
                                            {resource.name}
                                          </p>
                                          <p className="mt-1 text-sm text-marca-grafito">
                                            {resource.description}
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
                            href={item.href}
                            className={classNames(
                              isActive(item.href)
                                ? "bg-marca text-white"
                                : "text-marca hover:bg-costa-200 hover:text-marca-oscuro",
                              "px-3 py-2 rounded-md text-sm font-medium",
                              FOCUS_RING
                            )}
                            aria-current={isActive(item.href) ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Fragment key={item.name}>
                  {!item.withResource && (
                    <DisclosureButton
                      as={Link}
                      href={item.href}
                      className={classNames(
                        isActive(item.href)
                          ? "bg-marca text-white"
                          : "text-marca hover:bg-marca hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium",
                        FOCUS_RING
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  )}
                  {item.withResource && (
                    <div className="py-2 bg-costa-200 -mx-2 px-2">
                      <h2 className="px-2 font-semibold text-marca-grafito text-base py-1">
                        Proyectos
                      </h2>
                      {resources.map((r) => (
                        <DisclosureButton
                          key={r.name}
                          as={Link}
                          href={r.href}
                          className={classNames(
                            isActive(r.href)
                              ? "bg-marca text-white"
                              : "text-marca hover:bg-marca hover:text-white",
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
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
