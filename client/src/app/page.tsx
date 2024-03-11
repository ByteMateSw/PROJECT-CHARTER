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
      <main className="min-h-screen">
        <section className="flex">
          {profiles.map((profile) => {
            return (
              <div key={profile.name}>
                <img
                  src={profile.imageProfile}
                  alt={profile.name}
                  className="h-[220px] w-[220px] rounded-full bg-secondary-gray"
                />
                <h2>{profile.name}</h2>
                <p>{profile.profesion}</p>
              </div>
            );
          })}
        </section>
        <section className="flex items-center flex-col">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
