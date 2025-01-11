"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavbarLink from "./NavbarLink";
import Dropdown from "./Dropdown";
import SidebarContent from "./SidebarContent";
import Image from "next/image";
import { CENTER_NAV_LINKS, NAV_LINKS } from "./links";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { getUserByUsername, getUserByEmail } from "@/app/api/user";

export default function Header() {
  
  const { data: session, status }: any = useSession();

  let decoded: any;
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token);
  }
  

    const [getUser, setGetUser] = useState<any>()


    useEffect(() => {
      async function getUserData(){
        if(decoded != undefined){
          try {
            const response = await getUserByEmail(decoded.user.email)
            setGetUser(response)
          } catch (error) {
            console.error(error)
          }
        } 
      }

      async function getUserDataGoogle(){
        if(true){
          try {
            const response = await getUserByEmail(session?.user?.email)
            setGetUser(response)
          } catch (error) {
            console.error(error)
          }
        } 
      }
      if(session?.user?.provider === "credentials") {
        getUserData()
        return
      } 
      else if (session?.user?.provider === "google") { 
        getUserDataGoogle()
        return
      }
    },[session])

  if (status === "loading") {
    return (
      <header className="absolute w-full">
        <nav className="skeleton h-16 p-4 w-full shadow-md"></nav>
      </header>
    );
  }


  if (status === "unauthenticated") {
    return (
      <header className="absolute w-full z-20">
        <nav className="h-16 p-4 w-full inline-flex justify-between items-center border-b border-secondary-gray bg-secondary-white shadow-md">
          <div className="flex flex-start md:hidden justify-start">
            <input type="checkbox" id="drawer-left" className="drawer-toggle" />
            <label htmlFor="drawer-left" className="btn bg-secondary-white">
              <Image
                className="m-0 p-0"
                src="/svg/burger.svg"
                alt="X"
                width={24}
                height={24}
              />
              <Link href="/">
                <img
                  src="/svg/conectando-isotype.svg"
                  alt="Logo"
                  className="ml-6 h-6"
                />
              </Link>
            </label>
            <label className="overlay" htmlFor="drawer-left"></label>
            <div className="drawer rounded-r-2xl">
              <div className="drawer-content pt-10 flex flex-col h-full">
                <label
                  htmlFor="drawer-left"
                  className="btn btn-sm btn-circle btn-ghost bg-secondary-white absolute left-2 top-10"
                >
                  <Image
                    className="m-0 p-0"
                    src="/svg/arrow-back.svg"
                    alt="X"
                    width={24}
                    height={24}
                  />
                </label>
                <SidebarContent user={undefined} />
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:justify-start">
            <Link href="/">
              <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
            </Link>
          </div>
          <div className="flex md:hidden flex-col flex-end justify-center items-center">
            <a
              href="/auth/login"
              className="flex flex-col btn bg-secondary-white text-primary-blue m-0 p-0"
            >
              <img src="/svg/login-blue.svg" />
            </a>
          </div>
          <ul className="hidden md:flex justify-center items-center gap-2">
            {CENTER_NAV_LINKS.map((link) => (
              <NavbarLink
                key={link.href}
                title={link.title}
                href={link.href}
                src={link.src}
                alt={link.alt}
              />
            ))}
          </ul>
          <ul className="hidden md:flex justify-end items-center gap-2">
            <NavbarLink
              key="/auth/register"
              title="Registrarse"
              href="auth/register"
              src={"/svg/login-blue.svg"}
              alt="Registro"
              textcolor="primary-blue"
            />
            <NavbarLink
              key="/auth/login"
              title="Iniciar sesión"
              href="auth/login"
              src={"/svg/login-blue.svg"}
              alt="Login"
              bgcolor="primary-blue"
              textcolor="secondary-white"
            />
          </ul>
        </nav>
      </header>
    );
  }

  if (status === "authenticated") {
    return (
      <header className="absolute w-full">
        <nav className="h-16 p-4 w-full inline-flex justify-between items-center border-b border-secondary-gray bg-secondary-white shadow-md">
          <div className="flex flex-start md:hidden justify-start">
            <input type="checkbox" id="drawer-left" className="drawer-toggle" />
            <label htmlFor="drawer-left" className="btn bg-secondary-white">
              <Image
                className="m-0 p-0"
                src="/svg/burger.svg"
                alt="X"
                width={24}
                height={24}
              />
              <Link href="/">
                <img
                  src="/svg/conectando-isotype.svg"
                  alt="Logo"
                  className="ml-6 h-6"
                />
              </Link>
            </label>
            <label className="overlay" htmlFor="drawer-left"></label>
            <div className="drawer rounded-r-2xl">
              <div className="drawer-content pt-10 flex flex-col h-full">
                <label
                  htmlFor="drawer-left"
                  className="btn btn-sm btn-circle btn-ghost bg-secondary-white absolute left-2 top-10"
                >
                  <Image
                    className="m-0 p-0"
                    src="/svg/arrow-back.svg"
                    alt="X"
                    width={24}
                    height={24}
                  />
                </label>
                <SidebarContent user={getUser} />
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:justify-start">
            <Link href="/">
              <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
            </Link>
          </div>
          <div className="flex md:hidden flex-col flex-end justify-center items-center">
            <Link
              href=""
              className="flex flex-col btn bg-secondary-white text-primary-blue m-0 p-0"
            >
              <img src="/svg/notification.svg" />
            </Link>
          </div>
          <ul className="hidden md:flex justify-center items-center gap-2">
            {CENTER_NAV_LINKS.map((link) => (
              <NavbarLink
                key={link.href}
                title={link.title}
                href={link.href}
                src={link.src}
                alt={link.alt}
                extra="hover:text-primary-blue"
              />
            ))}
          </ul>
          <ul className="hidden md:flex justify-end items-center gap-2">
            {NAV_LINKS.map((link) => (
              <NavbarLink
                key={link.href}
                title={link.title}
                href={link.href}
                src={link.src}
                alt={link.alt}
              />
            ))}
            <Dropdown user={getUser} />
          </ul>
        </nav>
      </header>
    );
  }
}
