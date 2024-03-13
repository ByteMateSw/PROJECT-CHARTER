import { Profiles } from "@/json/hireProfiles";

export default function HirePage() {
  return (
    <>
      <main>
        <section className="flex flex-wrap justify-center p-10">
          {Profiles.map((profile) => {
            return (
              <div
                className="p-5 bg-slate-50 rounded-2xl border border-neutral-400 m-4"
                key={profile.name}
              >
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
                    {profile.profesion}
                  </p>
                </div>
                <div className="flex justify-between items-end w-full mt-4">
                  <p className="text-secondary-black text-xs font-bold text-start">
                    {profile.ubicacion}
                  </p>
                  <button className="w-[104px] h-[38px] px-4 bg-blue-600 rounded-lg">
                    <p className="text-secondary-white text-base font-bold ">
                      contratar
                    </p>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
