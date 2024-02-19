import React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "react-feather";

function Header() {
  return (
    <header>
      <nav className="w-full h-[55px] relative flex justify-between items-center px-5 bg-white  border-b border-neutral-900">
        <div className="flex flex-row text-center text-black text-2xl font-bold">
          ProjectCharter
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[500px] h-[30px] px-2 py-1 bg-slate-50 rounded-lg border border-neutral-900 flex justify-center items-center">
            <div className="w-5 h-5 mr-2">
              <Search color="black" />
            </div>
            <input
              type="text"
              placeholder="Buscar"
              className="text-start text-black text-base font-normal w-full focus:outline-none"
            />
            <ArrowRight color="black" />
          </div>
        </div>
        <ul className="flex flex-row space-x-4">
          <li className="w-[84px] h-9 p-2 justify-center items-center gap-2.5 inline-flex rounded-lg text text-black hover:text-white  bg-white  hover:bg-indigo-600 duration-100  border border-black hover:border-transparent ">
            <Link href="/jobs">Trabajos</Link>
          </li>
          <li className="w-[91px] h-9 p-2 justify-center items-center gap-2.5 inline-flex rounded-lg text text-black hover:text-white  bg-white hover:bg-indigo-600 duration-100  border border-black hover:border-transparent">
            <Link href="/hire">Contratar</Link>
          </li>
          <li className="w-[120px] h-9 p-2 justify-center items-center gap-2.5 inline-flex rounded-lg text text-black hover:text-white  bg-white  hover:bg-indigo-600 duration-100  border border-black hover:border-transparent">
            <Link href="/login">Iniciar Sesion</Link>
          </li>
          <li className="w-[104px] h-9 p-2 justify-center items-center gap-2.5 inline-flex  rounded-lg text text-black hover:text-white bg-white  hover:bg-indigo-600 duration-100  border border-black hover:border-transparent">
            <Link href="/register">Registrarse</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
