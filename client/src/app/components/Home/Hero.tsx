export default function Hero() {
  return (
    <section className="flex h-[750px] items-center justify-center md:justify-start bg-primary-blue/85">
      <article className="flex flex-col items-center justify-center md:justify-start md:items-start md:pl-8 xl:pl-12 text-secondary-white text-[56px] font-extrabold">
        <div className="[&>h1>span]:text-primary-green flex flex-col text-center md:text-start">
        <span className="text-2xl">Un lugar donde podés</span>
          <h1>
            <span>Conectarte</span> con los mejores.<br />
            <span>Contratar</span> habilidades.<br />
            <span>Encontrar</span> talento.<br />
          </h1>
        </div>
        <div className="hidden md:flex gap-14 pt-4 h-14 font-bold text-xl [&>button]:flex [&>button]:items-center [&>button]:px-6 [&>button]:py-4 [&>button]:bg-primary-green [&>button]:rounded-full">
          <button className="hover:scale-110 duration-150">
            Encontrar Talento!
          </button>
          <button className="hover:scale-110 duration-150">
            Busca Trabajo!
          </button>
        </div>
      </article>
      <article className="hidden xl:flex justify-end h-full items-end w-2/4">
        <img
          src="/img/women-home.png"
          alt="Hero Image"
          className="object-cover h-[700px]"
        />
      </article>
    </section>
  );
}