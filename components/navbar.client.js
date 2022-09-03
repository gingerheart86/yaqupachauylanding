/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [navigation, setNavigation] = useState([
    { name: "Portada", href: "/", current: true },
    { name: "Nosotras", href: "/nosotras", current: false },
    { name: "Proyecto toninas", href: "/proyecto-toninas", current: false },
    { name: "Especies", href: "/especies", current: false },
    { name: "Publicaciones", href: "/publicaciones", current: false },
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
    <Disclosure as="nav" className="bg-cyan-700">
      {({ open }) => (
        <>
          <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-cyan-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-shrink-0 items-center"></div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          onClick={() => setActiveNavigation(item.name)}
                          className={classNames(
                            item.current
                              ? "bg-cyan-900 text-white"
                              : "text-gray-200 hover:bg-cyan-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
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
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
