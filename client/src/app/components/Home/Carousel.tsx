import { cardDetails } from "@/json/cards";
import InfiniteLooper from "./InfiniteLooper";
import Card from "./Card";

export default function Carousel() {
  const velocity: number = 160;
  return (
    <section className="w-full h-[450px] flex items-center justify-center flex-col ">
      <h1 className="text-center h-[150px] px-4 py-10 text-secondary-black text-xl font-extrabold">
        Explora las profesiones
      </h1>
      <article className="flex items-center w-full flex-col pb-20">
        <InfiniteLooper speed={velocity} direction="right">
          {cardDetails.map((card) => {
            return <Card key={card.title} src={card.imgUrl} alt={card.title} />;
          })}
        </InfiniteLooper>
        <InfiniteLooper speed={velocity} direction="left">
          {cardDetails.map((card) => {
            return <Card key={card.title} src={card.imgUrl} alt={card.title} />;
          })}
        </InfiniteLooper>
      </article>
    </section>
  );
}
