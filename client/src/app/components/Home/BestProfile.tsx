"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserByScore } from "@/app/api/user";
import StarRating from "../StarRating/StarRating";

export default function BestProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
      getUserByScore().then((data: any) => {
          setProfiles(data);
      })
  }, [])


  return (
    <section className="flex items-center justify-center flex-col w-full mt-5">
      <h1 className="text-center text-secondary-black text-2xl font-extrabold">
        Descubrí algunos perfiles
      </h1>
      <div className="flex items-center justify-around w-full pt-12">
        {profiles.map((profile:any) => (
          <Link 
          href={`/profile/${profile.username}/info`}
          key={profile.firstName}
          >
          <figure className="h-[200px] w-[200px] transform transition duration-300 ease-in-out cursor-pointer hover:scale-105" >
            <img
              src={profile.photo ? profile.photo : 'https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg'}
              alt={profile.firstName}
              className="md:h-[200px] md:w-h-[200px] h-[100px] w-h-[100px] rounded-full text-secondary-gray aspect-square"
            />
            <div className="flex-col justify-center items-center flex pt-4">
              <article className="flex-col justify-center items-center flex text-center">
                <h2 className="text-xl text-secondary-black font-bold">
                  {profile.firstName}
                </h2>
                <StarRating starRating={profile.score} size={18} key={profile.firstName}/>
                <h2 className="text-secondary-gray text-base font-semibold">
                  <p>{profile.habilities}</p>
                </h2>
              </article>
            </div>
          </figure>
          </Link>
        ))}
      </div>
    </section>
  );
}
