import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import FooterFC from "../components/footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://yaqupachauy.org"),
  title: {
    default: "Toninas: los delfines de la costa uruguaya | Yaqu Pacha Uruguay",
    template: "%s | Yaqu Pacha Uruguay",
  },
  description:
    "Investigación y conservación de las toninas, los delfines que habitan la costa de Uruguay. Proyecto Toninas: ciencia, educación ambiental y trabajo con las comunidades costeras.",
  openGraph: {
    type: "website",
    locale: "es_UY",
    siteName: "Yaqu Pacha Uruguay",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <div className="min-h-screen bg-slate-100 ">
          <Navbar />
          <main className="">{children}</main>
          <FooterFC />
        </div>
      </body>
    </html>
  );
}
