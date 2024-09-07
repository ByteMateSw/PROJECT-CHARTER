"use client";
import { getAllUsers, getWorkers } from "@/app/api/user";
import HireModal from "@/app/components/Dashboard/HireModal";
import { profiles } from "@/data/hireProfiles";
import React, { useEffect, useState } from "react";

export default function HirePage() {

  const [users, setUsers] = useState<any>([]);
  const [page, setPage] = useState<number>(0); // Página inicial
  const [limit, setLimit] = useState<number>(9); // Límite de usuarios por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers(page, limit);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page, limit]); // Re-fetch users when page or limit changes


  console.log(users);


  return (
    <section className="grid grid-flow-row grid-cols-2 h-full overflow-auto w-full gap-6 p-6">
      {users.map((profile: any, index: number) => {
        return (
          <div key={index} className="bg-secondary-white rounded-2xl border border-secondary-gray w-96 h-80 relative overflow-hidden">
            <img
              src={profile.imageBackground}
              alt="Imagen de fondo"
              className="w-full h-36 object-cover rounded-t-2xl"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <img
                src={profile.photo}
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
  );
}
