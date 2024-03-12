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
      <main className="min-h-screen left-0 flex-col justify-center items-center gap-10 inline-flex">
        <div className="text-center h-[400px] px-8 py-12 text-[#171717] text-xl font-extrabold ">Explora algunos perfiles
        <section className="h-[190px] inline-flex items-center gap-20 justify-center">
          {profiles.map((profile) => {
            return (
              <article className="h-[130px] w-[130px]" key={profile.name}>
                <img
                  src={profile.imageProfile}
                  alt={profile.name}
                  className="h-[130px] w-[130px] rounded-full text-[#97989B]"
                />
                <div className="flex-col justify-center items-center flex">
                <article className="text-center text-[#171717] text-sm font-bold">
                <h2>{profile.name}</h2>
                <div className="text-[#97989B]">
                <p>{profile.profesion}</p>
                </div>
                </article>
                </div>
              </article>
            );
          })}
        </section>
        </div>
      
        {/*<section className="flex items-center flex-col">
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
          </section>*/}
      </main>
      <Footer />
    </>
  );
}
