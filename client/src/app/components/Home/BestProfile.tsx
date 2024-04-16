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
        <section className="w-[1200px] flex items-center justify-center flex-col h-[255px] pb-28">
            <h1 className="text-center h-[150px] px-4 py-10 text-secondary-black text-xl font-extrabold">
                Mira algunos perfiles
            </h1>
            <div className="h-[400px] inline-flex items-center gap-20 justify-center">
                {profiles.map((profile) => {
                    return (
                        <figure className="h-[140px] w-[140px]" key={profile.name}>
                            <img
                                src={profile.imageProfile}
                                alt={profile.name}
                                className="h-[140px] w-[140px] rounded-full text-secondary-gray aspect-square"
                            />
                            <div className="flex-col justify-center items-center flex">
                                <article className="text-center text-secondary-black text-sm font-bold">
                                    <h2>{profile.name}</h2>
                                    <h2 className="text-secondary-gray">
                                        <p>{profile.profession}</p>
                                    </h2>
                                </article>
                            </div>
                        </figure>
                    );
                })}
            </div>
        </section>

    )
}