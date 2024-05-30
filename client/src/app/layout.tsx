"use client";
import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { UserProvider } from "@/context/userContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeader = ["/auth"];
  const noFooter = ["/auth", "/dashboard", "/profile"];

  const hideHeader = noHeader.some((route) => pathname.includes(route));
  const hideFooter = noFooter.some((route) => pathname.includes(route));

  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <SessionAuthProvider>
        <body className={`${nunito.className} antialiased h-screen w-full`}>
          {hideHeader ? null : <Header />}
          <UserProvider>{children}</UserProvider>
          {hideFooter ? null : <Footer />}
        </body>
      </SessionAuthProvider>
    </html>
  );
}
