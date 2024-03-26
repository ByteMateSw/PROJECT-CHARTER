import ButtonModal from "@/app/components/Modals/ButtonModal";
import { Profiles } from "@/json/hireProfiles";

export default function HirePage() {
  return (
    <section className="h-screen w-full flex justify-center flex-wrap p-4 pt-14">
      {Profiles.map((profile, index) => {
        return (
          <>
            <div
              key={index}
              className=" bg-secondary-white rounded-2xl border border-secondary-gray m-4"
            >
              <img
                src={profile.imageProfile}
                alt="Imagen de fondo"
                className="w-full h-40 object-fill rounded-t-2xl"
              />
              <div className="flex -mt-20 justify-center items-center">
                <img
                  src={profile.imageProfile}
                  alt="imagen de perfil"
                  className=" h-20 w-20 rounded-full bg-secondary-gray border-2 border-secondary-white "
                />
              </div>

              <div className="flex-col items-center flex justify-between mt-4">
                <h2 className="text-center text-secondary-black text-3xl font-bold">
                  {profile.name}
                </h2>
                <p className="text-center text-secondary-gray text-base font-normal pb-11">
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
                  {profile.ubication}
                </p>
                <ButtonModal>
                  <button className="w-96 h-9 px-4 bg-primary-blue rounded-full m-4 mx-4">
                    <p className="text-secondary-white text-base font-bold ">
                      ver perfil
                    </p>
                  </button>
                </ButtonModal>
              </div>
            </div>
          </>
        );
      })}
    </section>
  );
}
