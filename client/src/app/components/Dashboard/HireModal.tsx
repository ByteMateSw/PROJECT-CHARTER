"use client";
import Link from "next/link";
import React, { Children, ReactNode } from "react";
import StarRating from "../StarRating/StarRating";

export default function HireModal({
  user,
  index,
  children
}: {
  user: any;
  index: number;
  children: ReactNode
}) {

 
  return (
    <>
      <label
        className=""
        htmlFor={`modal-${index}`}
      >
        {children}
      </label>
      <input className="modal-state" id={`modal-${index}`} type="checkbox" />
      <section className="modal">
        <label className="modal-overlay" htmlFor={`modal-${index}`}></label>
        <article className="modal-content h-full w-[32rem] flex flex-col gap-5 p-0 rounded-[2rem] minimal-scrollbar">
          {/* Foto de perfíl */}
          <div className="flex flex-col w-full justify-center items-center">
            {user.backgrounPhoto ?
              <img
                src={user.backgroundPhoto}
                alt="Imagen de fondo"
                className="w-full h-36 object-cover rounded-t-[2rem]"
              /> 
              :
              <div className="w-full h-36 object-cover rounded-t-2xl"></div>
            }
            <img
              src={user.photo ? user.photo : 'https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg'}
              alt="imagen de perfil"
              className="h-36 w-36 rounded-full flex justify-center items-center flex-col -mt-20 space-x-4 bg-secondary-gray border-2 border-secondary-white select-none"
            />
          </div>
          {/* Nombre, Ubicación, Trabajos y Puntuación */}
          <div className="px-4 pb-2">
            <h2 className="text-secondary-black text-center text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <span className="flex justify-center items-center">
              <img
                src="/svg/Location-Icon.svg"
                alt="image"
                className="inline h-5 w-5 mr-1"
              />
              <p className="text-secondary-black text-xs font-bold">
                {user.city? user.city.name : ''}
              </p>
            </span>
            <p className="text-secondary-gray text-center text-base font-semibold my-2">
              {user.experience.map((experience: any, index: number) => (
                <React.Fragment key={index}>
                  {experience.title}
                  {index !== user.experience.length - 1 && ", "}
                </React.Fragment>
              ))}
            </p>
            <span className="w-full inline-flex items-center justify-center">
              <StarRating size={20} starRating={user.score} key={user.id}/>
              {/* {[0, 1, 2, 3, 4].map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <img
                      src="/svg/star.svg"
                      alt="image"
                      className="inline h-5 w-5"
                    />
                  </React.Fragment>
                );
              })} */}
              <p className="ml-2 text-secondary-black text-xs font-bold">
                {user.review}
              </p>
            </span>
          </div>
          <div className="pt-4 px-9 text-justify">
            <h2 className="text-secondary-black text-2xl font-bold">
              Sobre Mí
            </h2>
            <p>
              {user.about}
            </p>
          </div>
          <div className="pt-2 px-9 text-justify">
            {/* <h2 className="text-secondary-black text-2xl font-bold">
              Servicios
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              cupiditate modi deserunt dolor laudantium perspiciatis? Qui
              reiciendis at omnis sed architecto quia nihil, consequatur
              possimus dolorum ut minima! Optio, ex.
            </p> */}
          </div>
          {/* <ul className="inline-flex py-4 justify-center items-center gap-x-10">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul> */}
          <div className="flex fixed bottom-8 left-0 right-0 justify-center items-center gap-x-6">
            <label
              htmlFor={`modal-${index}`}
              className="btn bg-primary-blue text-secondary-white rounded-full"
            >
              Cerrar
            </label>
            <Link href={`/profile/${user.username}/info`}>
              <label
                htmlFor={`modal-${index}`}
                className="btn bg-primary-blue text-secondary-white rounded-full"
              >
                Perfil Completo
              </label>
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}

/*

<div className="flex gap-3">
                  <label htmlFor={`modal-${index}`} className="btn bg-primary-green text-secondary-white">Cancel</label>
                </div>
*/
