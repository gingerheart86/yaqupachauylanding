/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    name: "Gephyreus",
    description: "",
    href: "/proyectos/gephyreus",
  },
];

export default function Navbar() {
  const [navigation, setNavigation] = useState([
    { name: "Portada", href: "/", current: true, withResource: false },
    {
      name: "Nosotras",
      href: "/nosotras",
      current: false,
      withResource: false,
    },
    {
      name: "Proyectos",
      href: "#",
      current: false,
      withResource: true,
    },
    {
      name: "Especies",
      href: "/especies",
      current: false,
      withResource: false,
    },
    {
      name: "Publicaciones",
      href: "/publicaciones",
      current: false,
      withResource: false,
    },
    {
      name: "Prensa y Divulgación",
      href: "/prensa-y-divulgacion",
      current: false,
    },
    { name: "Contacto", href: "/contacto", current: false },
  ]);
  const setActiveNavigation = (itemName) => {
    const newNavigation = navigation.map((item) => {
      if (item.name == itemName) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    setNavigation(newNavigation);
  };
  return (
    <Disclosure as="nav" className="bg-slate-200 border-b shadow z-50 relative">
      {({ open }) => (
        <>
          <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-cyan-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-shrink-0 items-center justify-end w-full sm:w-auto sm:justify-start">
                <img src="/logo2.png" className="w-36 mr-4" alt="" />
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-8">
                    {navigation.map((item) => (
                      <>
                        {item.withResource && (
                          <Popover className="relative">
                            {({ open }) => (
                              <>
                                <Popover.Button
                                  className={classNames(
                                    open ? "text-gray-900" : "text-gray-500",
                                    "group inline-flex items-center rounded-md  text-base font-medium hover:text-gray-900 focus:outline-none "
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      item.current
                                        ? "bg-slate-300 text-cyan-600"
                                        : "text-cyan-600 hover:bg-slate-300 hover:text-cyan-600",
                                      "px-3 py-2 rounded-md text-sm font-medium"
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "text-gray-600" : "text-gray-400",
                                      "ml-2 h-5 w-5 group-hover:text-gray-500"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0 translate-y-1"
                                  enterTo="opacity-100 translate-y-0"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100 translate-y-0"
                                  leaveTo="opacity-0 translate-y-1"
                                >
                                  <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                        {resources.map((resource) => (
                                          <Link
                                            key={resource.name}
                                            href={resource.href}
                                          >
                                            <a className="-m-3 block rounded-md p-3 hover:bg-gray-50">
                                              <p className="text-base font-medium text-cyan-700">
                                                {resource.name}
                                              </p>
                                              <p className="mt-1 text-sm text-gray-500">
                                                {resource.description}
                                              </p>
                                            </a>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        )}
                        {!item.withResource && (
                          <Link key={item.name} href={item.href}>
                            <a
                              onClick={() => setActiveNavigation(item.name)}
                              className={classNames(
                                item.current
                                  ? "bg-slate-300 text-cyan-600"
                                  : "text-cyan-600 hover:bg-slate-300 hover:text-cyan-600",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-slate-400 text-white"
                      : "text-cyan-600 hover:bg-slate-400 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
