import InfiniteLooper from "./ui/InfiniteLooper/InfiniteLooper";
import { cardDetails } from "../json/cards";
import Card from "./ui/Card";
import Header from "./ui/Header/Header";
import Footer from "./ui/Footer";
import { profiles } from "@/json/profiles";

export default function Home() {
  const velocity: number = 80;
  
  return (
    <>
      <Header />
      <main className="min-h-screen w-full left-0 flex-col items-center justify-center gap-10 inline-flex">
        <div className="flex justify-between w-[1200px]">
          <section className=" h-[350px] w-[1000px] flex-col flex justify-start items-start pt-24">
            <div>
              <h1 className="text-secondary-black text-[40px] font-extrabold">
                Encuentra talentos
              </h1>
              <h1 className="text-secondary-black  text-[40px] font-extrabold">
                Contrata habilidades{" "}
              </h1>
              <span className="text-primary-blue text-[40px] font-extrabold">
                Conéctate{" "}
              </span>
              <span className="text-secondary-black text-[40px] font-extrabold">
                {" "}
                con los mejores
              </span>
            </div>
            <div className="flex items-center justify-between gap-5 px-20 pt-4">
              <button className="rounded-2x1 w-40 h-8 font-semibold bg-secondary-gray">
                numero1
              </button>
              <button className="rounded-2x1 w-40 h-8 font-semibold bg-secondary-gray">
                numero2
              </button>
            </div>
          </section>
          <figure className="pt-10 items-center">
            <img
              src="/svg/image.svg"
              alt="image"
              className="py-6 w-[1000px] h-[400px] aspect-5/2"
            />
          </figure>
        </div>

        <section className="w-full h-[450px] flex items-center justify-center flex-col ">
          <h1 className="text-center h-[150px] px-4 py-10 text-secondary-black text-xl font-extrabold">
            Explora las profesiones
          </h1>
          <article className="flex items-center w-full flex-col pb-20">
            <InfiniteLooper speed={velocity} direction="right">
              {cardDetails.map((card) => {
                return (
                  <Card key={card.title} src={card.imgUrl} alt={card.title} />
                );
              })}
            </InfiniteLooper>
            <InfiniteLooper speed={velocity} direction="left">
              {cardDetails.map((card) => {
                return (
                  <Card key={card.title} src={card.imgUrl} alt={card.title} />
                );
              })}
            </InfiniteLooper>
          </article>
        </section>

        <div className="w-[1200px] flex items-center justify-center flex-col h-[255px] pb-28">
          <h1 className="text-center h-[150px] px-4 py-10 text-secondary-black text-xl font-extrabold">
            Mira algunos perfiles
          </h1>
          <section className="h-[400px] inline-flex items-center gap-20 justify-center">
            {profiles.map((profile) => {
              return (
                <figure className="h-[140px] w-[140px]" key={profile.name}>
                  <img
                    src={profile.imageProfile}
                    alt={profile.name}
                    className="h-[140px] w-[140px] rounded-full text-[#97989B] aspect-square"
                  />
                  <div className="flex-col justify-center items-center flex">
                    <article className="text-center text-secondary-black text-sm font-bold">
                      <h2>{profile.name}</h2>
                      <h2 className="text-secondary-gray">
                        <p>{profile.profesion}</p>
                      </h2>
                    </article>
                  </div>
                </figure>
              );
            })}
          </section>
        </div>

        <section className="flex justify-between flex-col w-[1200px]">
          <h1 className="text-secondary-black text-[30px] font-extrabold">
            Potencia tu perfil
          </h1>
          <div className=" h-[250px] w-[1000px] flex-col content-center gap-6 flex justify-start items-start">
            <h3 className="text-secondary-black text-x1 font-semibold text-start">
              Completa tu perfil profesional con tu experiencia laboral,
              habilidades y educación
            </h3>
            <h3 className="text-secondary-black text-x1 font-semibold text-start">
              Muestra tus proyectos más relevantes y logros profesionales
            </h3>
            <h3 className="text-secondary-black text-x1 font-semibold text-start">
              Establece tu ubicación, tus horarios y días disponible
            </h3>
            <h3 className="text-secondary-black text-x1 font-semibold text-start">
              Recibe reseñas de clientes
            </h3>
          </div>
          {/*<figure className="flex justify-end items-center">
          <img
          src="/svg/image.svg" 
          alt="image"
          className="py-6 flex-col  w-[1000px] h-[400px]"
          />
        </figure>*/}
        </section>

        <section className="flex justify-end items-end flex-col w-[1200px] pb-20">
          <h1 className="text-secondary-black text-[30px] font-extrabold">
            Potencia tu perfil
          </h1>
          <div className=" h-[200px] w-[1000px] flex-col content-center gap-6 flex justify-end items-end">
            <h3 className="text-secondary-black text-x1 font-semibold text-end">
              Completa tu perfil profesional con tu experiencia laboral,
              habilidades y educación
            </h3>
            <h3 className="text-secondary-black text-x1 font-semibold text-end">
              Muestra tus proyectos más relevantes y logros profesionales
            </h3>
            <h3 className="text-secondary-black text-x1 font-semibold text-end">
              Establece tu ubicación, tus horarios y días disponible
            </h3>
            <h3 className="text-secondary-black text-x1 font-semibold text-end">
              Recibe reseñas de clientes
            </h3>
          </div>
        </section>

        {/*<div className="flex justify-center w-[1200px]">
          <figure className="flex justify-center pt-10 items-center">
              <img
              src="/svg/image.svg" 
              alt="image"
              className="py-6 flex-col  w-[1000px] h-[400px]"
              />
          </figure>
            <section className=" h-[250px] w-full flex-col flex justify-center items-stretch">
              <h1 className="text-[#171717] w-[900px] text-[30px] font-extrabold text-center leading-12">
                Conecta con clientes que buscan tus servicios<br/>
                Descubre un nuevo mundo de oportunidades laborales<br/>
                Expande tu red profesional y tu cartera de clientes
        </h1>
                
            </section>
        </div>*/}
      </main>
      <Footer />
    </>
  );
}
