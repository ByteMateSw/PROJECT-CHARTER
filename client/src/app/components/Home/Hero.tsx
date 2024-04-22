export default function Hero() {
  return (
    <section className="flex w-full justify-between h-[750px] bg-primary-blue/85">
      <article className="mt-60 ml-60 flex flex-col text-secondary-white text-[56px] font-extrabold w-2/4">
        <div className="[&>h1>span]:text-primary-green">
          <h1>
            <span>Conéctate</span> con los mejores <br />
            <span>Contrata</span> habilidades <br />
            <span>Encuentra</span> talento <br />
          </h1>
        </div>
        <div className="flex gap-14 pt-4 h-20 font-bold text-xl [&>button]:px-6 [&>button]:py-4 [&>button]:btn [&>button]:bg-primary-green">
          <button className="hover:scale-110 duration-150">
            Encuentra Talento!
          </button>
          <button className="hover:scale-110 duration-150">
            Busca Trabajo!
          </button>
        </div>
      </article>
      <article className="flex items-end w-2/4">
        <img
          src="/img/women-home.png"
          alt="Hero Image"
          className="object-cover h-[700px]"
        />
      </article>
    </section>
  );
}
