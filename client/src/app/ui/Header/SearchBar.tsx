"use client";
import Image from "next/image";

/**
 * SearchBar Component
 * @returns {JSX.Element} SearchBar
 * @description SearchBar Component
 */
export default function SearchBar(): JSX.Element {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Clicked"); // Lógica de Búsqueda de Servicios
      };
      const measure = 24;
  return (
    // Cambiar input a ComboBox
    <div className="w-[500px] h-10 px-4 py-2 flex rounded-2xl border border-secondary-gray border-solid">
      <Image
        src="/svg/glass.svg"
        alt="Glass Icon"
        width={measure}
        height={measure}
      />
      <input
        type="text"
        placeholder="Buscar"
        className="ml-2 w-full text-start text-base font-bold focus:outline-none"
      />
      <button onClick={handleClick}>
        <Image
          src="/svg/arrow-right.svg"
          alt="Right Arrow Icon"
          width={measure}
          height={measure}
        />
      </button>
    </div>
  );
}
