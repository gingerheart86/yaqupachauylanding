"use client";
import { useEffect, useState } from "react";

export default function HeroVideo({ children }) {
  const [reproducir, setReproducir] = useState(false);

  useEffect(() => {
    const anchoOk = window.matchMedia("(min-width: 768px)").matches;
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReproducir(anchoOk && !sinMovimiento);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-mar-800">
      {reproducir ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-toninas-1280.webm" type="video/webm" />
          <source src="/video/hero-toninas-1280.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/video/hero-poster.jpg"
          alt="Tonina emergiendo frente a la costa de Valizas"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-mar-900/85 via-mar-900/40 to-transparent"
        aria-hidden="true"
      />
      <div className="relative flex h-full w-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
