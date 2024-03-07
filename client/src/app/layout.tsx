import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conectando",
  description: "Conectando es una plataforma de conexión entre trabajadores y empleadores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-en">
      <body className={nunito.className}>
        <Header />
        {children}
       
        <Footer />
       
      </body>
    </html>
  );
}
