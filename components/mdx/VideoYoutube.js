// <VideoYoutube id="..." /> - embed de YouTube dentro del cuerpo de un MDX.
// No estaba en el set de componentes del doc original, pero investigacion/
// gephyreus tenia un iframe de YouTube en el JSX que habia que preservar
// (docs/panel-completo.md, "Imagenes intercaladas en MDX").
export function VideoYoutube({ id, titulo = "Video de YouTube" }) {
  return (
    <div className="my-8 flex justify-center w-full">
      <iframe
        width="650"
        height="480"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title={titulo}
      />
    </div>
  );
}
