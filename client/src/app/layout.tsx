import "./ui/globals.css";
import { nunito } from "./ui/fonts";
import Template from "./template";

// export const metadata: Metadata = {
//   title: "Conectando",
//   description:
//     "Conectando es una plataforma de conexión entre trabajadores y empleadores.",
// };


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${nunito.className} antialiased`}>
        <main>
          <Template>{children}</Template>
        </main>
      </body>
    </html>
  );
}
