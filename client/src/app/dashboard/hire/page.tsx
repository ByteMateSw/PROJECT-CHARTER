"use client";
import { getAllUsers, getWorkers, getUsersFilter } from "@/app/api/user";
import HireModal from "@/app/components/Dashboard/HireModal";
import Pagination from "@/app/components/pagination/Pagination";
import { profiles } from "@/data/hireProfiles";
import React, { useEffect, useState } from "react";
import { useFilter } from "@/context/searchContext";
import { useSearchParams } from "next/navigation";
import StarRating from "@/app/components/StarRating/StarRating";

export default function HirePage() {
  const { search, city, setSearch, setCity } = useFilter();

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0); // Página inicial
  const [changePage, setChangePage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [selectCity, setSelectCity] = useState<string>("");
  const limit: number = 6; // Límite de usuarios por página

  const querys = useSearchParams();

  useEffect(() => {
    if (querys.get("profession") != null) {
      setSearch(querys.get("profession"));
      return;
    }
    setSearch("");
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (city.label != undefined) setSelectCity(city.label);
        const userData = await getUsersFilter(page, limit, search, selectCity);
        setUsers(userData.users);
        setCount(Math.ceil(userData.count / limit));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    setPage((changePage - 1) * limit);
    fetchUsers();
  }, [page, limit, search, selectCity, city, changePage]); // Re-fetch users when page or limit changes

  //console.log(users)
  return (
    <>
      <div className="absolute left-7 top-1 h-12">
        <Pagination
          currentPage={changePage}
          totalPages={count}
          onPageChange={setChangePage}
        />
      </div>
      <section className="grid grid-flow-row md:grid-cols-2 2xl:grid-cols-4 grid-cols-1 overflow-auto w-full h-full mt-14 gap-6 p-6">
        {users.map((profile: any, index: number) => {
          return (
            <HireModal key={index} user={profile} index={index}>
              <div
                key={index}
                className="bg-secondary-white rounded-2xl border border-secondary-gray/60 min-w-72 max-w-96 h-60 3xl:w-72 2xl:h-80 relative overflow-hidden hover:cursor-pointer"
              >
                {profile.backgroundPhoto ? (
                  <img
                    src={profile.backgroundPhoto}
                    alt="Imagen de fondo"
                    className="w-full h-36 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-36 object-cover rounded-t-2xl"></div>
                )}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <img
                    src={
                      profile.photo ? profile.photo : "/svg/avatar.svg"
                    }
                    alt="imagen de perfil"
                    className="h-32 w-32 -mt-36 rounded-full border object-cover border-secondary-gray"
                  />
                </div>
                <div className="px-4 pt-4 pb-2">
                  <h2 className="text-secondary-black text-center text-3xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-secondary-gray font-semibold text-center text-base mt-1">
                    {profile.experience.map(
                      (experience: any, index: number) => (
                        <React.Fragment key={index}>
                          {experience.title}
                          {index !== profile.experience.length - 1 && ", "}
                        </React.Fragment>
                      )
                    )}
                  </p>
                  <span className="flex flex-col justify-center items-center gap-2 mt-4">
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src="/svg/Location-Icon.svg"
                        alt="image"
                        className="inline h-5 w-5"
                      />
                      <p className="text-secondary-gray text-xs font-bold">
                        {profile.city ? profile.city.name : "Sin configurar"}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <StarRating size={18} starRating={profile.score} />
                      <p className="text-secondary-black text-sm font-semibold">
                        {profile.score}
                      </p>
                    </div>
                  </span>
                </div>
                {/* <div className="w-full px-3">
              <HireModal user={profile} index={index} />
            </div> */}
              </div>
            </HireModal>
          );
        })}
      </section>
    </>
  );
}
