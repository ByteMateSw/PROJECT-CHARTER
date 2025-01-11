import Link from "next/link";

export default function Hero() {
  const floatingImages = [
    { src: "/svg/home/rec1.svg", alt: "Image 1", width: 120, top: "25%", left: "17%" },
    { src: "/svg/home/rec2.svg", alt: "Image 2", width: 90, top: "15%", left: "40%" },
    { src: "/svg/home/rec3.svg", alt: "Image 3", width: 90, top: "20%", left: "75%" },
    { src: "/svg/home/rec4.svg", alt: "Image 4", width: 120, top: "40%", left: "20%" },
    { src: "/svg/home/rec5.svg", alt: "Image 5", width: 34, top: "50%", left: "60%" },
    { src: "/svg/home/rec6.svg", alt: "Image 6", width: 70, top: "10%", left: "85%" },
    { src: "/svg/home/rec7.svg", alt: "Image 7", width: 70, top: "30%", left: "5%" },
    { src: "/svg/home/rec8.svg", alt: "Image 8", width: 70, top: "70%", left: "50%" },
    { src: "/svg/home/rec9.svg", alt: "Image 9", width: 48, top: "60%", left: "10%" },
    { src: "/svg/home/rec10.svg", alt: "Image 10", width: 34, top: "15%", left: "65%" },
    { src: "/svg/home/rec11.svg", alt: "Image 11", width: 48, top: "80%", left: "30%" },
    { src: "/svg/home/rec12.svg", alt: "Image 12", width: 48, top: "10%", left: "55%" },
    { src: "/svg/home/rec13.svg", alt: "Image 13", width: 48, top: "25%", left: "90%" },
    { src: "/svg/home/rec14.svg", alt: "Image 14", width: 70, top: "45%", left: "35%" },
    { src: "/svg/home/rec15.svg", alt: "Image 15", width: 48, top: "65%", left: "80%" },
    { src: "/svg/home/rec16.svg", alt: "Image 16", width: 20, top: "90%", left: "75%" },
    { src: "/svg/home/rec17.svg", alt: "Image 17", width: 54, top: "55%", left: "85%" },
  ];

  return (
    <section className="flex h-[80vh] items-center justify-center relative overflow-hidden">
      {/* Título y botón */}
      <article className="text-center bg-transparent">
        <h2 className="text-lg text-secondary-black font-bold mb-2">Un lugar</h2>
        <h1 className="text-4xl sm:text-5xl font-bold text-secondary-black leading-tight">
          Donde el talento y <br /> las oportunidades conectan
        </h1>
        <button className="mt-6 px-6 py-3 bg-primary-blue text-secondary-white font-medium rounded-full hover:bg-blue-700 transition-all">
          <Link href="/auth/register">Registrarse!</Link>
        </button>
      </article>

      {/* Imágenes flotantes */}
      {floatingImages.map((image, index) => (
        <div
          key={index}
          className="absolute overflow-hidden rounded-lg shadow-md bg-transparent -z-10"
          style={{
            top: image.top,
            left: image.left,
            width: `${image.width}px`,
            height: `${image.width}px`,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </section>
  );
}
