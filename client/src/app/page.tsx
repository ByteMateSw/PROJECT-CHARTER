import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BestProfiles from "./components/Home/BestProfile";
import Hero from "./components/Home/Hero";
import Carousel from "./components/Home/Carousel";
import MiniAbout from "./components/Home/MiniAbout";

export default function Home() {
  const paragraphs1 = [
    "Completa tu perfil profesional con tu experiencia laboral, habilidades y educación",
    "Muestra tus proyectos más relevantes y logros profesionales",
    "Establece tu ubicación, tus horarios y días disponible",
    "Recibe reseñas de clientes",
  ];
  const paragraphs2 = [
    "Explora oportunidades laborales que se ajusten a tus habilidades y experiencia",
    "Personaliza tu búsqueda filtrando por ubicación, industria, nivel de experiencia y más",
    "Publica tus vacantes laborales para atraer candidatos calificados",
    "Simplifica tu proceso de contratación comunicándote con potenciales perfiles",
  ];

  return (
    <>
      <Header />
      <main className="w-full flex-col items-center justify-center gap-12 inline-flex bg-secondary-white">
        <Hero />
        <BestProfiles />
        <Carousel />
        <MiniAbout
          className="pt-72"
          pText="pl-52"
          pImg="pr-52"
          paragraphsText={paragraphs1}
          tittle= "Potencia tu perfil"
        />
        <MiniAbout
          className="pt-48 pb-60 flex-row-reverse"
          pImg="pl-52"
          pText="pr-52"
          paragraphsText={paragraphs2}
          tittle="Encuentra o publica trabajos"
        />
      </main>
      <Footer />
    </>
  );
}
