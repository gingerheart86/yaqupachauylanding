import Eyebrow from "./Eyebrow";

export default function PageHeader({
  eyebrow,
  eyebrowTono = "marca",
  title,
  description,
  className = "",
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {eyebrow && <Eyebrow tono={eyebrowTono}>{eyebrow}</Eyebrow>}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && <p className="mt-4 text-lg opacity-80">{description}</p>}
    </div>
  );
}
