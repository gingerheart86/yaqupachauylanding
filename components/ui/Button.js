import Link from "next/link";

const base =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

const variantes = {
  primario: "bg-marca text-white hover:bg-marca-oscuro",
  secundario: "border border-marca text-marca hover:bg-marca/10",
};

export default function Button({
  variante = "primario",
  href,
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variantes[variante]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
