"use client";
import Image from "next/image";
import Link from "next/link";

/**
 * SearchBar Component
 * @returns {JSX.Element} SearchBar
 * @description SearchBar Component
 */
const SearchBar = (): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Clicked"); // Lógica de Búsqueda de Servicios
  };
  const measure = 24;
  return (
    // Cambiar input a ComboBox
    <div className="w-[500px] h-8 px-2 py-1 flex rounded-lg border">
      <Image className="mr-2 ml-1" src="/svg/glass.svg" alt="Glass Icon" width={measure} height={measure} />
      <input
        type="text"
        placeholder="¿Qué servicios estás buscando?"
        className="w-full text-start text-black text-base font-normal focus:outline-none"
      />
      <button onClick={handleClick}>
        <Image src="/svg/arrow-right.svg" alt="Right Arrow Icon" width={measure} height={measure} />
      </button>
    </div>
  );
};

/**
 * NavbarLink Component
 * @param {string} title - Link Title
 * @param {string} linkRef - Link Reference
 * @returns {JSX.Element} NavbarLink
 * @description NavbarLink Component
 */
const NavbarLink = ({
  title,
  linkRef,
}: {
  title: string;
  linkRef: string;
}): JSX.Element => {
  return (
    <li className="p-2 ml-4 rounded-lg text-black hover:text-white hover:bg-indigo-600 duration-300 ">
      <Link href={`/${linkRef}`}>{title}</Link>
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
      <nav className="h-14 flex justify-between items-center px-5 border">
        <div className="text-center text-black text-2xl font-bold cursor-pointer">
          Conectando {/*Insertar Logo de Conectando*/}
        </div>
        <SearchBar />
        <ul className="flex">
          <NavbarLink title="Trabajos" linkRef="jobs" />
          <NavbarLink title="Contratar" linkRef="hire" />
          <NavbarLink title="Login" linkRef="login" />
          <NavbarLink title="Registro" linkRef="register" />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
