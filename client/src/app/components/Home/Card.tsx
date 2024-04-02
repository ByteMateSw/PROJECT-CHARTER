export default function Card({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return <img className="m-4 w-72 h-40 rounded-2xl" src={src} alt={alt} />;
}
