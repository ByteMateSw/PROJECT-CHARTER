interface MiniAboutProps {
  className: string;
  pText: string;
  pImg: string;
  paragraphsText: Paragraph[];
  tittle: string;
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
}: MiniAboutProps) {
  return (
    <section className={`flex justify-between w-full ${className}`}>
      <article className={`${pText}`}>
        <h1 className="text-start text-secondary-black text-5xl font-extrabold">
          {tittle}
        </h1>
        <div className="flex flex-col text-start content-center text-secondary-black font-semibold text-2xl pt-10 gap-y-6 max-w-[720px]">
          {paragraphsText.map((item, index) => (
            <span key={index} className="flex flex-row items-center">
              <img src={item.svg} alt="svg" className="h-8 mr-2" />
              <p>{item.text}</p>
            </span>
          ))}
        </div>
      </article>
      <article className={`${pImg}`}>
        <img src="/img/default.png" alt="img" className="h-[400px] w-[400px]" />
      </article>
    </section>
  );
}
