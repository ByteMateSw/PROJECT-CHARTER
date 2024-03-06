import Image from "next/image";

const Links = ({ description }: { description: string }): JSX.Element => {
  return (
    <div className="text-center text-slate-50 text-xs font-medium">
      {description}
    </div>
  );
}

const SocialMedia = ({src, alt = "", measure}: {src: string, alt?: string, measure: number}): JSX.Element => {
  return (
    <Image src={src} alt={`Síguenos en ${alt}`} width={measure} height={measure} />
  )}

function Footer(): JSX.Element {
  // Cambiar divs, mejorar semántica HTML, añadir <a> a redes sociales y links
  const measure = 32; // analizar usar useState
  return (
    <footer>
      <section className="flex flex-col justify-end items-center w-full h-36 px-4 py-2 bg-neutral-900">
        <div className="flex justify-between items-center w-full">
          <div className="text-slate-50 text-[32px] font-bold">Conectando</div>
          <div className="flex items-center gap-8">
          <SocialMedia src="/svg/twitter-x-icon.svg" alt="X" measure={measure}/>
          <SocialMedia src="/svg/instagram-icon.svg" alt="Instagram" measure={measure}/>
          <SocialMedia src="/svg/linkedin-icon.svg" alt="LinkedIn" measure={measure}/>
          <SocialMedia src="/svg/facebook-icon.svg" alt="Facebook" measure={measure}/>
          </div>
        </div>
        <div className="w-full justify-start items-start gap-8 inline-flex">
          <Links description="Desarrollado por ByteMate" />
          <Links description="© 2024 All rights reserved." />
          <Links description="Términos y condiciones" />
          <Links description="Privacidad" />
        </div>
      </section>
    </footer>
  );
}

export default Footer;
