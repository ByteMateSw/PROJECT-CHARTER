export default function Card({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative inline-block m-3 w-72 h-36">
      <img
        className=" w-full h-full rounded-[3rem] object-cover hover:scale-110 transition-transform duration-200 cursor-pointer"
        src={src}
        alt={alt}
      />
      <div className="absolute flex justify-center top-1/2 lef-1/2 w-full"></div>
    </div>
  );
}
