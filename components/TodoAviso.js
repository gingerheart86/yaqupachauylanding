import { getDictionary } from "../lib/i18n";

export default function TodoAviso({ locale = "es" }) {
  const dict = getDictionary(locale);
  return (
    <div className="mt-8 rounded-lg border-[0.5px] border-dashed border-marca-grafito/40 bg-costa-100 p-8 text-center">
      <p className="font-semibold text-mar-800">TODO — {dict.common.todoTitulo}</p>
      <p className="mt-2 text-texto">{dict.common.todoTexto}</p>
    </div>
  );
}
