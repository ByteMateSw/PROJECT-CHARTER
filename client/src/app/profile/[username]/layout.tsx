"use client";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getUserByUsername } from "@/app/api/user";
import Link from "next/link";
import Animate from "./template";
import { useUser } from "@/context/userContext";
import { usePathname } from "next/navigation";

export default function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { data: session, status }: any = useSession();
  const pathname = usePathname();

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
    <div className="h-screen grid grid-rows-10">
      {/* Navbar placeholder */}
      <div className="col-span-3 h-16 flex-shrink-0"></div>
      <div className="col-span-3 row-span-2 h-44 shadow-sm">
          <img
            className="hidden md:block h-44 w-full"
            src={user?.backgroundPhoto || "/img/bg-image.jpg"}
            alt="Fondo de Perfil"
            />
      </div>
      <div className="col-span-3">
      <div className="grid grid-flow-col grid-cols-12">
      {/* Sidebar */}
      <div
        className={`relative h-full col-span-full md:col-span-3 ${!user && "skeleton"
        } md:border-x md:border-secondary-lightgray -mt-8 md:m-0`}
        >
        {user && <Sidebar user={user} />}
      </div>

      {/* Main content */}
      <div className="col-span-full md:col-span-9">
        <section className="flex flex-col w-full items-start">

          <div className="flex items-start justify-start space-x-4 mt-4 pl-4">
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
                className={`px-4 py-2 rounded-full border flex justify-center items-center w-20 ${pathname.includes(tab.href)
                  ? "border-primary-blue text-primary-blue"
                  : "border-secondary-lightgray text-secondary-gray"
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
      </div>
    </div>
  );
}
