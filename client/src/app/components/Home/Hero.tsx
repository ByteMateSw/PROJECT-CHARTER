import Link from "next/link";

export default function Hero() {
  const floatingImages = [
    { src: "/path-to-image1.jpg", alt: "Image 1", width: 100, top: "5%", left: "10%" },
    { src: "/path-to-image2.jpg", alt: "Image 2", width: 120, top: "15%", left: "40%" },
    { src: "/path-to-image3.jpg", alt: "Image 3", width: 150, top: "20%", left: "75%" },
    { src: "/path-to-image4.jpg", alt: "Image 4", width: 200, top: "40%", left: "20%" },
    { src: "/path-to-image5.jpg", alt: "Image 5", width: 120, top: "50%", left: "60%" },
    { src: "/path-to-image6.jpg", alt: "Image 6", width: 100, top: "10%", left: "85%" },
    { src: "/path-to-image7.jpg", alt: "Image 7", width: 150, top: "30%", left: "5%" },
    { src: "/path-to-image8.jpg", alt: "Image 8", width: 200, top: "70%", left: "50%" },
    { src: "/path-to-image9.jpg", alt: "Image 9", width: 180, top: "60%", left: "10%" },
    { src: "/path-to-image10.jpg", alt: "Image 10", width: 150, top: "15%", left: "65%" },
    { src: "/path-to-image11.jpg", alt: "Image 11", width: 120, top: "80%", left: "30%" },
    { src: "/path-to-image12.jpg", alt: "Image 12", width: 150, top: "5%", left: "55%" },
    { src: "/path-to-image13.jpg", alt: "Image 13", width: 200, top: "25%", left: "90%" },
    { src: "/path-to-image14.jpg", alt: "Image 14", width: 180, top: "45%", left: "35%" },
    { src: "/path-to-image15.jpg", alt: "Image 15", width: 120, top: "65%", left: "80%" },
  ];

  return (
    <section className="flex h-[80vh] items-center justify-center relative overflow-hidden">
      {/* Título y botón */}
      <article className="text-center">
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
          className="absolute overflow-hidden rounded-lg shadow-md"
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
