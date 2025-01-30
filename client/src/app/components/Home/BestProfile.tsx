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
                src={profile.photo ? profile.photo : "/svg/avatar.svg"}
                alt={profile.firstName}
                className="md:h-[200px] md:w-h-[200px] h-[100px] w-h-[100px] rounded-full border object-cover border-secondary-gray text-secondary-gray aspect-square"
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
                  <h2 className="flex text-secondary-gray md:text-sm text-sm font-semibold overflow-visible gap-2 pt-2">
                    {profile?.offices && profile?.offices.length > 0
                      ? profile.offices.map((office: any, index: number) => {
                          return <p key={office.id}>{office.name}</p>;
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
