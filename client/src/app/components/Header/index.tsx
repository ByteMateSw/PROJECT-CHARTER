"use client";
import Link from "next/link";
import NavbarLink from "./NavbarLink";
import Dropdown from "./Dropdown";
import SidebarContent from "./SidebarContent";
import Image from "next/image";

const NAV_LINKS = [
  {
    title: "Mensajes",
    href: "dashboard/jobs",
    src: "/svg/mail.svg",
    alt: "Mail",
  },
  {
    title: "Notificaciones",
    href: "dashboard/hire",
    src: "/svg/notification.svg",
    alt: "Notification",
  },
];

const CENTER_NAV_LINKS = [
  {
    title: "Vacantes",
    href: "dashboard/jobs",
    src: "/svg/vacancies.svg",
    alt: "Vacancies",
  },
  {
    title: "Contratar",
    href: "dashboard/hire",
    src: "/svg/hire.svg",
    alt: "Hire",
  },
];

export default function Header(): JSX.Element {
  return (
    <header className="absolute w-full">
      <nav className="h-16 w-full flex justify-between items-center border md:rounded-full border-secondary-gray bg-secondary-white shadow-md">
        <div className="flex flex-start  md:hidden justify-start">
          <input type="checkbox" id="drawer-left" className="drawer-toggle" />
          <label htmlFor="drawer-left" className="btn bg-secondary-white">
            <Image className="m-0 p-0" src="/svg/burger.svg" alt="X" width={24} height={24} />
          </label>
          <label className="overlay" htmlFor="drawer-left"></label>
          <div className="drawer">
            <div className="drawer-content pt-10 flex flex-col h-full">
              <label
                htmlFor="drawer-left"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <SidebarContent />
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <Link href="/">
            <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className="flex md:hidden flex-col flex-end justify-center items-center">
          <a href="" className="flex flex-col btn bg-secondary-white text-primary-blue m-0 p-0" >
          <img 
           src="/svg/logout.svg"
          />
          Acceder
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
          {NAV_LINKS.map((link) => (
            <NavbarLink
              key={link.href}
              title={link.title}
              href={link.href}
              src={link.src}
              alt={link.alt}
            />
          ))}
          <Dropdown />
        </ul>
      </nav>
    </header>
  );
}
