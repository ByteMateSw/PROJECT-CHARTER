"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { getExperienceByUserId } from '@/app/api/experience/index'
import { AxiosResponse } from "axios";

export default function Page() {
  const [user, setUser] = useUser();
  const [exp, setExp] = useState<AxiosResponse<any, any> | undefined>()

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const response = await getExperienceByUserId(user?.id)
        setExp(response)
      } catch (error) {
        console.error(error)
      }
  }
  getExperiences()
  },[user])
console.log(exp)
  return (
    <div className="flex flex-col gap-10">
      <div>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Acerca de mí</h2>
          {user?.about}
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
      <h2 className="text-xl font-bold pt-2">Experiencia</h2>
        {exp?.data.map(({company, title}:{company: string, title: string}) => (
          <div key={company}>
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-sm font-normal text-secondary-gray">{company}</span>
          </div>
        ))}
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Habilidades y Conocimiento</h2>
        {user?.habilities}
      </section>
      </div>
      <div className="flex justify-end items-center w-full text-white font-extrabold text-lg">
        <button
        className="bg-primary-blue h-12 px-4 rounded-3xl"
        >
          Contactar
        </button>
      </div>
    </div>
  );
}
