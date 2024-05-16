import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BestProfiles from "./components/Home/BestProfile";
import Hero from "./components/Home/Hero";
import Carousel from "./components/Home/Carousel";
import MiniAbout from "./components/Home/MiniAbout";

export default function Home() {
  const paragraphs1 = [
    {
      text: "Completa tu perfil profesional con tu experiencia laboral, habilidades y educación",
      svg: "/svg/add-person.svg",
    },
    {
      text: "Muestra tus proyectos más relevantes y logros profesionales",
      svg: "/svg/design-services.svg",
    },
    {
      text: "Establece tu ubicación, tus horarios y días disponible",
      svg: "/svg/pin-drop.svg",
    },
    {
      text: "Recibe reseñas de clientes",
      svg: "/svg/reviews.svg",
    },
  ];
  const paragraphs2 = [
    {
      text: "Explora oportunidades laborales que se ajusten a tus habilidades y experiencia",
      svg: "/svg/manage-search.svg",
    },
    {
      text: "Personaliza tu búsqueda filtrando por ubicación, industria, nivel de experiencia y más",
      svg: "/svg/contract.svg",
    },
    {
      text: "Publica tus vacantes laborales para atraer candidatos calificados",
      svg: "/svg/add-post.svg",
    },
    {
      text: "Simplifica tu proceso de contratación comunicándote con potenciales perfiles",
      svg: "/svg/person-chat.svg",
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <Hero />
      <BestProfiles />
      <Carousel />
      <MiniAbout
        className="pt-72"
        pText="pl-52"
        pImg="pr-52"
        paragraphsText={paragraphs1}
        tittle="Potencia tu perfil"
      />
      <MiniAbout
        className="pt-48 pb-60 flex-row-reverse"
        pImg="pl-52"
        pText="pr-52"
        paragraphsText={paragraphs2}
        tittle="Encuentra o publica trabajos"
      />
      {/* <Footer /> */}
    </>
  );
}
