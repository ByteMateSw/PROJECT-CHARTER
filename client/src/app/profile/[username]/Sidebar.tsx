import React, { useEffect, useState } from "react";
import StarRating from '@/app/components/StarRating/StarRating'
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { redes } from "@/app/settings/[username]/fields";
import { Field } from "@/app/auth/register/interfaces";

import { getSocialNetworks } from "@/app/api/social-networks";
import Link from "next/link";

export default function Sidebar({ user }: { user: any }) {
  const [score, setScore] = useState<any>(null)
  const [social, setSocial] = useState()

  const { data: session, status }: any = useSession();

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }
  const id: number = user.id


  useEffect(() => {
    setScore((user.score) / 1)
  }, [user])

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const response = await getSocialNetworks(user.id)
        setSocial(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSocial()
  }, [])

  console.log("session", session);
  console.log("----------------------");
  console.log("user", user);

  return (
    <section className="">
      <section className="flex flex-col justify-center items-center w-full md:p-4 gap-2">
        <img
          className="block md:hidden h-24 w-full"
          src={user.backgroundPhoto ? user.backgroundPhoto : "/img/bg-image.jpg"}
          alt="Fondo de Perfil"
        />
        <div className="relative">
          <img
            className="h-20 w-20 border -mt-[5.5rem] mb-2 md:m-0 md:h-36 md:w-36 md:border-4 border-secondary-lightgray rounded-full"
            src={!user.photo ? session?.user.image || "/svg/profile-circle.svg" : user.photo}
            alt="Foto de perfil"
          />
          {
            user.isWorker ?
              <img
                className="absolute top-0 right-0 h-12 w-12 bg-primary-blue rounded-full p-2"
                src="/svg/briefcase.svg"
                alt="Es trabajador"
                title="Este usuario está activo como trabajador"
              /> : null
          }
        </div>
        <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold pt-2">{user?.firstName} {user?.lastName}</h2>
        {/* <p className="text-secondary-black text-xs font-bold">
          {(user.offices.lenght < 1) ? user.offices.map((office: any, index: number) => {
            return (
              <span key={office.id}>
              {office.name}
              {index < user.offices.length - 1 ? ", " : ""}
              </span>
              );
              }) : "Sin profesiones configuradas"}
              </p> */}
        <span className="flex justify-center items-center">
          <img
            src="/svg/Location-Icon.svg"
            alt="image"
            className="inline h-5 w-5 mr-1"
            />
          <p className="text-secondary-gray text-xs font-bold">
            {user.city ? user.city.name : "Sin Configurar"}
          </p>
        </span>
        <span className="w-full inline-flex items-center justify-center font-bold">
          <StarRating starRating={score} size={24} />
          <p className="ml-2 text-secondary-black text-base">
            {/* {!user.reviews ? "3.2" : "4.5"} */}
            {Number.isFinite(score) ? score : 0}
          </p>
        </span>
        </div>
      </section>
      {/* <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Servicios</h2>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic nostrum
        qui ad animi dolor, et nisi minus voluptatem fugit at modi temporibus
        optio exercitationem? Deleniti quibusdam officiis sapiente odit
        nesciunt?
      </section> */}
      <section className="flex flex-col justify-end items-start w-full p-4 gap-2">
        <p className="font-bold w-16 h-6">
          Habilidades
        </p>
        <div className="flex text-secondary-gray text-xs text-center font-normal gap-2">
          {user.offices.map((office: any, index: number) => {
            return (
              <div
                className="border border-secondary-gray text-black rounded-lg px-2 py-1 flex justify-center items-center"
                key={office.id}
              >
                {office.name}
              </div>
            );
          })}
        </div>
      </section>
      <section className="flex flex-col justify-end items-start w-full p-4 gap-2">
        <p className="font-bold w-16 h-6">
          Contacto
        </p>
        <ul className="flex w-full flex-col justify-evenly items-center gap-4 [&>li]:h-8 [&>li>img]:h-5 [&>li>img]:mr-2 [&>li]:cursor-pointer [&>li]:border [&>li]:border-secondary-lightgray [&>li]:w-full [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:rounded-full [&>li]:px-4 [&>li]:py-2">
          <li onClick={() => window.open(`https://wa.me/${user.numberPhone}`)}>
            <div className="flex items-center">
              <img src="/svg/whatsapp-icon.svg" alt="WhatsApp" style={{ height: 20, width: 20 }} />
              <span className="ml-2 text-sm">WhatsApp</span>
            </div>
            <img src="/svg/diagonal-arrow.svg" alt="->" style={{ height: 20, width: 20}} />

          </li>
          {redes.map(
            ({
              name,
              label,
              iconSrc,
            }: {
              name: string;
              label: string;
              iconSrc: string;
            }) =>
              social != undefined && social[name] ? (
                <li key={name} onClick={() => window.open(social[name])}>
                  <div className="flex items-center">
                    <img src={iconSrc} alt={label} style={{ height: 20, width: 20 }}/>
                    <span className="ml-2 text-sm">{label}</span>
                  </div>
                  <img src="/svg/diagonal-arrow.svg" alt="->" style={{ height: 20, width: 20 }} />
                </li>
              ) : (
                <span key={name}></span>
              )
          )}
          {/* <li>
            <img src="/svg/instagram-icon.svg" alt="Instagram" />
            <span>Instagram</span>
          </li>
          <li>
            <img src="/svg/twitter-x-icon.svg" alt="Twitter" />
            <span>Twitter</span> (X)
          </li>
          <li>
            <img src="/svg/facebook-icon.svg" alt="Facebook" />
            <span>Facebook</span>
          </li>
          <li>
            <img src="/svg/linkedin-icon.svg" alt="LikedIn" />
            <span>LinkedIn</span>
          </li> */}
        </ul>
      </section >
    </section>
  );
}
