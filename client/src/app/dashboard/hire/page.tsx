import HireModal from "@/app/components/Dashboard/HireModal";
import ButtonModal from "@/app/components/Modal/ButtonModal";
import { profiles } from "@/data/hireProfiles";
import React from "react";

export default function HirePage() {
  return (
    <section className="h-full w-full flex justify-center flex-wrap gap-6 p-6">
      {profiles.map((profile, index) => {
        return (
          <div key={index} className="bg-secondary-white rounded-2xl border border-secondary-gray w-96 h-80 relative overflow-hidden">
            <img
              src={profile.imageBackground}
              alt="Imagen de fondo"
              className="w-full h-36 object-cover rounded-t-2xl"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <img
                src={profile.imageProfile}
                alt="imagen de perfil"
                className="h-24 w-24 -mt-36 rounded-full bg-secondary-gray border-2 border-secondary-white"
              />
            </div>

            <div className="px-4 pt-4 pb-2">
              <h2 className="text-secondary-blackt text-center text-3xl font-bold">{profile.name}</h2>
              <span className="flex justify-center items-center">
                <img
                  src="/svg/Location-Icon.svg"
                  alt="image"
                  className="inline h-5 w-5 mr-1"
                />
                <p className="text-secondary-black text-xs font-bold">{profile.location}</p>
                <img
                  src="/svg/star.svg"
                  alt="image"
                  className="inline h-5 w-5 ml-2"
                />
                <p className="text-secondary-black text-xs font-bold">{profile.review}</p>
              </span>
              <p className="text-secondary-gray text-center text-base font-normal mt-4">
                {profile.professions.map((profession, index) => (
                  <React.Fragment key={index}>
                    {profession}
                    {index !== profile.professions.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </p>

            </div>
            <div className="w-full px-3">
            <HireModal user={profile} index={index} />
            </div>
          </div>

        );
      })}
    </section>
  );
}
