"use client";
import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const noHeader = ["/auth"];

  const hideHeader = noHeader.some(route => pathname.includes(route));

  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <body className={`${nunito.className} antialiased h-screen w-full`}>
        {
          hideHeader ?
            null : <Header />
        }
        {children}
        {
          hideHeader ?
            null : <Footer />
        }
      </body>
    </html>
  );
}
