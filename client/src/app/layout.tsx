import "./ui/globals.css";
import { nunito } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-secondary-white text-secondary-black">
      <body className={`${nunito.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
