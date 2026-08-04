import Eyebrow from "./Eyebrow";

const alignments = {
  center: "mx-auto max-w-3xl text-center",
  left: "max-w-3xl text-left",
};

export default function PageHeader({
  eyebrow,
  eyebrowTono = "grafito",
  title,
  description,
  align = "center",
  className = "",
}) {
  return (
    <div className={`${alignments[align]} ${className}`}>
      {eyebrow && <Eyebrow tono={eyebrowTono}>{eyebrow}</Eyebrow>}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && <p className="mt-4 text-lg opacity-80">{description}</p>}
    </div>
  );
}
