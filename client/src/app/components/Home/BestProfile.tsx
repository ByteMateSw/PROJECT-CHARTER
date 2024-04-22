"use client";

import { profiles } from "@/data/profiles";
// import { getBestUsers } from "@/app/api/user";
// import { useEffect, useState } from "react";

export default function BestProfiles() {
  // const [profiles, setProfiles] = useState([]);

  // useEffect(() => {
  //     getBestUsers().then((data: any) => {
  //         setProfiles(data);
  //     })
  // }, [])

  return (
    <section className="flex items-center justify-center flex-col w-full">
      <h1 className="text-center text-secondary-black text-[32px] font-extrabold">
        Descubrí algunos perfiles
      </h1>
      <div className="flex justify-between items-center w-full px-60 pt-12">
        {profiles.map((profile) => (
          <figure className="h-[200px] w-h-[200px]" key={profile.name}>
            <img
              src={profile.imageProfile}
              alt={profile.name}
              className="h-[200px] w-h-[200px] rounded-full text-secondary-gray aspect-square"
            />
            <div className="flex-col justify-center items-center flex pt-4">
              <article className="text-center">
                <h2 className="text-xl text-secondary-black font-bold">
                  {profile.name}
                </h2>
                <h2 className="text-secondary-gray text-base font-semibold">
                  <p>{profile.profession}</p>
                </h2>
              </article>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
