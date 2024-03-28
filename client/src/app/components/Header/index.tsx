import Link from "next/link";
import SearchBar from "./SearchBar";
import NavbarLink from "./NavbarLink";


/**
 * Header Component
 * @returns {JSX.Element} Header
 * @description Header Component
 */
export default function Header(): JSX.Element {
  return (
    <header>
      <nav className="h-14 flex items-center px-5 m-4 border rounded-3xl border-secondary-gray bg-secondary-white shadow-md">
        <Link className="flex-1" href="/">
          <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
        <ul className="flex-1 flex justify-end items-center gap-2">
          <NavbarLink title="Trabajos" href="dashboard/jobs" />
          <NavbarLink title="Contratar" href="dashboard/hire" />
          <NavbarLink title="Iniciar Sesión" href="auth/login" />
          <NavbarLink title="Registrarse" href="auth/register" />
        </ul>
      </nav>
    </header>
  );
}