"use client";
import { useEffect, useState } from "react";

export default function HeroVideo({ children }) {
  const [reproducir, setReproducir] = useState(false);

  useEffect(() => {
    const anchoOk = window.matchMedia("(min-width: 900px)").matches;
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
          poster="/video/hero-costa-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-costa.webm" type="video/webm" />
          <source src="/video/hero-costa.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/video/hero-costa-poster.jpg"
          alt="Vista aérea de tres toninas nadando cerca de la costa"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      )}
      <div className="absolute inset-0 bg-mar-900/45" aria-hidden="true" />
      <div className="relative flex h-full w-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
