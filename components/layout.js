import FooterFC from "./footer.client";
import Navbar from "./navbar.client";


export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-cyan-900 ">
        <Navbar />
        <main className="">{children}</main>
        <FooterFC />
      </div>
    </>
  )
}