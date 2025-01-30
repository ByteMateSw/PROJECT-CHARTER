interface MiniAboutProps {
  className: string;
  pText: string;
  pImg: string;
  paragraphsText: Paragraph[];
  tittle: string;
  reverse: boolean; // Nueva variable booleana
}

interface Paragraph {
  text: string;
  svg: string;
}

export default function MiniAbout({
  className,
  pText,
  pImg,
  paragraphsText,
  tittle,
  reverse,
}: MiniAboutProps) {
  return (
    <section
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } justify-between items-center w-full ${className} px-8 py-8 bg-gray-50`}
    >
      {/* Texto */}
      <article
        className={`flex-1 ${pText} ${
          reverse ? "md:ml-8" : "md:mr-8"
        }`} // Ajuste del margen
      >
        <h1 className="text-start text-secondary-black text-4xl font-bold mb-6">
          {tittle}
        </h1>
        <ul className="flex flex-col text-secondary-black font-medium text-lg space-y-4">
          {paragraphsText.map((item, index) => (
            <li key={index} className="flex items-start">
              <img src={item.svg} alt="icono" className="h-6 w-6 mr-4 mt-1" />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </article>

      {/* Imagen */}
      <article className={`flex-1 ${pImg} mt-8 md:mt-0`}>
        <img src={pImg} alt="img" className="w-[700px] rounded-lg object-contain" />
      </article>
    </section>
  );
}
