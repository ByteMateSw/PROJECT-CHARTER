export default function Hero() {
  return (
    <section className="flex justify-between w-[1200px] select-none">
      <article className="h-[350px] w-[1000px] flex-col flex justify-start items-start pt-24 text-secondary-black text-[40px] font-extrabold">
        <div>
          <h1>Encuentra talentos</h1>
          <h1>Contrata habilidades</h1>
          <span className="text-primary-blue">Conéctate </span>
          <span>con los mejores</span>
        </div>
        <div className="flex gap-5 pt-4 rounded-lg font-semibold text-lg">
          <button className="btn bg-primary-blue px-4 py-2 hover:bg-primary-green text-secondary-white hover:scale-110 duration-150">
            ¡Busca Talento!
          </button>
          <button className="btn bg-primary-blue px-4 py-2 hover:bg-primary-green text-secondary-white hover:scale-110 duration-150">
            ¡Encuentra tu Trabajo!
          </button>
        </div>
      </article>
      <figure className="pt-10 items-center rounded-2xl">
        <img
          className="items-center w-[1000px] h-[400px] aspect-5/2 rounded-2xl"
          src="https://img.freepik.com/foto-gratis/pico-montana-nevada-majestuosidad-galaxia-estrellada-ia-generativa_188544-9650.jpg"
          alt="image"
        />
      </figure>
    </section>
  );
}
