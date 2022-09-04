import FooterFC from "./footer.client";
import Navbar from "./navbar.client";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Yaqu Pacha Uy</title>
      </Head>
      <div className="min-h-screen bg-slate-100 ">
        <Navbar />
        <main className="">{children}</main>
        <FooterFC />
      </div>
    </>
  );
}
