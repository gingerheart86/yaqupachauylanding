"use client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const images = [
  {
    original: "/proytoninas/5.webp",
    thumbnail: "/proytoninas/5.webp",
    originalAlt: "Foto del Proyecto Toninas",
    thumbnailAlt: "Foto del Proyecto Toninas",
  },
  {
    original: "/proytoninas/1.webp",
    thumbnail: "/proytoninas/1.webp",
    originalAlt: "Foto del Proyecto Toninas",
    thumbnailAlt: "Foto del Proyecto Toninas",
  },
  {
    original: "/proytoninas/2.webp",
    thumbnail: "/proytoninas/2.webp",
    originalAlt: "Foto del Proyecto Toninas",
    thumbnailAlt: "Foto del Proyecto Toninas",
  },
  {
    original: "/proytoninas/3.webp",
    thumbnail: "/proytoninas/3.webp",
    originalAlt: "Foto del Proyecto Toninas",
    thumbnailAlt: "Foto del Proyecto Toninas",
  },
  {
    original: "/proytoninas/4.webp",
    thumbnail: "/proytoninas/4.webp",
    originalAlt: "Foto del Proyecto Toninas",
    thumbnailAlt: "Foto del Proyecto Toninas",
  },
  {
    original: "/toninas/4.webp",
    thumbnail: "/toninas/4.webp",
    originalAlt: "Tonina en la costa uruguaya",
    thumbnailAlt: "Tonina en la costa uruguaya",
  },
  {
    original: "/toninas/5.webp",
    thumbnail: "/toninas/5.webp",
    originalAlt: "Tonina en la costa uruguaya",
    thumbnailAlt: "Tonina en la costa uruguaya",
  },
  {
    original: "/toninas/6.webp",
    thumbnail: "/toninas/6.webp",
    originalAlt: "Tonina en la costa uruguaya",
    thumbnailAlt: "Tonina en la costa uruguaya",
  },
];

const Gallery = () => {
  return (
    <div className="my-12">
      <ImageGallery items={images} />
    </div>
  );
};

export default Gallery;
