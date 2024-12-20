"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { useSession } from "next-auth/react";
import { getExperienceByUserId } from '@/app/api/experience/index'
import { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

import ContactModal from '@/app/components/Dashboard/ContactModal'

export default function Page({ params }: { params: { username: string } }) {
  const [user, setUser] = useUser();
  const [exp, setExp] = useState<AxiosResponse<any, any> | undefined>()

  useEffect(() => {
    const getExperiences = async () => {
      try {
        if (user != null) {
          const response = await getExperienceByUserId(user?.id)
          setExp(response)
        }
      } catch (error) {
        console.error(error)
      }
  }
  getExperiences()
  },[user])

    const { data: session, status }: any = useSession();

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Acerca de mí</h2>
          {user?.about}
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
      <h2 className="text-xl font-bold pt-2">Experiencia</h2>
        {exp?.data.map(({company, title, endDate, startDate}:{company: string, title: string, endDate: string, startDate: string}) => {
          const inicio = new Date(startDate)
          const final = new Date(endDate)
          return (
          <div className="my-1" key={company}>
            <h3 className="text-base font-semibold">{title}</h3>
            <span className="text-sm font-normal text-secondary-gray">{company}</span>
            <div className="flex flex-col">
              <span className="text-sm font-normal">Inicio: {
                <span className="text-sm font-normal text-secondary-gray">{
                  inicio.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
                  }</span>
                }
              </span>
              <span className="text-sm font-normal">Hasta: {
                <span className="text-sm font-normal text-secondary-gray">{
                  final.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
                  }</span>
              }
              </span>
            </div>
          </div>
          )
        })}
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Habilidades y Conocimiento</h2>
        {user?.habilities}
      </section>
      </div>
      {
        // params.username === decoded?.user?.username ?
        // <span></span>
        //   :
        // <div className="flex justify-end items-center w-full text-white font-extrabold text-lg">
        //   {/* <button
        //   className="bg-primary-blue h-12 px-4 rounded-3xl"
        //   >
        //     Contactar
        //   </button> */}
        //   <ContactModal contractorId={decoded?.user?.id} contractedId={user?.id}/>
        // </div>
      }
    </div>
  );
}
