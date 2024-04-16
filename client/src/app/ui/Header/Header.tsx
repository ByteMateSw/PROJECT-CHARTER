import Link from "next/link";
import SearchBar from "./SearchBar";

/**
 * NavbarLink Component
 * @param {string} title - Link Title
 * @param {string} href - Link Reference
 * @returns {JSX.Element} NavbarLink
 * @description NavbarLink Component
 */
const NavbarLink = ({
  title,
  href,
}: {
  title: string;
  href: string;
}): JSX.Element => {
  return (
    <li className="px-4 py-2 rounded-lg font-bold text-base hover:text-secondary-white hover:bg-primary-blue duration-300">
      <Link href={`/${href}`}>{title}</Link>
    </li>
  );
};

/**
 * Header Component
 * @returns {JSX.Element} Header
 * @description Header Component
 */
function Header(): JSX.Element {
  return (
    <header>
      <nav className="h-14 flex items-center px-5 border-b-[1px] border-secondary-gray bg-secondary-white">
        <Link className="flex-1" href="/">
          <img src="/svg/conectando-icon.svg" alt="Logo" className="h-[43px]" />
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
        <ul className="flex-1 flex justify-end items-center gap-2">
          <NavbarLink title="Trabajos" href="jobs" />
          <NavbarLink title="Contratar" href="hire" />
          <NavbarLink title="Iniciar Sesión" href="auth/login" />
          <NavbarLink title="Registrarse" href="auth/register" />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
