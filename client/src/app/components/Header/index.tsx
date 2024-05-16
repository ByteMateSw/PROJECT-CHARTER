"use client";
import Link from "next/link";
import NavbarLink from "./NavbarLink";
import Dropdown from "./Dropdown";

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
      <nav className="h-[3.75rem] w-full flex justify-between items-center px-10 m-4 border rounded-full border-secondary-gray bg-secondary-white shadow-md">
        <div className="flex justify-start">
          <Link href="/">
            <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
          </Link>
        </div>
        <ul className="flex justify-center items-center gap-2">
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
        <ul className="flex justify-end items-center gap-2">
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
