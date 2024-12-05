"use client";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getUserByUsername } from "@/app/api/user";
import Link from "next/link";
import Animate from "./template";
import { useUser } from "@/context/userContext";

export default function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { data: session, status }: any = useSession();

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }

  const [user, setUser] = useUser();

  useEffect(() => {
    getUserByUsername(params.username).then((data) => {
      setUser(data);
    });
  }, []);

  //console.log(user);
  

  return (
    <div className="h-screen grid grid-rows-layout grid-cols-3 gap-x-4 pb-4 md:px-4">
      {/* Navbar placeholder */}
      <div className="col-span-3 h-24 flex-shrink-0"></div>

      {/* Sidebar */}
      <div
        className={`h-full col-span-full md:col-span-1 ${
          !user && "skeleton"
        } md:border md:border-secondary-gray md:rounded-[2rem] -mt-8 md:m-0`}
      >
        {user && <Sidebar user={user} />}
      </div>

      {/* Main content */}
      <div className="col-span-full md:col-span-2">
        <section className="flex flex-col w-full justify-center items-center">
          <img
            className="hidden md:block h-44 w-full rounded-2xl"
            src={user?.backgroundPhoto || "/img/bg-image.jpg"}
            alt="Fondo de Perfil"
          />
          <div className="flex space-x-4 mt-4 [&>a]:px-4 [&>a]:py-2 [&>a]:rounded-full [&>a]:bg-primary-blue [&>a]:w-32 [&>a]:md:w-40 text-secondary-white [&>a]:flex [&>a]:justify-center [&>a]:items-center">
            <Link href="info" aria-label="Información">
              Info
            </Link>
            <Link href="jobs" aria-label="Trabajos">
              Trabajos
            </Link>
            <Link href="reviews" aria-label="Opiniones">
              Opiniones
            </Link>
            {/* {
              params.username === decoded?.user?.username ? */}
              <Link href="posts" aria-label="Mis_posteos">
                Posts
              </Link>
              {/* :
              <span></span>
            } */}
          </div>
        </section>
        <section className="flex w-full pb-8">
          <Animate>{children}</Animate>
        </section>
      </div>
    </div>
  );
}
