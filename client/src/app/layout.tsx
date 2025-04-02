"use client";
import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { UserProvider } from "@/context/userContext";
import { SearchProvider } from "@/context/searchContext";
import GoogleAdsense from "./GoogleAdsense";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <head>
        {/* <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLEADS as string} /> */}
        {/* <meta name="google-adsense-account" content="ca-pub-2868851941806861"></meta> */}
        {/* <script async data-cfasync="false" src="//pl26016389.effectiveratecpm.com/488d3100fddbe57811e8fa6e0875087a/invoke.js"></script> */}
      </head>
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-red-600">
          El servicio de Conectando ha sido deshabilitado temporalmente <br />{" "}
          hasta recibir lo acordado.
        </h1>
      </body>
    </html>
  );
}
