import "../styles/globals.css";
import Navbar from "../components/navbar";
import FooterFC from "../components/footer";

export const metadata = {
  title: "Yaqu Pacha Uy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
