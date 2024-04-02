export default function MiniAbout({ className }: { className?: string }) {
  return (
    <section className={`flex ${className} flex-col w-[1200px]`}>
      <h1 className="text-secondary-black text-[30px] font-extrabold">
        Potencia tu perfil
      </h1>
      <div
        className={`w-[1000px] flex-col content-center gap-6 flex ${className} text-secondary-black font-semibold text-lg`}
      >
        <h3>
          Completa tu perfil profesional con tu experiencia laboral, habilidades
          y educación
        </h3>
        <h3>Muestra tus proyectos más relevantes y logros profesionales</h3>
        <h3>Establece tu ubicación, tus horarios y días disponible</h3>
        <h3>Recibe reseñas de clientes</h3>
      </div>
    </section>
  );
}
