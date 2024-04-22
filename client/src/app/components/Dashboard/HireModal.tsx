"use client";
import Link from "next/link";

export default function HireModal({
  user,
  index,
}: {
  user: any;
  index: number;
}) {
  // Mejorar el diseño de este modal, principalmente el código HTML
  return (
    <>
      <label className="btn btn-primary my-4" htmlFor={`modal-${index}`}>
        Ver Perfil
      </label>
      <input className="modal-state" id={`modal-${index}`} type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor={`modal-${index}`}></label>
        <div className="modal-content flex flex-col gap-5 p-0">
          <div className="flex flex-col text-center w-full">
            <img
              src={user.imageBackground}
              alt="Imagen de fondo"
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="flex justify-center items-center flex-col -mt-20 space-x-4">
              <img
                src={user.imageProfile}
                alt="imagen de perfil"
                className="h-32 w-32 rounded-full bg-secondary-gray border-2 border-secondary-white select-none"
              />
            </div>
            <section className="px-6 mx-auto max-w-[500px]">
              <h3 className="text-bold text-xl font-black text-secondary-black">
                {user.name}
              </h3>
              <p className="text-sm text-secondary-gray w-full">
                {user.profession}
              </p>
              <p className="text-left">
                <strong>Ubicación:</strong> {user.location}
              </p>
              <p className="text-left">
                <strong>Descripción:</strong> {user.description}
              </p>
              <div className="flex justify-center pt-4 gap-4">
                <Link href={`/profile/${user.id}`}>
                  <button className="btn px-6 bg-primary-green text-secondary-white font-bold">
                    Ir al perfil completo
                  </button>
                </Link>
              </div>
            </section>
            <hr className="border-t border-secondary-gray mt-8" />
            <section>
              <div className="ml-8 flex flex-col flex-1 my-3">
                <label className="flex flex-start flex-1">Lorem ipsum</label>
                <ul className="flex gap-2">
                  <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                  <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                  <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                  <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
                </ul>
              </div>
            </section>
            <hr className="border-t border-secondary-gray" />
            <section className="pb-4">
              <p className="text-start ml-8 my-5">Lorem ipsum</p>
              <div className="flex justify-center">
                <div className="flex gap-3">
                  <label htmlFor={`modal-${index}`} className="btn bg-primary-green text-secondary-white">Cancel</label>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
