"use client";

import { useSyncExternalStore, useCallback } from "react";

// Carrito de la Yaqutienda: solo localStorage, sin cuenta ni backend
// (docs/panel-completo.md Bloque 9). useSyncExternalStore para que el
// contador del navbar y la pagina de la tienda/carrito compartan el
// mismo estado sin Context ni prop-drilling - los dos son componentes
// separados que necesitan reaccionar al mismo cambio.
const CLAVE = "yaqutienda-carrito";

function claveItem({ slug, variante }) {
  return variante ? `${slug}::${variante}` : slug;
}

function cargarInicial() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let carrito = cargarInicial();
let listeners = [];

function notificar() {
  listeners.forEach((l) => l());
}

function persistir() {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(carrito));
  } catch {
    // localStorage puede fallar (modo privado, cuota) - el carrito
    // sigue funcionando en memoria durante la sesion.
  }
  notificar();
}

function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return carrito;
}

// Tiene que ser la misma referencia en cada llamada - un array nuevo
// ([]) rompe useSyncExternalStore con "getServerSnapshot should be
// cached", porque React lo interpreta como que el snapshot cambio en
// cada render durante la hidratacion.
const SNAPSHOT_VACIO = [];
function getServerSnapshot() {
  return SNAPSHOT_VACIO;
}

function agregar({ slug, nombre, precio, variante = null }) {
  const key = claveItem({ slug, variante });
  const existente = carrito.find((it) => claveItem(it) === key);
  if (existente) {
    carrito = carrito.map((it) =>
      claveItem(it) === key ? { ...it, cantidad: it.cantidad + 1 } : it
    );
  } else {
    carrito = [...carrito, { slug, nombre, precio, variante, cantidad: 1 }];
  }
  persistir();
}

function cambiarCantidad({ slug, variante = null }, cantidad) {
  const key = claveItem({ slug, variante });
  if (cantidad <= 0) {
    carrito = carrito.filter((it) => claveItem(it) !== key);
  } else {
    carrito = carrito.map((it) =>
      claveItem(it) === key ? { ...it, cantidad } : it
    );
  }
  persistir();
}

function quitar({ slug, variante = null }) {
  cambiarCantidad({ slug, variante }, 0);
}

function vaciar() {
  carrito = [];
  persistir();
}

export function useCarrito() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cantidadTotal = items.reduce((acc, it) => acc + it.cantidad, 0);
  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  return {
    items,
    cantidadTotal,
    total,
    agregar: useCallback(agregar, []),
    quitar: useCallback(quitar, []),
    cambiarCantidad: useCallback(cambiarCantidad, []),
    vaciar: useCallback(vaciar, []),
  };
}
