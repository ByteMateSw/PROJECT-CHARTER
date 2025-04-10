import Image from "next/image";

const Links = ({ description }: { description: string }): JSX.Element => {
  return (
    <div className="text-center text-slate-50 text-xs font-medium">
      {description}
    </div>
  );
};

const SocialMedia = ({
  src,
  alt = "",
  measure,
}: {
  src: string;
  alt?: string;
  measure: number;
}): JSX.Element => {
  return (
    <Image
      src={src}
      alt={`Síguenos en ${alt}`}
      width={measure}
      height={measure}
    />
  );
};

function Footer(): JSX.Element {
  // Cambiar divs, mejorar semántica HTML, añadir <Link> a redes sociales y links
  const measure = 20; // analizar usar useState
  return (

    <footer className="hidden md:flex justify-between items-center h-[150px] px-8 py-20 bg-secondary-black">
      <section>
        <Image
          src="/svg/conectando-logotype.svg"
          alt="X"
          width={200}
          height={28}
        />
      </section>
      <section className="flex justify-center gap-4">
        <Links description="Desarrollado por ByteMate" />
        <Links description="© 2025 All rights reserved" />
        <a href="/terms" className="text-center text-slate-50 text-xs font-medium">
          Bases y condiciones de Uso
        </a>
        <Links description="contacto@conectandoarg.com" />
      </section>
      {/* <section className="flex items-center gap-8">
        <SocialMedia
          src="/svg/instagram-icon.svg"
          alt="Instagram"
          measure={measure}
        />
        <SocialMedia src="/svg/twitter-x-icon.svg" alt="X" measure={measure} />
        <SocialMedia
          src="/svg/facebook-icon.svg"
          alt="Facebook"
          measure={measure}
        />
        <SocialMedia
          src="/svg/linkedin-icon.svg"
          alt="LinkedIn"
          measure={measure}
        />
      </section> */}
    </footer>
  );
}

export default Footer;
