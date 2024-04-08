import Image from "next/image";

export default function ProfilePage() {
  return (
    <>
      {/* Imagenes de Perfil */}
      <div className="flex bg-cover bg-center">
        <img
          src="/img/Proximo-a-Borrar.jpeg"
          alt="Foto de Perfil"
          className="flex h-48 w-full rounded-md mt-14 mb-2"
        />
      </div>

      <section className="flex">
        {/* Imagen rouded full */}
        <div className="flex size-56 rounded-full mx-6 bg-cover bg-center -mt-28 bg-primary-green">
          <img
            src="/svg/Proximo-a-borrar-2.svg"
            alt="Foto de Perfil"
            className="rounded-full"
          />
        </div>

        {/* Nombre de Usuario */}
        <div className="bg-primary-blue mr-2 h-16 w-auto">
          <h1 className="text-xl font-semibold mb-3 whitespace-nowrap">
            Nombre de Usuario
          </h1>
          <h2 className="text-lg whitespace-nowrap">Profesión del Usuario</h2>
        </div>

        <div
          className="
        flex flex-1 justify-end mr-6"
        >
          <button className="h-11 items-center whitespace-nowrap mr-3 px-3 rounded-md bg-secondary-gray">
            Algo va aquí
          </button>
          <button className="h-11 items-center whitespace-nowrap px-3 rounded-md bg-slate-400">
            Algo va aquí
          </button>
        </div>
      </section>
    </>
  );
}
