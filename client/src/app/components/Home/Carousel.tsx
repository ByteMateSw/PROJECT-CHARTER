import { cardDetails } from "@/data/cards";
import InfiniteLooper from "./InfiniteLooper";
import Card from "./Card";

export default function Carousel() {
  const velocity: number = 200;
  return (
    <section className="w-full pt-40 h-[450px] flex items-center justify-center flex-col ">
      <h1 className="text-center text-secondary-black text-[32px] font-extrabold">
        Explora las profesiones
      </h1>
      <article className="flex items-center w-full flex-col pt-12">
        <InfiniteLooper speed={velocity} direction="right">
          {cardDetails.map((card, index) => {
            return <Card key={index} src={card.imgUrl} alt={card.title} />;
          })}
        </InfiniteLooper>
        <InfiniteLooper speed={velocity} direction="left">
          {cardDetails.map((card, index) => {
            return <Card key={index} src={card.imgUrl} alt={card.title} />;
          })}
        </InfiniteLooper>
      </article>
    </section>
  );
}
