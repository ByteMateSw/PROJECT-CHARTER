"use client";
import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { UserProvider } from "@/context/userContext";
import { SearchProvider } from "@/context/searchContext"
import GoogleAdsense from "./GoogleAdsense";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeader = ["/auth"];
  const noFooter = ["auth", "dashboard", "profile", "settings"];

  const hideHeader = noHeader.some((route) => pathname.includes(route));
  const hideFooter = noFooter.some((route) => pathname.includes(route));

  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <head>
        {/* <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLEADS as string} /> */}
        <meta name="google-adsense-account" content="ca-pub-2868851941806861"></meta>
        {/* <script async data-cfasync="false" src="//pl26016389.effectiveratecpm.com/488d3100fddbe57811e8fa6e0875087a/invoke.js"></script> */}
      </head>
      <SessionAuthProvider>
        <UserProvider>
          <SearchProvider>
          <body className={`${nunito.className} antialiased h-screen w-full`}>
            {hideHeader ? null : <Header />}
            {children}
            {hideFooter ? null : <Footer />}
          </body>
          </SearchProvider>
        </UserProvider>
      </SessionAuthProvider>
    </html>
  );
}
