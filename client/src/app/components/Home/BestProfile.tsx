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
    });
  }, []);

  console.log(profiles);
  
  return (
    <section className="flex items-center justify-center flex-col w-full mt-5">
      <h1 className="text-center text-secondary-black text-2xl font-extrabold">
        Descubrí algunos perfiles
      </h1>
      <div className="flex items-center justify-around w-full pt-12">
        {profiles.map((profile: any) => (
          <figure
            className="h-[200px] w-[200px] transform transition duration-300 ease-in-out cursor-pointer hover:scale-105"
            key={profile.username}
          >
            <Link
              href={`/profile/${profile.username}/info`}
              key={profile.firstName}
            >
              <img
                src={
                  profile.photo
                    ? profile.photo
                    : "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg"
                }
                alt={profile.firstName}
                className="md:h-[200px] md:w-h-[200px] h-[100px] w-h-[100px] rounded-full text-secondary-gray aspect-square"
              />
              <div className="flex-col justify-center items-center flex pt-4">
                <article className="flex-col m-2 justify-center items-center flex text-center">
                  <h2 className="text-xl text-secondary-black font-bold">
                    {profile.firstName}
                  </h2>
                  <StarRating
                    starRating={profile.score}
                    size={17}
                    key={profile.firstName}
                  />
                  <h2 className="text-secondary-gray md:text-base text-sm font-semibold overflow-visible">
                    {profile?.offices && profile?.offices.length > 0
                      ? profile.offices.map((office: any, index: number) => {
                          return (
                            <div
                              className="border border-secondary-gray text-black rounded-lg px-2 py-1 flex justify-center items-center"
                              key={office.id}
                            >
                              {office.name}
                            </div>
                          );
                        })
                      : "Sin profesiones configuradas"}
                  </h2>
                </article>
              </div>
            </Link>
          </figure>
        ))}
      </div>
    </section>
  );
}
