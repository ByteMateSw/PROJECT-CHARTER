import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function JobsModal(/*{
  post,
  index,
}: {
  post: any;
  index: number;
}*/) {
  return (
    <div>
    <label
      className=" btn btn-primary rounded-full"
      htmlFor={`modal-${1}`}
    >
      Ver detalles
    </label>
    <input className="modal-state" id={`modal-${1}`} type="checkbox" />
    <section className="modal">
      <label className="modal-overlay" htmlFor={`modal-${1}`}></label>
      <article className="modal-content h-full w-[990px] grid grid-rows-10 gap-4 p-10 rounded-[2rem] minimal-scrollbar">
        <div className="grid row-span-2 place-content-center gap-2">
          <p className="flex justify-center text-3xl font-semibold text-primary-blue">Titulo del trabajo</p>
          <p className="flex justify-center">Nombre del empleador</p>
        </div>
        <div className="grid row-span-7 border-t border-b">Jobs</div>
        <div className="flex items-center justify-between row-span-1 place-content-center">
          <div className="flex flex-col">
            <div className="flex items-end">
            <Image
                src="/svg/location.svg"
                alt="Location Icon"
                width={20}
                height={20}
              />
              <span className="ml-1 text-secondary-gray text-xs font-bold">
                Ubicación
              </span>
            </div>
            <span className="ml-1 text-sm font-bold">
                Ubicación
            </span>
          </div>
          <div>
          <div className="flex items-end">
            <Image
                src="/svg/calendar.svg"
                alt="Location Icon"
                width={20}
                height={20}
              />
              <span className="ml-1 text-secondary-gray text-xs font-bold">
                Fecha de publicación
              </span>
            </div>
            <span className="ml-1 text-sm font-bold">
                Fecha
            </span>
          </div>
          <div className=" flex justify-center text-sm font-semibold w-24 h-10">
            <button className="bg-primary-blue text-white w-full rounded-full">Contactar</button>
          </div>
        </div>
      </article>
    </section>
  </div>
  );
}
