import ButtonModal from "@/app/components/Modal/ButtonModal";
import { profiles } from "@/json/hireProfiles";

export default function HirePage() {
  return (
    <section className="h-full w-full flex justify-center flex-wrap gap-6 p-6">
      {profiles.map((profile, index) => {
        return (
          <div
            key={index}
            className=" bg-secondary-white rounded-2xl border border-secondary-gray w-[345px]"
          >
            <img
              src={profile.imageBackground}
              alt="Imagen de fondo"
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="flex justify-center items-center -mt-32 space-x-4">
              {" "}
              <img
                src={profile.imageProfile}
                alt="imagen de perfil"
                className=" h-20 w-20 rounded-full bg-secondary-gray border-2 border-secondary-white "
              />
            </div>

            <div className="flex-col items-center flex justify-between mt-16">
              <h2 className="text-center text-secondary-black text-3xl font-bold">
                {profile.name}
              </h2>
              <p className="text-center text-secondary-gray text-base font-normal pb-7">
                {profile.profession}
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <p className="text-secondary-black text-xs font-bold text-center w-full">
                <img
                  src="/svg/Location-Icon.svg"
                  alt="image"
                  className="inline h-5 w-5"
                />
                {profile.location}
              </p>
              <ButtonModal
                user={profile}
                className="w-11/12 h-9 px-4 bg-primary-blue rounded-2xl m-4 mx-4"
              >
                <p className="text-secondary-white text-base font-bold ">
                  Ver Perfil
                </p>
              </ButtonModal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
