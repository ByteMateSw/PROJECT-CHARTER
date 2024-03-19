import ButtonModal from "@/components/Modals/ButtonModal";
import { Profiles } from "@/json/hireProfiles";

export default function HirePage() {
  return (
    <section className="flex flex-wrap justify-center items-center p-10 flex-grow">
      {Profiles.map((profile, index) => {
        return (
<<<<<<< HEAD
          <div
            className="p-5 bg-secondary-white rounded-2xl border border-secondary-gray m-4"
            key={profile.name}
          >
            <img>
              src={profile.imageFondo}
              alt={profile.name}
              className= "h-36 w-full object-cover"

            </img>
            <img
              src={profile.imageProfile}
              alt={profile.name}
              className="h-[240px] w-[260px] rounded-full bg-secondary-gray"
            />
            <div className="flex-col items-center flex justify-between mt-4">
              <h2 className="text-center text-secondary-black text-3xl font-bold">
                {profile.name}
              </h2>
              <p className="text-center text-secondary-gray text-base font-normal">
                {profile.profession}
              </p>
            </div>
            <div className="flex justify-between items-end w-full mt-4">
              <p className="text-secondary-black text-xs font-bold text-start">
                {profile.ubication}
              </p>
              <button className="w-[104px] h-[38px] px-4 bg-primary-blue rounded-lg">
                <p className="text-secondary-white text-base font-bold ">
                  Contratar
=======
          <ButtonModal key={index}>
            <div className="p-5 bg-secondary-white rounded-2xl border border-secondary-gray m-4">
              <img
                src={profile.imageProfile}
                alt={profile.name}
                className="h-[240px] w-[260px] rounded-full bg-secondary-gray"
              />
              <div className="flex-col items-center flex justify-between mt-4">
                <h2 className="text-center text-secondary-black text-3xl font-bold">
                  {profile.name}
                </h2>
                <p className="text-center text-secondary-gray text-base font-normal">
                  {profile.profession}
>>>>>>> 6b4d44c21034054acaf9b0fd00df6d43fda23cf3
                </p>
              </div>
              <div className="flex justify-between items-end w-full mt-4">
                <p className="text-secondary-black text-xs font-bold text-start">
                  {profile.ubication}
                </p>
                <button className="w-[104px] h-[38px] px-4 bg-primary-blue rounded-lg">
                  <p className="text-secondary-white text-base font-bold ">
                    Contratar
                  </p>
                </button>
              </div>
            </div>
          </ButtonModal>
        );
      })}
    </section>
  );
}
