export default function Card({ src, alt, text }: { src: string; alt: string, text: string }) {
  return (
    <div className="relative inline-block m-3 w-72 h-36 hover:scale-110 transition-transform duration-200 cursor-pointer">
      <img
        className=" w-full h-full rounded-[3rem] object-cover"
        src={src}
        alt={alt}
      />
      <div className="absolute flex text-white font-extrabold text-3xl justify-center top-1/2 lef-1/2 w-full">{text}</div>
    </div>
  );
}
