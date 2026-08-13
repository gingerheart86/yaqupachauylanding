"use client";
import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function VideoInstitucional() {
  const [activo, setActivo] = useState(false);

  if (!activo) {
    return (
      <button
        onClick={() => setActivo(true)}
        className="group relative block w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2"
        aria-label="Reproducir video institucional"
      >
        <img
          src="/video/institucional-poster.jpg"
          alt=""
          className="w-full"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-mar-900/20 transition group-hover:bg-mar-900/35">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-105">
            <PlayIcon className="ml-1 h-7 w-7 text-mar-800" aria-hidden="true" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <video controls autoPlay playsInline className="w-full rounded-lg">
      <source src="/video/institucional-yaqupacha.webm" type="video/webm" />
      <source src="/video/institucional-yaqupacha.mp4" type="video/mp4" />
    </video>
  );
}
