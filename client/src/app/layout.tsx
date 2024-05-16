import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Hero from "./components/Home/Hero";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <body className={`${nunito.className} antialiased h-screen`}>
        {/* <Hero /> */}
        {children}
      </body>
    </html>
  );
}
