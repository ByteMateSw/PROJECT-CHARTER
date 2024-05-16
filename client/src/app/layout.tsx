"use client";
import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <body className={`${nunito.className} antialiased h-screen w-full`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
