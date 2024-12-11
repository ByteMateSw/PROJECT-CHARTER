"use client";
import { getAllUsers, getWorkers, getUsersFilter } from "@/app/api/user";
import HireModal from "@/app/components/Dashboard/HireModal";
import Pagination from "@/app/components/pagination/Pagination";
import { profiles } from "@/data/hireProfiles";
import React, { useEffect, useState } from "react";
import { useFilter } from "@/context/searchContext";

export default function HirePage() {
  const {search, city, setSearch, setCity} = useFilter()

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0); // Página inicial
  const [changePage, setChangePage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const limit: number = 6 // Límite de usuarios por página



  useEffect(() => {
    setSearch('')
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (city === undefined) setCity('')
        const userData = await getUsersFilter(page, limit, search, city);
        setUsers(userData.users);
        setCount(Math.ceil(userData.count / limit))
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    setPage((changePage - 1)*limit)
    fetchUsers();
  }, [page, limit, search, city, changePage]); // Re-fetch users when page or limit changes


  return (
    <>
    <div className="absolute left-7 top-1 h-12">
      <Pagination currentPage={changePage} totalPages={count} onPageChange={setChangePage}/>
    </div>
    <section className="grid grid-flow-row lg:grid-cols-2 grid-cols-1 overflow-auto w-full h-full mt-14 gap-6 p-6">
      {users.map((profile: any, index: number) => {
        return (
          <div key={index} className="bg-secondary-white rounded-2xl border border-secondary-gray w-96 h-80 relative overflow-hidden">
            {profile.backgroundPhoto ?
              <img
              src={profile.backgroundPhoto}
              alt="Imagen de fondo"
              className="w-full h-36 object-cover rounded-t-2xl"
            />
              :
              <div className="w-full h-36 object-cover rounded-t-2xl"></div>
          }
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <img
                src={profile.photo ? profile.photo : 'https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg'}
                alt="imagen de perfil"
                className="h-24 w-24 -mt-36 rounded-full bg-secondary-gray border-2 border-secondary-white"
              />
            </div>

            <div className="px-4 pt-4 pb-2">
              <h2 className="text-secondary-black text-center text-3xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <span className="flex justify-center items-center">
                <img
                  src="/svg/Location-Icon.svg"
                  alt="image"
                  className="inline h-5 w-5 mr-1"
                />
                <p className="text-secondary-black text-xs font-bold">{profile.city}</p>
                <img
                  src="/svg/star.svg"
                  alt="image"
                  className="inline h-5 w-5 ml-2"
                />
                <p className="text-secondary-black text-xs font-bold">{profile.review}</p>
              </span>
              <p className="text-secondary-gray font-semibold text-center text-base mt-4">
                {profile.experience.map((experience: any, index: number) => (
                  <React.Fragment key={index}>
                    {experience.title}
                    {index !== profile.experience.length - 1 && ", "}
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
    </>
  );
}
