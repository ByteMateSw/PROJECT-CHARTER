export default function Card({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      className="m-3 w-72 h-36 rounded-[3rem] object-cover hover:scale-110 transition-transform duration-200 cursor-pointer"
      src={src}
      alt={alt}
    />
  );
}
