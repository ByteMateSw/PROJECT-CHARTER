import Link from "next/link";
import SearchBar from "./SearchBar";
import NavbarLink from "./NavbarLink";

const NAV_LINKS = [
  { title: "Trabajos", href: "dashboard/jobs" },
  { title: "Contratar", href: "dashboard/hire" },
  { title: "Iniciar Sesión", href: "auth/login" },
  { title: "Registrarse", href: "auth/register" },
];

/**
 * Header Component
 * @returns {JSX.Element} Header
 * @description Header Component
 */
export default function Header(): JSX.Element {
  return (
    <header>
      <nav className="h-14 flex justify-between items-center px-5 m-4 border rounded-3xl border-secondary-gray bg-secondary-white shadow-md">
        <div className="flex justify-start">
          <Link href="/">
            <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <ul className="flex justify-end items-center gap-2">
          {NAV_LINKS.map((link) => (
            <NavbarLink key={link.href} title={link.title} href={link.href} />
          ))}
        </ul>
      </nav>
    </header>
  );
}