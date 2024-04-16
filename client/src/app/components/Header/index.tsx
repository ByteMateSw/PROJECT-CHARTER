import Link from "next/link";
import SearchBar from "./SearchBar";
import NavbarLink from "./NavbarLink";

const NAV_LINKS = [
  { title: "Mensajes", href: "dashboard/jobs", src: "/svg/mail.svg", alt: "Mail" },
  { title: "Notificaciones", href: "dashboard/hire", src: "/svg/notification.svg", alt: "Notification" },
];

const CENTER_NAV_LINKS = [
  { title: "Trabajos", href: "dashboard/jobs", src: "/svg/vacancies.svg", alt: "Vacancies" },
  { title: "Contratar", href: "dashboard/hire", src: "/svg/hire.svg", alt: "Hire" },
];

/**
 * Header Component
 * @returns {JSX.Element} Header
 * @description Header Component
 */
export default function Header(): JSX.Element {
  return (
    <header>
      <nav className="h-16 flex justify-between items-center px-5 m-4 border rounded-3xl border-secondary-gray bg-secondary-white shadow-md">
        <div className="flex justify-start">
          <Link href="/">
            <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
          </Link>
        </div>
        <ul className="flex justify-center items-center gap-2">
          {CENTER_NAV_LINKS.map((link) => (
            <NavbarLink key={link.href} title={link.title} href={link.href} src={link.src} alt={link.alt} />
          ))}
        </ul>
        <ul className="flex justify-end items-center gap-2">
          {NAV_LINKS.map((link) => (
            <NavbarLink key={link.href} title={link.title} href={link.href} src={link.src} alt={link.alt} />
          ))}
          <div className="flex justify-center items-center gap-2 font-bold">
            <img className="rounded-full h-10 border-2 border-secondary-black" src="https://randomuser.me/api/portraits/men/0.jpg" alt="Profile Image" />
            Furry
            <div className="arrow"></div>
          </div>
        </ul>
      </nav>
    </header>
  );
}