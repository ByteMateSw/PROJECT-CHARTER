import React, {useEffect, useState} from "react";
import StarRating from '@/app/components/StarRating/StarRating'
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function Sidebar({ user }: { user: any }) {
  const [score, setScore] = useState<any>(null)

  const { data: session, status }: any = useSession();

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }
  const id:number = user.id


  useEffect(() => {
    setScore((user.score)/1)
  },[user])

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full md:p-4">
        <img
          className="block md:hidden h-24 w-full"
          src="/img/bg-image.jpg"
          alt="Fondo de Perfil"
        />
        <img
          className="h-20 w-20 border-2 -mt-[5.5rem] mb-2 md:m-0 md:h-36 md:w-36 md:border-4 border-secondary-black rounded-full"
          src={!user.photo ? "/svg/profile-circle.svg" : user.photo}
          alt="Foto de perfil"
        />
        <h2 className="text-xl font-bold pt-2">{user.username}</h2>
        <span className="flex justify-center items-center">
          <img
            src="/svg/Location-Icon.svg"
            alt="image"
            className="inline h-5 w-5 mr-1"
          />
          <p className="text-secondary-gray text-xs font-bold">
            {user.location || "Sin Configurar"}
          </p>
        </span>
        <div className="flex text-secondary-gray text-xs text-center font-normal my-2 gap-2">
          {user.offices.map((office: any, index: number) => {
            return (
              <p
                className="border border-secondary-gray p-1 rounded-full flex justify-center items-center"
                key={office.id}
              >
                {office.name}
              </p>
            );
          })}
        </div>
        <span className="w-full inline-flex items-center justify-center">
              <StarRating starRating={score} size={24}/>
          <p className="ml-2 text-secondary-black text-base">
            {/* {!user.reviews ? "3.2" : "4.5"} */}
            {Number.isFinite(score) ? score : 0}
          </p>
        </span>
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Servicios</h2>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic nostrum
        qui ad animi dolor, et nisi minus voluptatem fugit at modi temporibus
        optio exercitationem? Deleniti quibusdam officiis sapiente odit
        nesciunt?
      </section>
      <section className="flex flex-col justify-end items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Contacto</h2>
        <ul className="flex w-full flex-col justify-center items-center gap-4 [&>li>img]:h-8 [&>li>img]:mr-2 [&>li]:cursor-pointer [&>li]:border [&>li]:border-secondary-black [&>li]:w-full [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:rounded-full [&>li]:px-4 [&>li]:py-2">
          <li>
            <img src="/svg/whatsapp-icon.svg" alt="WhatsApp" />
            <span>WhatsApp</span>
          </li>
          <li>
            <img src="/svg/instagram-icon.svg" alt="Instagram" />
            <span>Instagram</span>
          </li>
          <li>
            <img src="/svg/twitter-x-icon.svg" alt="Twitter" />
            <span>Twitter</span> (X)
          </li>
          <li>
            <img src="/svg/facebook-icon.svg" alt="Facebook" />
            <span>Facebook</span>
          </li>
          <li>
            <img src="/svg/linkedin-icon.svg" alt="LikedIn" />
            <span>LinkedIn</span>
          </li>
        </ul>
      </section>
    </>
  );
}
