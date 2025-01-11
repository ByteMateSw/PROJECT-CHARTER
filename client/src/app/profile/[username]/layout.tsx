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


  return (
    <div className="h-screen grid grid-rows-layout grid-cols-3 md:pl-4">
      {/* Navbar placeholder */}
      <div className="col-span-3 h-16 flex-shrink-0"></div>

      {/* Sidebar */}
      <div
        className={`h-full col-span-full md:col-span-1 ${!user && "skeleton"
          } md:border-x md:border-secondary-lightgray -mt-8 md:m-0`}
      >
        {user && <Sidebar user={user} />}
      </div>

      {/* Main content */}
      <div className="col-span-full md:col-span-2">
        <section className="flex flex-col w-full justify-center items-center">
          <img
            className="hidden md:block h-44 w-full"
            src={user?.backgroundPhoto || "/img/bg-image.jpg"}
            alt="Fondo de Perfil"
          />
          <div className="flex items-start justify-start space-x-4 mt-4">
            {[
              { href: "jobs", label: "Trabajos" },
              { href: "posts", label: "Posts" },
              { href: "reviews", label: "Opiniones" },
              { href: "info", label: "Info" },
            ].map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label={tab.label}
                className={`px-4 py-2 rounded-full border flex justify-center items-center w-20 ${tab.label === "Trabajos"
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-500"
                  }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

        </section>
        <section className="flex w-full">
          <Animate>{children}</Animate>
        </section>
      </div>
    </div>
  );
}
