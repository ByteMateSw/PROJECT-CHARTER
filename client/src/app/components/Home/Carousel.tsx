import { cardDetails } from "@/data/cards";
import InfiniteLooper from "./InfiniteLooper";
import Card from "./Card";
import Link from "next/link";

export default function Carousel() {
  const velocity: number = 200;
  return (
    <section className="w-full pt-12 md:my-32 h-[450px] flex items-center justify-center flex-col ">
      <h1 className="text-center text-secondary-black text-[32px] font-extrabold">
        Explora las profesiones
      </h1>
      <article className="flex items-center w-full flex-col pt-12">
        <InfiniteLooper className="flex" speed={velocity} direction="right">
          {cardDetails.map((card, index) => {
            return (
              <Link
              key={index}
              href={`/dashboard/hire?job=${card.title.toLowerCase()}`}
              >
                <Card src={card.imgUrl} alt={card.title} text={card.title} />
              </Link>
          );
          })}
        </InfiniteLooper>
        <InfiniteLooper className="hidden md:flex" speed={velocity} direction="left">
          {cardDetails.map((card, index) => {
            return (
              <Link
              key={index}
              href={`/dashboard/hire?job=${card.title.toLowerCase()}`}
              >
                <Card src={card.imgUrl} alt={card.title} text={card.title} />
              </Link>
          );
          })}
        </InfiniteLooper>
      </article>
    </section>
  );
}
