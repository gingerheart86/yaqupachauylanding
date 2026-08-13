import { Montserrat } from "next/font/google";
import "../../styles/globals.css";
import Navbar from "../../components/navbar";
import FooterFC from "../../components/footer";
import { LOCALES, DEFAULT_LOCALE } from "../../lib/i18n";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params: { locale } }) {
  const base = new URL("https://yaqupachauy.org");
  const es = {
    title: {
      default: "Toninas: los delfines de la costa uruguaya | Yaqu Pacha Uruguay",
      template: "%s | Yaqu Pacha Uruguay",
    },
    description:
      "Investigación y conservación de las toninas, los delfines que habitan la costa de Uruguay. Proyecto Toninas: ciencia, educación ambiental y trabajo con las comunidades costeras.",
  };
  const en = {
    title: {
      default: "Toninas: dolphins of the Uruguayan coast | Yaqu Pacha Uruguay",
      template: "%s | Yaqu Pacha Uruguay",
    },
    description:
      "Research and conservation of the toninas, the dolphins that live along the Uruguayan coast. Proyecto Toninas: science, environmental education and work with coastal communities.",
  };
  const copy = locale === "en" ? en : es;

  return {
    metadataBase: base,
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_UY",
      siteName: "Yaqu Pacha Uruguay",
      images: ["/og.jpg"],
    },
  };
}

export default function LocaleLayout({ children, params: { locale } }) {
  const lang = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  return (
    <html lang={lang} className={montserrat.variable}>
      <body>
        <div className="min-h-screen bg-white">
          <Navbar locale={lang} />
          <main className="">{children}</main>
          <FooterFC locale={lang} />
        </div>
      </body>
    </html>
  );
}
